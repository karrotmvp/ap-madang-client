import { initializeApp } from '@firebase/app';

const firebaseConfig = {
  apiKey: process.env.FA_KEY,
  authDomain: process.env.FA_AUTH_DOMAIN,
  projectId: process.env.FA_PROJECT_ID,
  storageBucket: process.env.FA_STORAGE_BUCKET,
  messagingSenderId: process.env.FA_MESSAGING_SENDER_ID,
  appId: process.env.FA_APP_ID,
  measurementId: process.env.FA_MEASUREMENT_ID,
};

export const app = initializeApp(firebaseConfig);
