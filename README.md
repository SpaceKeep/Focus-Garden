# 🌿 Focus Garden — Chrome Extension

Focus Garden is a local-first productivity extension for Chrome that combines a Pomodoro timer, a task list, session history, and a virtual garden. Stay focused, take structured breaks, and watch your garden grow.

## ✨ Features

- **Focus Timer** — Countdown timer using the Pomodoro technique
- **Break Mode** — Automatically starts a configurable break after each focus session
- **Pomodoro Cycles** — Configure short breaks and a longer break after a chosen number of focus sessions
- **Persistent Timer** — Timer keeps running accurately even when the popup is closed
- **Extension Badge** — Green ✓ when focus is done, blue ✓ when break is done; clears when you open the popup
- **Desktop Notifications** — Sends a browser notification when a focus session completes
- **Virtual Garden** — Visual progress indicator that grows from seedling to sprout to tree as total sessions increase
- **Plant Customization** — Name your plant and choose a plant style from the settings panel
- **Tasks** — Create local tasks, choose one for a focus session, and mark it complete
- **Session History** — Recent completed sessions with timestamps, durations, and optional task names, plus a 7-day chart and Today / This Week / All Time totals
- **Daily Goals & Streaks** — Set a daily session goal and track consecutive active days
- **Milestones & Achievements** — Cosmetic rewards for progress like 10 total sessions, a 7-day streak, or 4 sessions in one day
- **Daily Reset** — Session counter automatically resets at midnight; past days are saved to history
- **Onboarding** — Short welcome screen on first install explaining core features
- **Customizable Durations** — Set your own focus and break lengths via the settings panel
- **Break Mode Toggle** — Disable automatic breaks if you want to chain focus sessions

## 🔒 Privacy

Timer settings, tasks, task names, session history, goals, and plant customization stay in the browser's local extension storage. Focus Garden has no account or cloud sync, and its extension code contains no analytics or tracking functionality. See the [Privacy Policy](PRIVACY.md) for the data fields, retention, deletion behavior, and the uninstall-page request.

For the Chrome Web Store Developer Dashboard, use the published repository copy of this policy: <https://github.com/SpaceKeep/Focus-Garden/blob/main/PRIVACY.md>. Make sure the dashboard's privacy-practices disclosure also describes locally stored task and plant names plus timer and session-history data.

## 🛠 Tech Stack

- **Framework:** React + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Extension:** Chrome Manifest V3 with background service worker

## 🚀 Installation

Install from the [Chrome Web Store](https://chromewebstore.google.com/detail/focus-garden/hclkbohhcdajaninpcmpcmgekpbafami), or load the extension locally:

1. Clone the repo and install dependencies:
   ```bash
   npm install
   ```
2. Build the extension:
   ```bash
   npm run build
   ```
3. Open `chrome://extensions` in Chrome
4. Enable **Developer mode** (top right)
5. Click **Load unpacked** and select the `dist` folder

## 🔧 Development

```bash
npm run dev   # start Vite dev server
npm run build # production build to dist/
```

---

Built with ❤️ by [Iccrtlity](https://github.com/Iccrtlity)
