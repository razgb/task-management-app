import { createUserWithEmailAndPassword } from "firebase/auth";

import { auth } from "../../../main";
import { isFirebaseError } from "../../../util/isFirebaseError";

export async function createFirebaseUser(email: string, password: string) {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
  } catch (err) {
    if (!isFirebaseError(err)) {
      throw new Error(
        "Connection error, check internet connection and try again.",
      );
    }

    const { code } = err;
    switch (code) {
      case "auth/email-already-in-use":
        throw new Error(
          "The email address is already in use by another account.",
        );
      case "auth/invalid-email":
        throw new Error("The email address format is not valid.");
      default:
        throw new Error(
          "Connection error, check internet connection and try again.",
        );
    }
  }
}
