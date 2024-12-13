import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { enableIndexedDbPersistence } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAOzAdAUiLqto7yIG9n_5ySITVvEF5a-Ww",
  authDomain: "vihanmall.firebaseapp.com",
  projectId: "vihanmall",
  storageBucket: "vihanmall.firebasestorage.app",
  messagingSenderId: "57781762303",
  appId: "1:57781762303:web:511cd0200be1a6909e34ca",
  measurementId: "G-2PBG9R8CLZ"
};

const app = initializeApp(firebaseConfig);
export const secondaryApp = initializeApp(firebaseConfig, 'SecondaryApp');
export const firestore = getFirestore(app);
export const auth = getAuth(app);

// // Enable offline persistence
// enableIndexedDbPersistence(firestore, {
//   forceOwnership: false // Enables multi-tab support
// }).catch((err) => {
//   if (err.code === 'failed-precondition') {
//     console.error('Persistence failed: Multiple tabs open. Persistence can only be enabled in one tab at a time.');
//   } else if (err.code === 'unimplemented') {
//     console.error('Persistence failed: Browser does not support required features');
//   }
// });
