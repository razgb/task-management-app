import useAccessibility from "../../stores/accessibility/useAccessibility";
import { useQuery } from "react-query";
import { useState } from "react";
import { fetchWelcomeMessage } from "../../pages/auth-flow/fetchWelcomeMessage";
import useTheme from "../../stores/timer/useTheme";

export default function WelcomeSection() {
  const { accessibility } = useAccessibility();
  const { increaseLetterSpacing, removeRoundEdges } = accessibility;
  const { theme } = useTheme();
  const [url, setUrl] = useState<string | undefined>(undefined);

  const { isFetching, failureCount } = useQuery({
    queryKey: "welcome-section",
    queryFn: async () => {
      const URL = await fetchWelcomeMessage();
      setUrl(URL);
    },
    staleTime: Infinity,
    retry: 4,
    retryDelay: 500,
  });

  const invisible = "pointer-events-none select-none invisible opacity-0";
  const visible = "opacity-100";

  if (failureCount >= 5) return null;

  return (
    <div
      style={{
        borderRadius: removeRoundEdges ? 0 : "",
        letterSpacing: increaseLetterSpacing ? "0.1rem" : "",
      }}
      // prettier-ignore
      className={`${isFetching ? "animate-pulse" : ""}  col-start-1 col-end-2
      row-start-1 row-end-3 flex flex-col
      items-center justify-center rounded-2xl bg-primaryBg overflow-hidden
      transition-all duration-700
      ${theme === "dark" && !isFetching ? "absolute inset-0 bg-black opacity-70" : ""} z-10
      `}
    >
      <img
        // prettier-ignore
        className={`${isFetching ? invisible : visible} w-full h-full
          bg-cover duration-1000
          self-center transition-opacity`}
        src={url}
        alt=""
      />
    </div>
  );
}
