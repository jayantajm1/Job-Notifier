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

  // Load keyword filter and notification settings
  chrome.storage.sync.get(
    ["jobKeyword", "notificationEnabled"],
    function (result) {
      if (result.jobKeyword) keywordInput.value = result.jobKeyword;
      notifToggle.checked = result.notificationEnabled !== false;
    }
  );

  // Save keyword
  saveButton.addEventListener("click", () => {
    const keyword = keywordInput.value.trim();
    if (!keyword) {
      statusText.textContent = "⚠️ Please enter a keyword";
      setTimeout(() => (statusText.textContent = ""), 2000);
      return;
    }
    chrome.storage.sync.set({ jobKeyword: keyword }, () => {
      statusText.textContent = "✅ Filter saved!";
      setTimeout(() => (statusText.textContent = ""), 2000);
    });
  });

  notifToggle.addEventListener("change", function () {
    chrome.runtime.sendMessage({
      type: "TOGGLE_NOTIFICATION",
      enabled: this.checked,
    });
  });

  // 🔐 Firebase Auth and Load Profile
  firebase
    .auth()
    .signInAnonymously()
    .then(() => {
      firebase.auth().onAuthStateChanged(async (user) => {
        if (user) {
          const docRef = firebase
            .firestore()
            .collection("profiles")
            .doc(user.uid);
          const docSnap = await docRef.get();
          if (docSnap.exists) {
            const data = docSnap.data();
            nameInput.value = data.name || "";
            emailInput.value = data.email || "";
            phoneInput.value = data.phone || "";
          }
        }
      });
    });

  // 🔁 Save Profile with Resume Upload
  saveProfileBtn.addEventListener("click", async () => {
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();

    if (!name || !email || !phone) {
      profileStatus.textContent = "⚠️ Please fill all fields";
      setTimeout(() => (profileStatus.textContent = ""), 2000);
      return;
    }

    try {
      const user = firebase.auth().currentUser;
      let resumeURL = "";

      if (resumeInput.files.length > 0) {
        const file = resumeInput.files[0];
        const fileRef = firebase
          .storage()
          .ref(`${user.uid}/resume.${file.name.split(".").pop()}`);
        await fileRef.put(file);
        resumeURL = await fileRef.getDownloadURL();
      }

      await firebase.firestore().collection("profiles").doc(user.uid).set({
        name,
        email,
        phone,
        resumeURL,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      });

      profileStatus.textContent = "✅ Profile saved to Firebase!";
      setTimeout(() => (profileStatus.textContent = ""), 2000);
    } catch (err) {
      console.error("Error saving profile:", err);
      profileStatus.textContent = "❌ Failed to save profile!";
    }
  });

  // Load job list from background script
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

  // Manual job refresh
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
