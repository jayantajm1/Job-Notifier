document.addEventListener("DOMContentLoaded", function () {
  const keywordInput = document.getElementById("keyword");
  const saveButton = document.getElementById("save");
  const statusText = document.getElementById("status");
  const jobListDiv = document.getElementById("job-list");
  const notifToggle = document.getElementById("notifToggle");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const phoneInput = document.getElementById("phone");
  const resumeInput = document.getElementById("resume");
  const saveProfileBtn = document.getElementById("saveProfile");
  const profileStatus = document.getElementById("profileStatus");

  // Load saved settings
  chrome.storage.sync.get(
    ["jobKeyword", "notificationEnabled"],
    function (result) {
      if (result.jobKeyword) {
        keywordInput.value = result.jobKeyword;
      }
      notifToggle.checked = result.notificationEnabled !== false;
    }
  );

  // Load profile data
  chrome.storage.local.get(["userProfile"], function (data) {
    if (data.userProfile) {
      nameInput.value = data.userProfile.name || "";
      emailInput.value = data.userProfile.email || "";
      phoneInput.value = data.userProfile.phone || "";
    }
  });

  // Save keyword filter
  saveButton.addEventListener("click", () => {
    const keyword = keywordInput.value.trim();
    if (!keyword) {
      statusText.textContent = "⚠️ Please enter a keyword";
      setTimeout(() => (statusText.textContent = ""), 2000);
      return;
    }

    chrome.storage.sync.set({ jobKeyword: keyword }, function () {
      statusText.textContent = "✅ Filter saved!";
      setTimeout(() => (statusText.textContent = ""), 2000);
    });
  });

  // Toggle notifications
  notifToggle.addEventListener("change", function () {
    chrome.runtime.sendMessage({
      type: "TOGGLE_NOTIFICATION",
      enabled: this.checked,
    });
  });

  // Save profile
  saveProfileBtn.addEventListener("click", () => {
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();

    if (!name || !email || !phone) {
      profileStatus.textContent = "⚠️ Please fill all fields";
      setTimeout(() => (profileStatus.textContent = ""), 2000);
      return;
    }

    const userProfile = {
      name,
      email,
      phone,
    };

    // Handle resume file if selected
    if (resumeInput.files.length > 0) {
      const reader = new FileReader();
      reader.onload = function (e) {
        userProfile.resume = e.target.result;
        userProfile.resumeName = resumeInput.files[0].name;
        saveProfile(userProfile);
      };
      reader.readAsDataURL(resumeInput.files[0]);
    } else {
      saveProfile(userProfile);
    }
  });

  function saveProfile(profile) {
    chrome.storage.local.set({ userProfile: profile }, () => {
      profileStatus.textContent = "✅ Profile saved!";
      setTimeout(() => (profileStatus.textContent = ""), 2000);
    });
  }

  // Load stored jobs
  chrome.runtime.sendMessage({ type: "GET_JOBS" }, (response) => {
    if (response?.jobs?.length) {
      jobListDiv.innerHTML = "<h4>Latest Jobs</h4>";
      response.jobs.forEach((job) => {
        const jobElement = document.createElement("div");
        jobElement.className = "job-item";

        const titleLink = document.createElement("a");
        titleLink.href = job.link;
        titleLink.target = "_blank";
        titleLink.textContent = job.title;

        const applyBtn = document.createElement("button");
        applyBtn.className = "btn";
        applyBtn.textContent = "Auto-apply";
        applyBtn.addEventListener("click", (e) => {
          e.preventDefault();
          chrome.tabs.create({ url: job.link }, (tab) => {
            setTimeout(() => {
              chrome.tabs.sendMessage(tab.id, { type: "AUTO_APPLY" });
            }, 1000);
          });
        });

        jobElement.appendChild(titleLink);
        jobElement.appendChild(applyBtn);
        jobListDiv.appendChild(jobElement);
      });
    } else {
      jobListDiv.innerHTML =
        "<p>No jobs found yet. Visit a job site to scan.</p>";
    }
  });

  // Refresh jobs button
  document.getElementById("refreshJobs").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0) {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          files: ["content.js"],
        });
        statusText.textContent = "🔄 Scanning page...";
        setTimeout(() => (statusText.textContent = ""), 2000);
      }
    });
  });
});
