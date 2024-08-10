import { createFirebaseUser } from "./createFirebaseUser";
import { updateFirebaseProfile } from "../../settings/sub-settings/account-settings/features/updateFirebaseProfile";
import { validateSignupDetails } from "./validateSignupDetails";

export async function signup(details: {
  name: string;
  email: string;
  password: string;
}) {
  const { name, email, password } = details;
  const { passed, errorMessages } = validateSignupDetails({
    name,
    email,
    password,
  });

  if (!passed) {
    // 1. activate app error state once created.

    // 2. use error messages as the message.

    console.error(errorMessages); // temp

    return;
  }

  await createFirebaseUser(email, password);

  await updateFirebaseProfile(name);

  console.log(`${name} \n${email} \n${password}`);
}
