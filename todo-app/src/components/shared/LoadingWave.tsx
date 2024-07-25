import useTheme from "../../stores/useTheme";

export default function LoadingWave({ loading }: { loading: boolean }) {
  const { theme } = useTheme();
  let containerStyles = "";

  // might add more themes in the future.
  switch (theme) {
    case "light":
      containerStyles += " h-3";

      if (loading) {
        containerStyles += " bg-secondary-300";
      } else {
        containerStyles += " bg-primaryBg";
      }
      break;
    case "dark":
      containerStyles += "bg-primaryBg h-3";
      break;
  }

  const waveStyles = loading ? "opacity-100" : "opacity-0";
  return (
    <div className={`overflow-hidden ${containerStyles} transition-all`}>
      <div
        className={`h-full w-full ${waveStyles} animate-wave bg-gradient-to-r from-secondary-100 via-secondary-600 to-secondary-100`}
      ></div>
    </div>
  );
}
