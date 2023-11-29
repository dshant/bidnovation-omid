import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyDXRQr1s2qO_kddB0qIpf311yX2WxoXLwA",
    authDomain: "bit-novation.firebaseapp.com",
    projectId: "bit-novation",
    storageBucket: "bit-novation.appspot.com",
    messagingSenderId: "417771665460",
    appId: "1:417771665460:web:5fe288c12c2407360bb261"
  };

export const app = initializeApp(firebaseConfig);