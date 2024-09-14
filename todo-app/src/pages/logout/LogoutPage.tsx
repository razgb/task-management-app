import useAccessibility from "@/stores/accessibility/useAccessibility";
import useModal from "@/stores/modal/useModal";
import useRouter from "@/stores/router/useRouter";
import { signOut } from "firebase/auth";
import { auth } from "@/main";
import { useMutation } from "react-query";
import Button from "@/shared-components/Button";
import useTheme from "@/stores/theme/useTheme";

export default function LogoutPage() {
  const { accessibility } = useAccessibility();
  const {
    highContrastMode,
    removeRoundEdges,
    fontSizeMap,
    increaseLetterSpacing,
    accessibilityTextColor,
    reduceAnimations,
  } = accessibility;

  const { updatePath } = useRouter();
  const { openModal } = useModal();
  const { theme } = useTheme();

  const { isLoading, mutateAsync } = useMutation({
    mutationFn: async () => {
      try {
        await signOut(auth);
        updatePath("/login");
      } catch {
        throw new Error(
          "Error logging out, check internet connection and try again.",
        );
      }
    },
    onError: (err) => {
      if (err instanceof Error) {
        updatePath("/dashboard"); // not bothered to create another error modal.
        openModal("error", err.message);
        return;
      }

      openModal(
        "error",
        `Error logging out, check internet connection and try again.`,
      );
    },
    retryDelay: 500,
    retry: 2,
  });

  async function handleSignUserOut(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await mutateAsync();
  }

  return (
    <div
      className={`${theme} flex min-h-dvh items-center justify-center bg-primaryBg`}
      style={{
        borderRadius: removeRoundEdges ? "0" : "",
        transition: reduceAnimations ? "none" : undefined,
      }}
    >
      <div
        className="rounded-3xl bg-secondary-400 p-3"
        style={{
          borderRadius: removeRoundEdges ? "0" : "",
          transition: reduceAnimations ? "none" : undefined,
        }}
      >
        <form
          onSubmit={handleSignUserOut}
          className="flex flex-col items-center justify-center rounded-2xl bg-primaryBg p-8"
          style={{
            borderRadius: removeRoundEdges ? "0" : "",
            transition: reduceAnimations ? "none" : undefined,
          }}
        >
          <h1
            className="mb-4 text-3xl font-bold text-text"
            style={{
              fontSize: fontSizeMap["3xl"],
              letterSpacing: increaseLetterSpacing ? "0.1em" : undefined,
              color: highContrastMode ? accessibilityTextColor : "",
            }}
          >
            Logout
          </h1>
          <p
            className="mb-6 text-text"
            style={{
              color: highContrastMode ? accessibilityTextColor : "",
              fontSize: fontSizeMap["base"],
              letterSpacing: increaseLetterSpacing ? "0.1em" : undefined,
            }}
          >
            Are you sure you want to log out?
          </p>

          <div className="flex items-center">
            <button
              onClick={() => updatePath("/dashboard")}
              className="px-6 py-2 text-textWeak hover:text-text"
              type="button"
              style={{
                color: highContrastMode ? accessibilityTextColor : "",
                fontSize: fontSizeMap["base"],
                letterSpacing: increaseLetterSpacing ? "0.1em" : undefined,
              }}
            >
              Cancel
            </button>

            <Button loading={isLoading}>Proceed</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
