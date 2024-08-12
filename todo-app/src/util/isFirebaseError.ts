/**
Checks if the given error object is a Firebase error.
Object must have a `code` and `message` property.
*/
export function isFirebaseError(
  err: unknown,
): err is { code: string; message: string } {
  if (
    typeof err === "object" &&
    err !== null &&
    "code" in err &&
    "message" in err
  )
    return true;

  return false;
}
