(function scrapeJobs() {
  const domain = window.location.hostname;
  const jobs = [];

  // Scraping logic for different domains
  if (domain.includes("internshala")) {
    document.querySelectorAll(".individual_internship").forEach((card) => {
      const title = card.querySelector(".profile")?.innerText?.trim();
      const link = card.querySelector("a")?.href;
      if (title && link) jobs.push({ title, link });
    });
  } else if (domain.includes("naukri")) {
    document.querySelectorAll(".jobTuple").forEach((card) => {
      const title = card.querySelector(".title")?.innerText?.trim();
      const link = card.querySelector("a.title")?.href;
      if (title && link) jobs.push({ title, link });
    });
  } else if (domain.includes("indeed")) {
    document.querySelectorAll(".result").forEach((card) => {
      const title = card.querySelector("h2 span")?.innerText?.trim();
      const link =
        "https://indeed.com" + card.querySelector("a")?.getAttribute("href");
      if (title && link) jobs.push({ title, link });
    });
  } else if (domain.includes("linkedin")) {
    document.querySelectorAll(".job-card-container").forEach((card) => {
      const title = card
        .querySelector(".job-card-list__title")
        ?.innerText?.trim();
      const link = card.querySelector("a")?.href;
      if (title && link) jobs.push({ title, link });
    });
  }

  // Filter jobs based on the keyword stored in chrome.storage
  chrome.storage.sync.get(["jobKeyword"], (res) => {
    const keyword = res.jobKeyword?.toLowerCase() || "";
    const filteredJobs = jobs.filter((job) =>
      job.title.toLowerCase().includes(keyword)
    );

    if (filteredJobs.length > 0) {
      chrome.runtime.sendMessage({ type: "JOBS_FOUND", jobs: filteredJobs });
    }
  });
})();

// Auto-apply feature with confirmation
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "AUTO_APPLY") {
    const confirmed = confirm("Do you want to auto-fill this job application?");
    if (confirmed) {
      chrome.storage.local.get(["userProfile"], ({ userProfile }) => {
        if (!userProfile) {
          alert("Please save your profile information first.");
          return;
        }

        try {
          const nameInput = document.querySelector('input[name="name"]');
          const emailInput = document.querySelector('input[name="email"]');
          const phoneInput = document.querySelector('input[name="phone"]');
          const submitBtn =
            document.querySelector('button[type="submit"]') ||
            document.querySelector('input[type="submit"]');

          if (nameInput) nameInput.value = userProfile.name;
          if (emailInput) emailInput.value = userProfile.email;
          if (phoneInput) phoneInput.value = userProfile.phone;

          if (submitBtn) {
            submitBtn.click();
            alert("Application submitted successfully!");
          } else {
            alert("Form filled but submit button not found.");
          }
        } catch (e) {
          console.error("Auto-apply error:", e);
          alert("Error auto-filling form. Please check console for details.");
        }
      });
    }
  }
});
