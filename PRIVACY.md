# Privacy Policy — Focus Garden

**Last updated: October 5, 2026**

## Summary

Focus Garden stores the information needed for its timer, task list, session history, goals, and virtual garden in `chrome.storage.local` on your device. This includes text you enter for task and plant names. The extension uses this information only to provide these features.

Focus Garden does not create an account, sync data to the cloud, or send your timer, task, session, or plant data to SpaceKeep or another server. The extension code contains no analytics, tracking, or advertising functionality, and it does not access browsing history, open tabs, or page content.

## Information Stored Locally

| Information | How Focus Garden uses it |
|---|---|
| Timer state: `isActive`, `endTime`, `timerMode`, `timeLeftSeconds` | Resume the timer and keep its countdown accurate when the popup is closed. |
| Timer settings and cycle: `customMinutes`, `breakMinutes`, `longBreakMinutes`, `breakModeEnabled`, `sessionsUntilLongBreak`, `isLongBreak`, `completedFocusSessionsInCycle` | Run focus sessions, short and long breaks, and the configured Pomodoro cycle. |
| Session totals and daily history: `focusSessions`, `totalFocusSessions`, `lastSessionDate`, `sessionHistory` | Show daily and lifetime totals, the recent chart, streaks, and garden progress. Daily history retains up to 30 entries. |
| Detailed session log: `focusSessionLog` | Show the latest completed focus sessions, including completion time and duration. Each entry may also contain the associated task ID and a copy of its task title. The log keeps up to 5,000 entries. |
| Tasks: `focusTasks`, `activeTaskId` | Store task IDs, titles you enter, creation times, completion status, and the task selected for a future session. |
| Current session task: `currentSessionTaskId`, `currentSessionTaskTitle` | Keep the selected task associated with a focus session while its timer is running or paused. |
| Daily goal: `dailyGoalSessions` | Store your chosen daily focus-session target and show its progress. |
| Plant customization: `plantName`, `plantSpecies` | Display the plant name and style you choose. |
| Onboarding: `onboardingDone` | Remember whether the welcome screen has been completed. |

Milestones and achievements are calculated locally from session totals and daily history; they do not create a separate profile or remote record.

## Use, Sharing, and Retention

All information above is used only to operate and display Focus Garden's features. It stays in the browser's local extension storage and is not shared with SpaceKeep, analytics providers, advertisers, or other third parties. Chrome documents that `chrome.storage.local` data is cleared when the extension is removed. [Learn more about Chrome extension storage](https://developer.chrome.com/docs/extensions/reference/api/storage/).

You can delete tasks individually from the task list. Deleting a task does not remove the task-title copy from completed session entries already in the history. Focus Garden currently has no in-app control to clear the entire session history; the detailed log is limited to the latest 5,000 sessions. Removing the extension clears its local extension storage.

Chrome's local extension storage is not an encrypted password vault. Avoid using task or plant names to store passwords or other secrets.

## Uninstall Page and External Links

When Focus Garden is uninstalled, Chrome is configured to open [focus-garden.spacekeep.dev/uninstall](https://focus-garden.spacekeep.dev/uninstall). Focus Garden does not add timer, task, session, or plant data to that URL. As with any website visit, the site receiving the request may receive ordinary connection information such as your IP address and request headers; its own privacy practices apply to that visit.

The popup also includes a GitHub link. The GitHub website receives a request only if you choose to open that link.

## Permissions

| Permission | Reason |
|---|---|
| `storage` | Save timer state, settings, tasks, session history, goals, and plant customization on your device. |
| `alarms` | Keep the timer accurate when the popup is closed. |
| `notifications` | Show a browser notification when a focus session completes. |

## Chrome Web Store Privacy Disclosure

The Chrome Web Store privacy-practices disclosure should match this policy and the extension's behavior. The dashboard should disclose that task and plant names are user-provided content and that timer and completed-session information is stored locally for the timer, task, history, goal, and garden features. This repository policy does not update the developer-dashboard disclosure.

## Contact

For questions or support, open an issue at [github.com/SpaceKeep/Focus-Garden](https://github.com/SpaceKeep/Focus-Garden).
