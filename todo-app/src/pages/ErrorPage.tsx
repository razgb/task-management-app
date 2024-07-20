import { AlertTriangle } from "lucide-react";
import Link from "../components/shared/Link";

export default function ErrorPage() {
  return (
    <div className="flex h-full flex-col items-center justify-center rounded-2xl bg-primaryBg p-6">
      <AlertTriangle size={64} className="mb-4 text-textWeak" />

      <h1 className="mb-2 text-4xl font-bold text-heading">
        404 - Page Not Found
      </h1>

      <p className="mb-6 text-xl text-textWeak">
        Oops! The page you're looking for doesn't exist.
      </p>

      <Link
        to="/dashboard"
        className="rounded-full bg-secondaryBgWeak px-6 py-2 text-lg font-medium text-text transition-colors duration-200 hover:bg-secondaryBg active:bg-secondaryBgStrong"
        role="button"
        aria-label="Back to Dashboard"
      >
        Back to Dashboard
      </Link>
    </div>
  );
}
