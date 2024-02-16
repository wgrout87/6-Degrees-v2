import firebase_app from "../config";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import addData from "@/firebase/firestore/addData";
import Collections from "@/firebase/firestore/collections";
import User from "@/zod/user";
import { z } from "zod";

const auth = getAuth(firebase_app);

export default async function signUp(email: string, password: string) {
  let result = null,
    error = null;
  try {
    const signUpResult = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const {
      displayName,
      photoURL,
      metadata: { creationTime },
      phoneNumber,
      emailVerified,
      providerId,
    } = signUpResult.user;

    let user = await addData(Collections.Users, signUpResult.user.uid, {
      displayName,
      photoURL,
      email,
      creationTime,
      phoneNumber,
      emailVerified,
      providerId,
    });
    result = User.parse(user.result);
  } catch (e) {
    error = e;
  }

  return { result, error };
}
