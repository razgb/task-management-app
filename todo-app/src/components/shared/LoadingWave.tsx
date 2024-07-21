import useTheme from "../../stores/useTheme";

export default function LoadingWave({ loading }: { loading: boolean }) {
  const { theme } = useTheme();

  const containerStyles =
    theme === "light" ? "bg-secondary-300 h-3" : "bg-primaryBg h-2";
  const waveStyles = loading ? "opacity-100" : "opacity-0";

  return (
    <div
      className={`overflow-hidden ${containerStyles} ${waveStyles} transition-colors`}
    >
      <div
        className={`h-full w-full animate-wave bg-gradient-to-r from-secondary-100 via-secondary-600 to-secondary-100`}
      ></div>
    </div>
  );
}
