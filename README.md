 # 🚀 Job Notifier Chrome Extension 🔔

**Job Notifier** is a powerful, lightweight Chrome Extension that revolutionizes your job search experience. Built with modern web technologies, it helps users stay ahead in their job search by scraping real-time job listings from popular platforms like **LinkedIn**, **Internshala**, **Naukri**, and **Indeed**. 

This extension combines intelligent keyword filtering, instant browser notifications, and seamless profile management with Firebase integration. Whether you're a fresh graduate, career switcher, or seasoned professional, Job Notifier streamlines your job application process by automatically detecting relevant opportunities and storing your professional profile for quick applications.

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

1. [Clone](https://github.com/jayantajm1/Job-Notifier.git) or [Download](https://github.com/jayantajm1/Job-Notifier/archive/refs/heads/main.zip) this repository.
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

```
Job-Notifier/
├── api/                    # API placeholder for future integrations
├── firebase/               # Firebase SDK modules
│   ├── firebase-app.js     # Core Firebase app
│   ├── firebase-auth.js    # Authentication module
│   ├── firebase-firestore.js  # Firestore database module
│   └── firebase-storage.js    # Storage module for resumes
├── icons/                  # Extension icons
│   └── icon.png           # Main extension icon
├── background.js          # Background service worker for notifications
├── content.js             # Content script for job scraping
├── manifest.json          # Chrome extension configuration
├── popup.html             # Extension popup UI
├── popup.js               # Popup logic and Firebase integration
├── style.css              # Popup styling
├── package.json           # Node.js dependencies (Firebase)
└── README.md              # Project documentation
```

---

### 🚀 How It Works

1. **Job Scraping**: The content script (`content.js`) runs on supported job portal pages and scrapes job listings based on DOM structure
2. **Keyword Filtering**: Jobs are filtered based on user-defined keywords stored in Chrome sync storage
3. **Real-Time Notifications**: When matching jobs are found, the background service worker sends Chrome notifications
4. **Profile Management**: User profiles (name, email, phone, resume) are stored in Firebase Firestore
5. **Resume Storage**: Uploaded resumes are stored in Firebase Storage for easy retrieval and auto-fill

---

### 🎯 Usage

1. **Set Job Keywords**:
   - Click the extension icon
   - Enter your desired job keywords (e.g., "React Developer", "Python Engineer")
   - Click "Save Filter"

2. **Manage Your Profile**:
   - Fill in your personal details (Name, Email, Phone)
   - Upload your resume
   - Click "Save Profile"

3. **Enable Notifications**:
   - Toggle notifications ON/OFF from the extension popup
   - Get instant alerts when matching jobs are found

4. **Browse Jobs**:
   - Visit supported job portals (LinkedIn, Internshala, Naukri, Indeed)
   - The extension will automatically scrape and filter jobs
   - Check your saved jobs in the popup dashboard

---

### 🔮 Future Enhancements

- ✅ Auto-apply to jobs using saved profile
- 🔄 Background job scraping without visiting portals
- 📊 Analytics dashboard for application tracking
- 🤖 AI-powered job matching and recommendations
- 📱 Mobile app companion
- 🔗 Integration with more job portals

---

### 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/YourFeature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some feature'`)
5. Push to the branch (`git push origin feature/YourFeature`)
6. Open a Pull Request

---

### 📝 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

---

### 👤 Author

**Jayanta Mardi**

- GitHub: [@jayantajm1](https://github.com/jayantajm1)

---

### ⭐ Show Your Support

Give a ⭐ if this project helped you in your job search!

---

### 📞 Support

For issues, questions, or suggestions, please open an issue on the [GitHub repository](https://github.com/jayantajm1/Job-Notifier/issues).

---

**Built with ❤️ by developers, for job seekers**


