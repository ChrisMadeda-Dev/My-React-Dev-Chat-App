import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDYKM2NIiJVjso0yLK32QPdQRp0JknJLAY",
  authDomain: "mydevchatapp.firebaseapp.com",
  projectId: "mydevchatapp",
  storageBucket: "mydevchatapp.appspot.com",
  messagingSenderId: "182885861375",
  appId: "1:182885861375:web:8ece3cc52b2f32b31bc9ca",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
