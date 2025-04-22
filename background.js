let storedJobs = [];
let notificationEnabled = true;

// Load saved preference
chrome.storage.sync.get(["notificationEnabled"], (result) => {
  notificationEnabled = result.notificationEnabled !== false;
});

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === "JOBS_FOUND") {
    storedJobs = msg.jobs;

    if (notificationEnabled && msg.jobs.length > 0) {
      // Show a single notification for all jobs
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
