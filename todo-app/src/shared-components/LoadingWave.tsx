import { useLoading } from "@/stores/loading/useLoading";
import useTheme from "@/stores/theme/useTheme";

export default function LoadingWave() {
  const { isLoading } = useLoading();

  const { theme } = useTheme();
  let containerStyles = "";

  switch (theme) {
    case "light":
      containerStyles += " h-1.5";

      if (isLoading) {
        containerStyles += " bg-secondary-300";
      } else {
        containerStyles += " bg-primaryBg";
      }
      break;
    case "dark":
      containerStyles += "bg-primaryBg h-1";
      break;
  }

  const waveStyles = isLoading ? "opacity-100" : "opacity-0";
  return (
    <div className={`overflow-hidden ${containerStyles} transition-all`}>
      <div
        className={`h-full w-[150%] ${waveStyles} animate-wave bg-loadingBar`}
      ></div>
    </div>
  );
}
