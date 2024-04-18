import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBiDOOhnKbRLfT3lXt2Lyg4Kz4flj6jzv0",
  authDomain: "dropbox-clone-35d2e.firebaseapp.com",
  projectId: "dropbox-clone-35d2e",
  storageBucket: "dropbox-clone-35d2e.appspot.com",
  messagingSenderId: "424315806544",
  appId: "1:424315806544:web:94a04a569834edb9620255",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export {db, storage};