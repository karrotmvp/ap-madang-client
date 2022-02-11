import { Auth, signInAnonymously, signOut } from 'firebase/auth';

import { auth } from '../../../util/firebase';

type registerErrorType = {
  code: string;
  message: string;
};

export const anonymousLogin = async (authValue: Auth) => {
  try {
    const user = await signInAnonymously(authValue);
    return user;
  } catch (error) {
    const errorCode = (error as registerErrorType)?.code;
    const errorMessage = (error as registerErrorType)?.message;
    console.log(errorCode, errorMessage);
    return undefined;
  }
};

export const logout = async () => {
  await signOut(auth);
};
