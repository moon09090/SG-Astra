// Bundled by esbuild into fb.js. Exposes window.FB for sync.js.
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInAnonymously, signOut, onAuthStateChanged } from "firebase/auth";
import { initializeFirestore, persistentLocalCache, collection, doc, getDoc, setDoc, updateDoc, deleteDoc, deleteField, FieldPath, onSnapshot, query, where } from "firebase/firestore";

const cfg = {
  apiKey: "AIzaSyBxqY1Np_OF-Ynjae4UaKUjvIPYujDsmrg",
  authDomain: "sgastra-90b3c.firebaseapp.com",
  projectId: "sgastra-90b3c",
  storageBucket: "sgastra-90b3c.firebasestorage.app",
  messagingSenderId: "164648092002",
  appId: "1:164648092002:web:1ea694e26971670f1dec3b"
};
const app = initializeApp(cfg);
const auth = getAuth(app);
const fs = initializeFirestore(app, { localCache: persistentLocalCache(), experimentalAutoDetectLongPolling: true });
let sec = null;
const secAuth = () => { if (!sec) sec = getAuth(initializeApp(cfg, "sec")); return sec; };

window.FB = {
  auth, apiKey: cfg.apiKey, projectId: cfg.projectId,
  signIn: (e, p) => signInWithEmailAndPassword(auth, e, p),
  signOut: () => signOut(auth),
  signInAnon: () => signInAnonymously(auth),
  onAuth: (f) => onAuthStateChanged(auth, f),
  createUser: async (e, p) => { const a = secAuth(); await createUserWithEmailAndPassword(a, e, p); await signOut(a); },
  coll: (n) => collection(fs, n),
  doc: (n, id) => doc(fs, n, id),
  getDoc, setDoc, updateDoc, deleteDoc, deleteField, FieldPath, onSnapshot, query, where
};
