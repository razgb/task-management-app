import { Loader } from "lucide-react";

export default function Spinner({
  loading,
  color,
}: {
  loading: boolean;
  color: string;
}) {
  // to not calculate the spin when not needed.
  return (
    <div className={`${loading ? "animate-spin" : ""}`}>
      <Loader color={color} />
    </div>
  );
}
