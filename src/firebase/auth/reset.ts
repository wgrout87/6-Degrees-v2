import firebase_app from "../config";
import { sendPasswordResetEmail, getAuth } from "firebase/auth";

const auth = getAuth(firebase_app);

export default async function passwordReset(email: string) {
  let error = null;
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (e) {
    error = e;
  }

  return error;
}
