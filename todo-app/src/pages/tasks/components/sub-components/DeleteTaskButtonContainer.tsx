import { Trash } from "lucide-react";
import Button from "@/shared-components/Button";
import { useState } from "react";

export default function DeleteTaskButtonContainer({
  deletionMutation,
}: {
  deletionMutation: () => void;
}) {
  const [modalState, setModalState] = useState<boolean>(false);

  const handleModalConfirmation = () => {
    deletionMutation();
    setModalState(false);
  };

  const cancelModal = () => setModalState(false);
  const invisibilityClasses =
    "invisible select-none pointer-events-none opacity-0";

  return (
    <div className="relative flex-shrink-0">
      <Button
        variant="custom"
        className="rounded-xl bg-secondary-700 px-3 py-1 text-sm text-textContrast hover:bg-secondary-900"
        onClick={() => setModalState((prev) => !prev)}
        onKeyDown={(e) => e.key === "Escape" && setModalState(false)}
        tabIndex={0}
      >
        <Trash size={20} />
        <span>Delete task</span>
      </Button>

      <div
        className={`absolute left-1/2 top-[110%] -translate-x-1/2 rounded-xl bg-secondary-700 p-3 transition-opacity ${modalState ? "opacity-100" : invisibilityClasses}`}
      >
        <h4 className="mb-2 text-center text-lg text-textContrast">
          Are you sure?
        </h4>

        <div className="flex items-center gap-0.5">
          <Button
            variant="custom"
            className="px-3 py-1 text-sm text-textWeakContrast hover:text-textContrast"
            onClick={cancelModal}
          >
            Cancel
          </Button>

          <Button
            variant="custom"
            className="rounded-full bg-secondary-400 px-4 py-1 text-sm hover:bg-secondary-500"
            onClick={handleModalConfirmation}
          >
            Yes
          </Button>
        </div>
      </div>
    </div>
  );
}
