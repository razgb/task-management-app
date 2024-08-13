import { updateProfile } from "firebase/auth";
import { auth } from "../../../../../main";

export async function updateFirebaseProfile(displayName: string) {
  if (!auth.currentUser) {
    throw new Error(
      "Connection error, check internet connection and try again.",
    );
  }

  try {
    await updateProfile(auth.currentUser, { displayName });
  } catch (error) {
    auth.currentUser.delete(); // delete acc if the profile update fails.

    throw new Error(
      "Connection error, check internet connection and try again.",
    );
  }
}
