import React from "react";
import { AlertTriangle, Mail, Clock, Trash } from "lucide-react";

type ActivityItem = {
  icon: React.ReactNode;
  title: string;
  description: string;
  date: string;
  type: "warning" | "info" | "success" | "danger";
};

const activityItems: ActivityItem[] = [
  {
    icon: <AlertTriangle size={24} />,
    title: "Unusual login detected",
    description: "A login was detected from a new device in New York, USA.",
    date: "2023-07-15 14:30",
    type: "warning",
  },
  {
    icon: <Mail size={24} />,
    title: "Email verification required",
    description: "Please verify your email address to ensure account security.",
    date: "2023-07-14 09:15",
    type: "info",
  },
  {
    icon: <Clock size={24} />,
    title: "Task deadline approaching",
    description: "The deadline for 'Project Presentation' is in 2 days.",
    date: "2023-07-13 18:45",
    type: "success",
  },
  {
    icon: <Clock size={24} />,
    title: "Task deadline approaching",
    description: "The deadline for 'Project Presentation' is in 2 days.",
    date: "2023-07-13 18:45",
    type: "success",
  },
  {
    icon: <Clock size={24} />,
    title: "Task deadline approaching",
    description: "The deadline for 'Project Presentation' is in 2 days.",
    date: "2023-07-13 18:45",
    type: "success",
  },
  {
    icon: <Clock size={24} />,
    title: "Task deadline approaching",
    description: "The deadline for 'Project Presentation' is in 2 days.",
    date: "2023-07-13 18:45",
    type: "success",
  },
  {
    icon: <Clock size={24} />,
    title: "Task deadline approaching",
    description: "The deadline for 'Project Presentation' is in 2 days.",
    date: "2023-07-13 18:45",
    type: "success",
  },
  {
    icon: <Clock size={24} />,
    title: "Task deadline approaching",
    description: "The deadline for 'Project Presentation' is in 2 days.",
    date: "2023-07-13 18:45",
    type: "success",
  },
  {
    icon: <Clock size={24} />,
    title: "Task deadline approaching",
    description: "The deadline for 'Project Presentation' is in 2 days.",
    date: "2023-07-13 18:45",
    type: "success",
  },
  {
    icon: <Trash size={24} />,
    title: "Tasks automatically archived",
    description: "5 completed tasks older than 30 days were archived.",
    date: "2023-07-12 11:20",
    type: "info",
  },
];

function ActivityTab({ item }: { item: ActivityItem }) {
  return (
    <div className={`mb-4 rounded-xl bg-secondaryBgWeak p-4`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className={`mr-3`}>{item.icon}</div>
          <div>
            <h3 className={`text-lg font-medium`}>{item.title}</h3>
            <p className={`text-sm`}>{item.description}</p>
          </div>
        </div>
        <span className={`text-sm`}>{item.date}</span>
      </div>
    </div>
  );
}

export default function ActivitySettings() {
  return (
    <div className="h-full overflow-y-auto rounded-2xl bg-primaryBg p-6 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-scrollbar">
      <h2 className="mb-8 text-3xl font-bold text-heading">Activity Log</h2>
      <div className="space-y-4">
        {activityItems.map((item, index) => (
          <ActivityTab key={index} item={item} />
        ))}
      </div>
    </div>
  );
}
