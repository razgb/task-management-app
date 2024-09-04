import { collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../../../../main";

export async function addUserIdToUsersCollection(userID: string) {
  const usersCollection = collection(db, "users");

  try {
    await setDoc(doc(usersCollection, userID), {
      createdAt: serverTimestamp(),
    });
  } catch (err) {
    console.log(err); // temp
    throw new Error("Error signing you up, check connection and try again.");
  }
}
