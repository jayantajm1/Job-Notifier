 # 🚀 Job Notifier Chrome Extension 🔔

**Job Notifier** is a powerful, lightweight Chrome Extension that helps users stay ahead in their job search by scraping real-time job listings from platforms like LinkedIn, Internshala, Naukri, and Indeed. It offers keyword filtering, job notifications, and even an auto-apply helper by storing your personal profile.

---

### ✨ Features

- 🔎 **Job Scraping** from multiple job portals
- 🔔 **Real-Time Notifications** for matching job listings
- 📝 **Keyword Filter** for relevant results
- 👤 **User Profile Manager** (Name, Email, Phone, Resume)
- 🧠 **Auto-Fill** job applications using saved profile
- 💾 **Storage with Chrome API** (sync/local)
- 📦 **Modern UI** with search, filtering, and saved jobs
- 🌐 **Responsive design** & mobile-friendly popup

---

### 📷 Demo Preview

> ![image](https://github.com/user-attachments/assets/d52316ee-329b-4744-8e10-9a42e13b8c53)


---

### 🔧 Installation

1. Clone or [Download](https://github.com/jayantajm1/job-notifier) this repository.
2. Go to `chrome://extensions/` in your browser.
3. Enable **Developer Mode** (top right).
4. Click **Load Unpacked** and select the cloned folder.
5. The **Job Notifier** extension is now installed! 🎉

---

### 🛠 Technologies Used

- **JavaScript (ES6+)** – Core logic for scraping, filtering, and interaction  
- **HTML5 + CSS3** – Lightweight, responsive popup and options UI  
- **Chrome Extension APIs** –  
  - `storage` (sync & local) – Save profile, keyword, resume  
  - `runtime`, `tabs`, `scripting`, `notifications` – Message passing & interaction  
- **Firebase** –  
  - **Firestore Database** – Store user profiles and saved jobs  
  - **Firebase Authentication** – Manage user login (if enabled)  
  - **Firebase Storage** – Store and retrieve uploaded resumes  
- **DOM Parsing & MutationObserver** – For dynamic job content scraping (e.g., LinkedIn)  
- **Base64 + File API** – Resume upload and auto-fill support  
- **Responsive Design** – Mobile-friendly popup using Flexbox  
- **Modular File Structure** – Background scripts, content scripts, popup UI separation


---

### 📁 Folder Structure


