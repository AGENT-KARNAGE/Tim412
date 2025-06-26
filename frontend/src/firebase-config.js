import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";
import { getAuth } from 'firebase/auth';         // ✅ ADD THIS
import { getStorage } from 'firebase/storage';   // ✅ AND THIS

const firebaseConfig = {
  apiKey: "AIzaSyDK4-xzSBa9X2mRJFr0YW9spgknBfMTipc",
  authDomain: "tim412app.firebaseapp.com",
  projectId: "tim412app",
  storageBucket: "tim412app.firebasestorage.app",
  messagingSenderId: "957435886105",
  appId: "1:957435886105:web:4753406eae19b23aebc888",
  measurementId: "G-MD1PS2PG09"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
export const auth = getAuth(app); // ✅ make sure this is included
export const storage = getStorage(app); // ✅ only if using storage
export {db}


