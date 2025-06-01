import { ReactNode} from "react";
import { SnTabs } from "sn-shadcn-kit";

export function SnTabsDemo({
  picker,
  attachments,
  activity,
}: {
  picker: ReactNode;
  attachments: ReactNode;
  activity: ReactNode;
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
  ];

  return <SnTabs tabs={tabs} />;
}
