import Button from "../components/shared/Button";

const inputContainerStyle = "flex flex-col gap-2 mb-4 w-full";
const labelStyles = "text-xl font-medium";
const inputStyles =
  "w-full hover:bg-secondaryBg rounded-xl text-lg bg-secondaryBgWeak p-3 outline-none placeholder:text-textPlaceholder focus:outline-focusOutline focus:outline-2 transition-colors";

export default function TaskCreator() {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("Form submitted");
  }

  return (
    <div className="h-full overflow-hidden rounded-2xl bg-primaryBg p-6">
      <h2 className="mb-8 text-3xl font-bold">Create new task</h2>

      <form onSubmit={handleSubmit} className="flex gap-16">
        <div className="flex w-full max-w-[1000px] flex-col gap-3">
          <div className={inputContainerStyle}>
            <label className={labelStyles} htmlFor="taskName">
              What's on your mind?
            </label>
            <input
              placeholder="e.g., Finish the presentation"
              type="text"
              id="taskName"
              className={inputStyles}
              required
            />
          </div>

          <div className={`${inputContainerStyle} w-1/3`}>
            <label className={labelStyles} htmlFor="dueDate">
              Due Date
            </label>
            <input
              type="date"
              id="dueDate"
              className={`${inputStyles} cursor-pointer`}
            />
          </div>

          <div className={inputContainerStyle}>
            <label className={labelStyles} htmlFor="priority">
              Priority Level
            </label>

            <select
              id="priority"
              required
              className={`${inputStyles} cursor-pointer`}
            >
              <option value="" disabled selected>
                Select priority
              </option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className={inputContainerStyle}>
            <label className={labelStyles} htmlFor="description">
              Description
            </label>

            <textarea
              placeholder="Add more details about your task..."
              id="description"
              className={`${inputStyles} h-48 resize-none overflow-y-hidden`}
            />
          </div>

          <div className="flex justify-end gap-4">
            <Button variant="text" textsize="xl">
              Cancel
            </Button>
            <Button textsize="xl" variant="default">
              Create
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
