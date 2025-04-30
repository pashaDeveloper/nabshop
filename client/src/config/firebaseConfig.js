import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";  // Import the needed functions from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCWapth4zP5O_HKGj2bZmljomsmmEpyfSk",
  authDomain: "noghlenab-27357.firebaseapp.com",
  projectId: "noghlenab-27357",
  storageBucket: "noghlenab-27357.firebasestorage.app",
  messagingSenderId: "542842097824",
  appId: "1:542842097824:web:4fee601a7b33c5491079c5"
};

const app = initializeApp(firebaseConfig);

// Get Auth instance to use in your app
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
