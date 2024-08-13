import { createFirebaseUser } from "./createFirebaseUser";
import { updateFirebaseProfile } from "../../settings/sub-settings/account-settings/features/updateFirebaseProfile";
import { validateSignupDetails } from "./validateSignupDetails";

export async function signup(details: {
  name: string;
  email: string;
  password: string;
}) {
  const { name, email, password } = details;
  const { passed, message } = validateSignupDetails({
    name,
    email,
    password,
  });

  if (!passed) {
    throw new Error(message);
  }

  try {
    await createFirebaseUser(email, password);

    await updateFirebaseProfile(name);
  } catch (err) {
    if (err instanceof Error) {
      throw err;
    } else {
      throw new Error("Connection error, check connection and try again.");
    }
  }
}
