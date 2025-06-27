import { ReactNode} from "react";
import { SnTabs } from "sn-shadcn-kit";

export function SnTabsDemo({
  picker,
  attachments,
  activity,
  conditions
}: {
  picker: ReactNode;
  attachments: ReactNode;
  activity: ReactNode;
  conditions: ReactNode;
}) {
  const tabs = [
    {
      label: "Record Picker",
      content: picker,
    },
    {
      label: "Attachments",
      content: attachments,
    },
    {
      label: "Activity Stream",
      content: activity
    },
    {
      label: "Condition Builder",
      content: conditions,
    },
  ];

  return <SnTabs tabs={tabs} />;
}
