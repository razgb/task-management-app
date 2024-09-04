import { createUserWithEmailAndPassword } from "firebase/auth";

import { auth } from "../../../../main";
import { isFirebaseError } from "../../../../util/isFirebaseError";

export async function createFirebaseUser(email: string, password: string) {
  try {
    return await createUserWithEmailAndPassword(auth, email, password);
  } catch (err) {
    if (!isFirebaseError(err)) {
      throw new Error(
        "Network error, check internet connection and try again.",
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

      case "auth/weak-password":
        throw new Error("Password must be minimum 6 characters.");

      case "auth/network-request-failed":
        throw new Error(
          "Network error, please check your connection and try again.",
        );

      case "auth/too-many-requests":
        throw new Error("Too many login attempts, please try again later.");

      default:
        throw new Error(
          "Connection error, check internet connection and try again.",
        );
    }
  }
}
