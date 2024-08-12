import useAccessibility from "../../../stores/accessibility/useAccessibility";
import personImage from "../../../assets/welcome.svg";

export default function SignupWelcomeSection() {
  const { accessibility } = useAccessibility();
  const { increaseLetterSpacing, removeRoundEdges } = accessibility;

  return (
    <div
      style={{
        borderRadius: removeRoundEdges ? 0 : "",
        letterSpacing: increaseLetterSpacing ? "0.1rem" : "",
      }}
      className="col-start-1 col-end-2 row-start-1 row-end-3 flex flex-col items-center justify-center rounded-2xl bg-primaryBg p-4"
    >
      {/*<h2
        className="font-medium text-text"
        style={{
          fontSize: fontSizeMap["4xl"],
          color: highContrastMode ? accessibilityTextColor : "",
        }}
      >
        Welcome to task buddy!
      </h2>*/}

      <img className="max-h-64 max-w-64 self-center" src={personImage} alt="" />
    </div>
  );
}
