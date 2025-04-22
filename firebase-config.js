// // firebase-config.js
// import { initializeApp } from "firebase/app";
// import {
//   getAuth,
//   signInAnonymously,
//   onAuthStateChanged
// } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage";

// const firebaseConfig = {
//   apiKey: "AIzaSyAdlEJblDhmis4LgZkfVkyh0cNb0od4QQE",
//   authDomain: "job-notifier-extension.firebaseapp.com",
//   projectId: "job-notifier-extension",
//   storageBucket: "job-notifier-extension.appspot.com",
//   messagingSenderId: "624954980496",
//   appId: "1:624954980496:web:240d08f074f92add374015"
// };

// const app = initializeApp(firebaseConfig);

// // Export Firebase services
// export const auth = getAuth(app);
// export const db = getFirestore(app);
// export const storage = getStorage(app);

//last
// firebase-config.js
const firebaseConfig = {
  apiKey: "AIzaSyAdlEJblDhmis4LgZkfVkyh0cNb0od4QQE",
  authDomain: "job-notifier-extension.firebaseapp.com",
  projectId: "job-notifier-extension",
  storageBucket: "job-notifier-extension.appspot.com",
  messagingSenderId: "624954980496",
  appId: "1:624954980496:web:240d08f074f92add374015",
};

firebase.initializeApp(firebaseConfig);
