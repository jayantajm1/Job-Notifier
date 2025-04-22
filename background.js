let storedJobs = [];
let notificationEnabled = true;

// Load saved settings on startup
chrome.storage.sync.get(["notificationEnabled"], (result) => {
  notificationEnabled = result.notificationEnabled !== false;
});
chrome.storage.local.get(["jobNotifications"], (result) => {
  if (result.jobNotifications) {
    storedJobs = result.jobNotifications;
  }
});

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === "JOBS_FOUND") {
    storedJobs = msg.jobs;
    chrome.storage.local.set({ jobNotifications: storedJobs });

    if (notificationEnabled && msg.jobs.length > 0) {
      chrome.notifications.create({
        type: "basic",
        iconUrl: "icons/icon.png",
        title: `Found ${msg.jobs.length} new jobs`,
        message: "Click to view matching jobs",
        priority: 1,
      });
    }
  }

  if (msg.type === "GET_JOBS") {
    sendResponse({ jobs: storedJobs });
  }

  if (msg.type === "TOGGLE_NOTIFICATION") {
    notificationEnabled = msg.enabled;
    chrome.storage.sync.set({ notificationEnabled });
  }
});

// Optional: On notification click, open extension popup or dashboard
chrome.notifications.onClicked.addListener(() => {
  chrome.runtime.openOptionsPage?.(); // or use tabs.create()
});
