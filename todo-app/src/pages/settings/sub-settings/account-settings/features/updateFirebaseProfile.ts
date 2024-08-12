import { updateProfile } from "firebase/auth";
import { auth } from "../../../../../main";

export async function updateFirebaseProfile(displayName: string) {
  if (!auth.currentUser) {
    console.log("Edge case found: No user found in auth.currentUser."); // temp
    throw new Error(
      "Connection error, check internet connection and try again.",
    );
  }

  try {
    await updateProfile(auth.currentUser, { displayName });
  } catch (error) {
    auth.currentUser.delete(); // delete acc if the profile update fails.

    console.error(error); // temp
    console.log("Deleted user's account due to update profile failure."); // temp

    // error showing to user.
    throw new Error(
      "Connection error, check internet connection and try again.",
    );
  }
}
