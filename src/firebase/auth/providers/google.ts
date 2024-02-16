import { GoogleAuthProvider } from "firebase/auth";

const googleAuthProvider = new GoogleAuthProvider();

googleAuthProvider.setCustomParameters({
  prompt: "select_account",
});

export default googleAuthProvider;
