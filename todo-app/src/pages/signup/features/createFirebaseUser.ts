import { createUserWithEmailAndPassword } from "firebase/auth";

import { auth } from "../../../main";

export async function createFirebaseUser(email: string, password: string) {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
  } catch (err) {
    if (
      !(
        typeof err === "object" &&
        err !== null &&
        "code" in err &&
        "message" in err
      )
    ) {
      throw new Error();
    }

    const { code, message } = err;

    switch (code) {
      case "auth/email-already-in-use":
        console.error(
          "The email address is already in use by another account.",
        );
        break;
      case "auth/invalid-email":
        console.error("The email address is not valid.");
        break;
      case "auth/operation-not-allowed":
        console.error("Email/password accounts are not enabled.");
        break;
      case "auth/weak-password":
        console.error("The password is too weak.");
        break;
      default:
        console.error("Error creating user:", message);
    }
  }
}
