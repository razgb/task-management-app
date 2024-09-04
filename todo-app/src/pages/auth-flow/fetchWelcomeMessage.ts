import { getStorage, ref, getDownloadURL } from "firebase/storage";

export async function fetchWelcomeMessage(): Promise<string> {
  const storage = getStorage();
  const imageRef = ref(
    storage,
    "gs://task-buddy-project.appspot.com/welcome_image.jpg",
  );

  let url: string;
  try {
    url = await getDownloadURL(imageRef);
  } catch (_) {
    throw new Error("Network error, check internet connection and try again.");
  }

  return url;
}
