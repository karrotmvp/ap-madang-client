import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FA_KEY,
  authDomain: process.env.REACT_APP_FA_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FA_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FA_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FA_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FA_APP_ID,
  measurementId: process.env.REACT_APP_FA_MEASUREMENT_ID,
};

export const app = initializeApp(firebaseConfig);
