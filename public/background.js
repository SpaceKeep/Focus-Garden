const TIMER_ALARM = "focusTimer";

chrome.runtime.setUninstallURL('https://focus-garden.spacekeep.dev/uninstall');

function getToday() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function showDoneBadge() {
  chrome.action.setBadgeText({ text: "\u2713" });
  chrome.action.setBadgeBackgroundColor({ color: "#22c55e" });
}

function showBreakDoneBadge() {
  chrome.action.setBadgeText({ text: "\u2713" });
  chrome.action.setBadgeBackgroundColor({ color: "#0ea5e9" });
}

function clearBadge() {
  chrome.action.setBadgeText({ text: "" });
}

function showDoneNotification() {
  chrome.notifications.create("focus-" + Date.now(), {
    type: "basic",
    iconUrl: chrome.runtime.getURL("icon48.png"),
    title: "Focus session complete!",
    message: "Your garden has grown! \uD83C\uDF3F",
    priority: 2
  });
}

function scheduleAlarm(endTime) {
  chrome.alarms.clear(TIMER_ALARM, () => {
    chrome.alarms.create(TIMER_ALARM, { when: endTime });
  });
}

function recoverAlarmFromStorage() {
  const today = getToday();
  chrome.storage.local.get(["lastSessionDate", "focusSessions", "sessionHistory", "isActive", "endTime"], (res) => {
    // Daily reset on startup
    const lastDate = res.lastSessionDate || today;
    if (lastDate !== today && (res.focusSessions || 0) > 0) {
      const history = [...(res.sessionHistory || []), { date: lastDate, count: res.focusSessions }].slice(-30);
      chrome.storage.local.set({ focusSessions: 0, lastSessionDate: today, sessionHistory: history });
    } else if (!res.lastSessionDate) {
      chrome.storage.local.set({ lastSessionDate: today });
    }

    if (!res.isActive || !res.endTime) return;
    if (res.endTime <= Date.now()) {
      completeSessionIfActive();
      return;
    }
    scheduleAlarm(res.endTime);
  });
}

function completeSessionIfActive(expected = {}) {
  chrome.storage.local.get(
    ["isActive", "endTime", "focusSessions", "totalFocusSessions", "timerMode", "breakModeEnabled", "breakMinutes", "longBreakMinutes", "sessionsUntilLongBreak", "completedFocusSessionsInCycle", "customMinutes", "lastSessionDate", "sessionHistory", "focusSessionLog"],
    (res) => {
      if (!res.isActive) return;

      const timerMode = res.timerMode || "focus";
      if (expected.timerMode && timerMode !== expected.timerMode) return;
      if (expected.endTime && (!res.endTime || Math.abs(res.endTime - expected.endTime) > 1000)) return;

      if (timerMode === "focus") {
        // Daily reset check
        const today = getToday();
        const lastDate = res.lastSessionDate || today;
        let currentSessions = res.focusSessions || 0;
        let history = res.sessionHistory || [];

        if (lastDate !== today && currentSessions > 0) {
          history = [...history, { date: lastDate, count: currentSessions }].slice(-30);
          currentSessions = 0;
        }

        const newSessions = currentSessions + 1;
        const newTotalSessions = (res.totalFocusSessions || 0) + 1;
        const completedAt = Date.now();
        const focusSessionLog = [
          ...(res.focusSessionLog || []),
          {
            id: `${completedAt}-${Math.random().toString(36).slice(2, 8)}`,
            completedAt,
            durationMinutes: res.customMinutes || 25
          }
        ].slice(-5000);
        const breakModeEnabled = res.breakModeEnabled ?? true;
        const cycleCount = (res.completedFocusSessionsInCycle || 0) + 1;
        const sessionsUntilLongBreak = Math.min(12, Math.max(2, res.sessionsUntilLongBreak || 4));
        const longBreakDue = cycleCount >= sessionsUntilLongBreak;
        const nextCycleCount = longBreakDue ? 0 : cycleCount;
        const nextBreakMinutes = longBreakDue ? (res.longBreakMinutes || 15) : (res.breakMinutes || 5);

        if (breakModeEnabled) {
          const endTime = Date.now() + nextBreakMinutes * 60 * 1000;

          chrome.storage.local.set({
            isActive: true,
            endTime,
            timerMode: "break",
            isLongBreak: longBreakDue,
            focusSessions: newSessions,
            totalFocusSessions: newTotalSessions,
            timeLeftSeconds: nextBreakMinutes * 60,
            completedFocusSessionsInCycle: nextCycleCount,
            lastSessionDate: today,
            sessionHistory: history,
            focusSessionLog
          });

          scheduleAlarm(endTime);
        } else {
          chrome.storage.local.set({
            isActive: false,
            endTime: null,
            timerMode: "focus",
            isLongBreak: false,
            focusSessions: newSessions,
            totalFocusSessions: newTotalSessions,
            completedFocusSessionsInCycle: nextCycleCount,
            timeLeftSeconds: (res.customMinutes || 25) * 60,
            lastSessionDate: today,
            sessionHistory: history,
            focusSessionLog
          });
        }

        showDoneBadge();
        showDoneNotification();
        return;
      }

      chrome.storage.local.set({
        isActive: false,
        endTime: null,
        timerMode: "focus",
        isLongBreak: false,
        timeLeftSeconds: (res.customMinutes || 25) * 60,
        lastSessionDate: getToday(),
        sessionHistory: res.sessionHistory || []
      });
      showBreakDoneBadge();
    }
  );
}

chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "startTimer") {
    clearBadge();
    if (message.endTime) {
      scheduleAlarm(message.endTime);
    }
    return;
  }

  if (message.type === "stopTimer") {
    chrome.alarms.clear(TIMER_ALARM);
    return;
  }

  if (message.type === "timerComplete") {
    chrome.alarms.clear(TIMER_ALARM);
    completeSessionIfActive({
      timerMode: message.expectedTimerMode,
      endTime: message.expectedEndTime
    });
    return;
  }

  if (message.type === "clearBadge") {
    clearBadge();
  }
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === TIMER_ALARM) {
    completeSessionIfActive({ endTime: alarm.scheduledTime });
  }
});

chrome.runtime.onStartup.addListener(() => {
  recoverAlarmFromStorage();
});

chrome.runtime.onInstalled.addListener(() => {
  recoverAlarmFromStorage();
});
