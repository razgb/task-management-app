import { addUserIdToUsersCollection } from "./addUserIdToUsersCollection";
import { createFirebaseUser } from "./createFirebaseUser";

export async function signup({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    const userCredential = await createFirebaseUser(email, password);
    const userID = userCredential.user.uid;
    await addUserIdToUsersCollection(userID);
  } catch (err) {
    if (err instanceof Error) {
      console.log(err); // temp
      throw err;
    } else {
      throw new Error("Error signing you up, check connection and try again.");
    }
  }
}
