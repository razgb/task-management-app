import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

type FaqItem = {
  question: string;
  answer: string;
};

const faqItems: FaqItem[] = [
  {
    question: "How do I create a new task?",
    answer:
      "To create a new task, click on the 'New task' button in the main menu. Fill in the task details such as title, description, and due date, then click 'Create' to add the task to your list.",
  },
  {
    question: "Can I organize my tasks into categories?",
    answer:
      "Yes, you can organize your tasks into categories or projects. When creating or editing a task, you can assign it to a specific category. You can manage your categories in the Task Settings page.",
  },
  {
    question: "How do I change the app's theme?",
    answer:
      "You can change the app's theme in the main menu. Look for the 'Theme' section, where you can choose between light and dark modes, or customize colors to your preference.",
  },
  {
    question: "Is there a mobile version of the app?",
    answer:
      "We're currently working on a mobile version of the app. Stay tuned for updates on its release. In the meantime, you can access the web version on your mobile browser for a similar experience.",
  },
  {
    question: "How can I sync my tasks across devices?",
    answer:
      "Your tasks are automatically synced across all devices where you're logged into your account. Simply log in on another device, and your tasks will be up to date.",
  },
];

function Accordion({
  item,
  isOpen,
  toggleAccordion,
}: {
  item: FaqItem;
  isOpen: boolean;
  toggleAccordion: () => void;
}) {
  return (
    <div className="mb-4 overflow-hidden rounded-xl bg-secondaryBgWeak">
      <button
        className="flex w-full items-center justify-between p-4 text-left text-lg font-medium text-text focus:outline-none"
        onClick={toggleAccordion}
      >
        <span>{item.question}</span>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
      {isOpen && (
        <div className="p-4 pt-0 text-textWeak">
          <p>{item.answer}</p>
        </div>
      )}
    </div>
  );
}

export default function FaqSettings() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="h-full overflow-y-auto rounded-2xl bg-primaryBg p-6">
      <h2 className="mb-4 text-3xl font-bold text-heading">
        Frequently Asked Questions
      </h2>
      <p className="mb-8 text-lg text-textWeak">
        If you can't find the answer to your question here, please contact us at{" "}
        <a
          href="mailto:admin@admin.com"
          className="text-blue-500 hover:underline"
        >
          admin@admin.com
        </a>
      </p>
      <div className="space-y-4">
        {faqItems.map((item, index) => (
          <Accordion
            key={index}
            item={item}
            isOpen={openIndex === index}
            toggleAccordion={() => toggleAccordion(index)}
          />
        ))}
      </div>
    </div>
  );
}
