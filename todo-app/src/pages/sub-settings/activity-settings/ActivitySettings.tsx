import { activityItems } from "./dummyData";

import { AlertTriangle, Mail, Clock } from "lucide-react";
import useFontSize, {
  FontSizeMapType,
} from "../../../stores/accessibility/useFontSize";

export type ActivityTabType = {
  title: string;
  description: string;
  date: string;
  type: "warning" | "info" | "reminder";
};

const iconMap = {
  warning: AlertTriangle,
  info: Mail,
  reminder: Clock,
};

function ActivityTab({
  item,
  fontSizes,
}: {
  item: ActivityTabType;
  fontSizes: FontSizeMapType;
}) {
  const IconComponent = iconMap[item.type];

  return (
    <div className={`mb-4 rounded-xl bg-secondaryBgWeak p-4`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className={`mr-3`}>
            <IconComponent size={fontSizes["2xl"]} />
          </div>
          <div>
            <h3
              style={{ fontSize: `${fontSizes.xl}px` }}
              className={`text-lg font-medium`}
            >
              {item.title}
            </h3>
            <p style={{ fontSize: `${fontSizes.sm}px` }}>{item.description}</p>
          </div>
        </div>
        <span style={{ fontSize: `${fontSizes.sm}px` }}>{item.date}</span>
      </div>
    </div>
  );
}

export default function ActivitySettings() {
  const fontSizes = useFontSize();

  return (
    <div className="h-full overflow-y-auto rounded-2xl bg-primaryBg p-6 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-scrollbar">
      <h2 className="mb-8 text-3xl font-bold text-heading">Activity Log</h2>
      <div className="space-y-4">
        {activityItems.map((item, index) => (
          <ActivityTab key={index} fontSizes={fontSizes} item={item} />
        ))}
      </div>
    </div>
  );
}
