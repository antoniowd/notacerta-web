import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const {
  VITE_FB_API_KEY,
  VITE_FB_AUTH_DOMAIN,
  VITE_FB_PROJECT_ID,
  VITE_FB_STORAGE_BUCKET,
  VITE_FB_MESSAGING_SENDER_ID,
  VITE_FB_APP_ID,
} = import.meta.env;

const firebaseConfig = {
  apiKey: VITE_FB_API_KEY,
  authDomain: VITE_FB_AUTH_DOMAIN,
  projectId: VITE_FB_PROJECT_ID,
  storageBucket: VITE_FB_STORAGE_BUCKET,
  messagingSenderId: VITE_FB_MESSAGING_SENDER_ID,
  appId: VITE_FB_APP_ID,
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
