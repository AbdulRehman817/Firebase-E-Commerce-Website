// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-analytics.js";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  uploadBytes,
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-storage.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import {
  getFirestore,
  collection,
  addDoc,
  setDoc,
  onSnapshot,
  doc,
  serverTimestamp,
  query,
  orderBy,
  limit,
  getDocs,
  getDoc,
  where,
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCAxQkFfdsRm8mEnnhcaTCt2x7NZKhUE98",
  authDomain: "fir-practice-5fe3e.firebaseapp.com",
  projectId: "fir-practice-5fe3e",
  storageBucket: "fir-practice-5fe3e.appspot.com",
  messagingSenderId: "816239303668",
  appId: "1:816239303668:web:d072dab5dfafcc447637a1",
  measurementId: "G-TSTF3HG8CP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const storage = getStorage(app);

const db = getFirestore(app);

const analytics = getAnalytics(app);

export {
  signOut,
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signInWithPopup,
  provider,
  GoogleAuthProvider,
  collection,
  addDoc,
  db,
  setDoc,
  doc,
  onSnapshot,
  serverTimestamp,
  query,
  orderBy,
  limit,
  uploadBytesResumable,
  getDownloadURL,
  storage,
  uploadBytes,
  ref,
  getDocs,
  updateProfile,
  getDoc,
  where,
};
