import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC-9EohGCMBI6EonCfMHvwrgFCDH_lXpQw",
  authDomain: "crwn-clothing-db-1f477.firebaseapp.com",
  projectId: "crwn-clothing-db-1f477",
  storageBucket: "crwn-clothing-db-1f477.appspot.com",
  messagingSenderId: "406229502712",
  appId: "1:406229502712:web:bf60634a1f8b4d8321090d",
};

const firebaseApp = initializeApp(firebaseConfig);

// SECTION Firebase Authentication part ===========================

// Create Google Provider
const provider = new GoogleAuthProvider(firebaseApp);

provider.setCustomParameters({
  prompt: "select_account",
});

// NOTE Get Ref Auth
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, provider);

// NOTE Sign Up User with Email & Password
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

// NOTE Sign In User with Email & Password
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);

// !SECTION END Authentication part =================================

// SECTION FireStore Database part =================================

// NOTE Get FireStore Database
export const db = getFirestore();

// NOTE Add Object to Collection
export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  // Get Collection Ref
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    // Create a Document ref with auto-generated ID
    const docRef = doc(collectionRef, object.title.toLowerCase());
    // Use batch.set to set Document
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log("done");
};



// NOTE Get Users Collection -> Add User Document to FireStore
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  // Get User Document in Users Collection
  const userDocRef = doc(db, "users", userAuth.uid);

  // Get User detail in User Document
  const userSnapshot = await getDoc(userDocRef);

  // if User detail NOT exists -> Create User Document in Users Collection
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  return userDocRef;
};

// !SECTION END FireStore Database part ===========================
