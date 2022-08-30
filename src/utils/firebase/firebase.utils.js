import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC-9EohGCMBI6EonCfMHvwrgFCDH_lXpQw",
  authDomain: "crwn-clothing-db-1f477.firebaseapp.com",
  projectId: "crwn-clothing-db-1f477",
  storageBucket: "crwn-clothing-db-1f477.appspot.com",
  messagingSenderId: "406229502712",
  appId: "1:406229502712:web:bf60634a1f8b4d8321090d",
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  console.log(userAuth);
};

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
