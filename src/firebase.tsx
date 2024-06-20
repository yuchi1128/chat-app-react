import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAlB0PW8mnr3aBCs_qprtVr0vf0y2G2PRY",
  authDomain: "yucchy-s-disord.firebaseapp.com",
  projectId: "yucchy-s-disord",
  storageBucket: "yucchy-s-disord.appspot.com",
  messagingSenderId: "901332843408",
  appId: "1:901332843408:web:fb37987f37b3a269171115"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, db };
