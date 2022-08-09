import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA4GGY0EnDDrYASaTEjKDFsqMHGOc2n9bY",
  authDomain: "hahatalks-fc12e.firebaseapp.com",
  databaseURL: "https://hahatalks-fc12e-default-rtdb.firebaseio.com",
  projectId: "hahatalks-fc12e",
  storageBucket: "hahatalks-fc12e.appspot.com",
  messagingSenderId: "867430932596",
  appId: "1:867430932596:web:5475d990b9add70522f121",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
