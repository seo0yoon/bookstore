import { initializeApp, getApps } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import firebaseConfig from "../firebase/firestore";

let firebaseApp;

if (!getApps().length) {
  firebaseApp = initializeApp(firebaseConfig);
} else {
  firebaseApp = getApps()[0];
}

const auth = getAuth(firebaseApp);

const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    var user = userCredential.user;
    console.log("User logged in: ", user);
    return user;
  } catch (error) {
    console.error("Error signing in: ", error);
    throw error;
  }
};

const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    var user = userCredential.user;
    console.log("User signed up: ", user);
    return user;
  } catch (error) {
    console.error("Error signing up: ", error);
    throw error;
  }
};

export { signIn, signUp };
