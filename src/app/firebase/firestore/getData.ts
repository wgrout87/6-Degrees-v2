import firebase_app from "../config";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const db = getFirestore(firebase_app);

async function getDocument(collection: string, id: string) {
  const docRef = doc(db, collection, id);

  let result = null;
  let error = null;

  try {
    const doc = await getDoc(docRef);
    result = doc.data();
  } catch (e) {
    error = e;
  }

  return await { result, error };
}

export default getDocument;
