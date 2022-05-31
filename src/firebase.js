import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyANxS5_QKqAqZcWRvxTpUfUUdwwfPpbG_w",
  authDomain: "otp-login-a2c8a.firebaseapp.com",
  projectId: "otp-login-a2c8a",
  storageBucket: "otp-login-a2c8a.appspot.com",
  messagingSenderId: "901623349065",
  appId: "1:901623349065:web:be4c429d4db5326ac56498",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
