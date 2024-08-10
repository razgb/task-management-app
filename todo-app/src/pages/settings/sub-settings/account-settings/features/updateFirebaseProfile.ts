import { updateProfile } from "firebase/auth";
import { auth } from "../../../../../main";

export async function updateFirebaseProfile(displayName: string) {
  if (!auth.currentUser) throw new Error("No current user");

  try {
    await updateProfile(auth.currentUser, {
      displayName: displayName,
    });
  } catch (_) {
    throw new Error("issue updating..."); // idk...
  }
}
