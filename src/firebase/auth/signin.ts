import firebase_app from "../config";
import {
  signInWithEmailAndPassword,
  getAuth,
  signInWithPopup,
  AuthProvider,
} from "firebase/auth";
import googleAuthProvider from "./providers/google";
import getData from "../../firebase/firestore/getData";
import addData from "../../firebase/firestore/addData";
import Collections from "../firestore/collections";
import User from "../../zod/user";
import { z } from "zod";

const auth = getAuth(firebase_app);

function signInFactory(provider?: AuthProvider) {
  return async (creds?: {
    email?: string;
    password?: string;
  }): Promise<{ result?: z.infer<typeof User>; error?: unknown }> => {
    let result: z.infer<typeof User>,
      error = null;
    try {
      let authUser;
      if (provider) {
        authUser = await signInWithPopup(auth, provider);
        console.log({ authUser });
      } else if (creds?.email && creds?.password)
        authUser = await signInWithEmailAndPassword(
          auth,
          creds.email,
          creds.password
        );
      else throw new Error("no way to authenticate, try again");
      let user = await getData(Collections.Users, authUser.user.uid);
      if (user.result === undefined) {
        const {
          displayName,
          photoURL,
          metadata: { creationTime },
          phoneNumber,
          emailVerified,
          providerId,
          email,
        } = authUser.user;
        user = await addData(Collections.Users, authUser.user.uid, {
          displayName,
          photoURL,
          email,
          creationTime,
          phoneNumber,
          emailVerified,
          providerId,
        });
      }
      result = User.parse(user.result);

      return await { result };
    } catch (e) {
      console.log({ e });
      error = e;
      return { error };
    }
  };
}

const signInWithGoogle = signInFactory(googleAuthProvider);
const signIn = signInFactory();

export { signInWithGoogle, signIn };
