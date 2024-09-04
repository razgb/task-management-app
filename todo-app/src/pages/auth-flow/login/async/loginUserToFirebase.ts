import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../../main";
import { isFirebaseError } from "../../../../util/isFirebaseError";

export async function loginUserToFirebase({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<void> {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    if (!isFirebaseError(err)) {
      throw new Error(
        "Network error, check internet connection and try again.",
      );
    }

    switch (err.code) {
      case "auth/user-not-found":
        throw new Error("No user found with this email.");

      case "auth/wrong-password":
        throw new Error("Invalid password or no password set.");

      case "auth/internal-error":
        throw new Error("Internal server error, please try again.");

      case "auth/network-request-failed":
        throw new Error("Network request failed. Please try again.");

      case "auth/too-many-requests":
        throw new Error(
          "Login disabled - too many failed attempts. Try again later.",
        );
    }
  }
}
