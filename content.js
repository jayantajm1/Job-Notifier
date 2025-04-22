// document.addEventListener("DOMContentLoaded", () => {
//   const domain = window.location.hostname;
//   const SUPPORTED_DOMAINS = ["internshala", "naukri", "indeed", "linkedin"];
//   if (!SUPPORTED_DOMAINS.some((d) => domain.includes(d))) return;

//   const jobs = [];

//   // Scraping logic for different domains
//   if (domain.includes("internshala")) {
//     document.querySelectorAll(".individual_internship").forEach((card) => {
//       const title = card.querySelector(".profile")?.innerText?.trim();
//       const link = card.querySelector("a")?.href;
//       if (title && link) jobs.push({ title, link });
//     });
//   } else if (domain.includes("naukri")) {
//     document.querySelectorAll(".jobTuple").forEach((card) => {
//       const title = card.querySelector(".title")?.innerText?.trim();
//       const link = card.querySelector("a.title")?.href;
//       if (title && link) jobs.push({ title, link });
//     });
//   } else if (domain.includes("indeed")) {
//     document.querySelectorAll(".result").forEach((card) => {
//       const title = card.querySelector("h2 span")?.innerText?.trim();
//       const link =
//         "https://indeed.com" + card.querySelector("a")?.getAttribute("href");
//       if (title && link) jobs.push({ title, link });
//     });
//   } else if (domain.includes("linkedin")) {
//     document.querySelectorAll(".job-card-container").forEach((card) => {
//       const title = card
//         .querySelector(".job-card-list__title")
//         ?.innerText?.trim();
//       const link = card.querySelector("a")?.href;
//       if (title && link) jobs.push({ title, link });
//     });
//   }

//   // Filter jobs by keyword
//   chrome.storage.sync.get(["jobKeyword"], (res) => {
//     const keyword = res.jobKeyword?.toLowerCase() || "";
//     const filteredJobs = jobs.filter((job) =>
//       job.title.toLowerCase().includes(keyword)
//     );

//     if (filteredJobs.length > 0) {
//       chrome.runtime.sendMessage({ type: "JOBS_FOUND", jobs: filteredJobs });
//     }
//   });
// });

// // 🔁 Auto-apply form filler
// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   if (request.type === "AUTO_APPLY") {
//     const confirmed = confirm("Do you want to auto-fill this job application?");
//     if (!confirmed) return;

//     chrome.storage.local.get(["userProfile"], ({ userProfile }) => {
//       if (!userProfile) {
//         alert("⚠️ Please save your profile information first.");
//         return;
//       }

//       try {
//         const nameInput = document.querySelector('input[name*="name" i]');
//         const emailInput = document.querySelector('input[name*="email" i]');
//         const phoneInput = document.querySelector('input[name*="phone" i]');
//         const submitBtn =
//           document.querySelector('button[type="submit"]') ||
//           document.querySelector('input[type="submit"]');

//         if (nameInput) nameInput.value = userProfile.name;
//         if (emailInput) emailInput.value = userProfile.email;
//         if (phoneInput) phoneInput.value = userProfile.phone;

//         if (submitBtn) {
//           submitBtn.click();
//           alert("✅ Application submitted successfully!");
//         } else {
//           alert("Form filled, but no submit button found.");
//         }
//       } catch (e) {
//         console.error("Auto-apply error:", e);
//         alert("❌ Error auto-filling form. See console for details.");
//       }
//     });
//   }
// });

document.addEventListener("DOMContentLoaded", () => {
  const domain = window.location.hostname;
  const SUPPORTED_DOMAINS = ["internshala", "naukri", "indeed", "linkedin"];
  if (!SUPPORTED_DOMAINS.some((d) => domain.includes(d))) return;

  const jobs = [];

  const collectJobs = () => {
    jobs.length = 0; // clear if MutationObserver re-triggers

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

    chrome.storage.sync.get(["jobKeyword"], (res) => {
      const keyword = res.jobKeyword?.toLowerCase() || "";
      const filteredJobs = jobs.filter((job) =>
        job.title.toLowerCase().includes(keyword)
      );

      if (filteredJobs.length > 0) {
        chrome.runtime.sendMessage({ type: "JOBS_FOUND", jobs: filteredJobs });
      }
    });
  };

  // For dynamic content (LinkedIn, etc.)
  const observer = new MutationObserver(() => {
    collectJobs();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  // Initial call
  collectJobs();
});

// 🧠 Auto-fill form fields + resume upload
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "AUTO_APPLY") {
    const confirmed = confirm("Do you want to auto-fill this job application?");
    if (!confirmed) return;

    chrome.storage.local.get(["userProfile"], ({ userProfile }) => {
      if (!userProfile) {
        alert("⚠️ Please save your profile information first.");
        return;
      }

      try {
        const nameInput = document.querySelector('input[name*="name" i]');
        const emailInput = document.querySelector('input[name*="email" i]');
        const phoneInput = document.querySelector('input[name*="phone" i]');
        const resumeInput = document.querySelector('input[type="file"]');
        const submitBtn =
          document.querySelector('button[type="submit"]') ||
          document.querySelector('input[type="submit"]');

        if (nameInput) nameInput.value = userProfile.name;
        if (emailInput) emailInput.value = userProfile.email;
        if (phoneInput) phoneInput.value = userProfile.phone;

        // Auto-upload resume if file input is available
        if (resumeInput && userProfile.resumeBase64) {
          const blob = b64toBlob(userProfile.resumeBase64, "application/pdf");
          const file = new File([blob], "resume.pdf", {
            type: "application/pdf",
          });
          const dataTransfer = new DataTransfer();
          dataTransfer.items.add(file);
          resumeInput.files = dataTransfer.files;
        }

        if (submitBtn) {
          submitBtn.click();
          alert("✅ Application submitted successfully!");
        } else {
          alert("Form filled, but no submit button found.");
        }
      } catch (e) {
        console.error("Auto-apply error:", e);
        alert("❌ Error auto-filling form. See console for details.");
      }
    });
  }
});

// Helper: Convert Base64 to Blob
function b64toBlob(base64, mime) {
  const byteChars = atob(base64);
  const byteArrays = [];
  for (let offset = 0; offset < byteChars.length; offset += 512) {
    const slice = byteChars.slice(offset, offset + 512);
    const byteNumbers = new Array(slice.length)
      .fill(0)
      .map((_, i) => slice.charCodeAt(i));
    byteArrays.push(new Uint8Array(byteNumbers));
  }
  return new Blob(byteArrays, { type: mime });
}
