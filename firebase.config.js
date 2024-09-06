import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBXk0ynDzw_YxsYds5v1JEkLqDCBomEgR4",
  authDomain: "course-code-task.firebaseapp.com",
  projectId: "course-code-task",
  storageBucket: "course-code-task.appspot.com",
  messagingSenderId: "366067283579",
  appId: "1:366067283579:web:ccd9f235db700b3d8314de"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app