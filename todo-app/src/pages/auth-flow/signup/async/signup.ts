import { createFirebaseUser } from "./createFirebaseUser";

export async function signup({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    await createFirebaseUser(email, password);
  } catch (err) {
    if (err instanceof Error) {
      throw err;
    } else {
      throw new Error("Connection error, check connection and try again.");
    }
  }
}
