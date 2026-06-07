ConsentLens 🔍

**ConsentLens** is a lightweight Google Chrome extension (Manifest V3) that reads website privacy policies for you and instantly displays a simple, calculated risk tier (**Low, Medium, or High Risk**).


 📊 Risk Categories & Logic
The extension evaluates web pages using a custom, point-based penalty system:

* 🟢 **Low Risk (0 - 1 points):** Clean policies or sites with basic, non-intrusive trackers.
* 🟠 **Medium Risk (2 - 4 points):** Sites using standard **tracking cookies** (+1) or **behavioral advertising** (+2).
* 🔴 **High Risk (> 4 points):** Sites containing severe data-sharing terms or using heavy corporate tracking platforms like **OneTrust** (+5).

 ✨ Core Features
* **100% Private:** Operates entirely client-side inside the browser; no user data ever leaves your device.
* **Asynchronous Processing:** Fetches and reads text in the background without slowing down the active webpage.

 🚀 How to Install
1. Download this repository to your computer.
2. Open Google Chrome and navigate to `chrome://extensions/`.
3. Toggle on **Developer mode** in the top-right corner.
4. Click **Load unpacked** in the top-left corner and select your project folder.
