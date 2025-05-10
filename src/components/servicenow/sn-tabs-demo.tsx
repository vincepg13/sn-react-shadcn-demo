import { SnTabs } from "sn-shadcn-kit";

export function SnTabsDemo() {
  const tabs = [
    {
      label: "Details",
      content: <div className="p-4 bg-muted rounded-xl">Field group A here</div>,
    },
    {
      label: "Metadata",
      content: <div className="p-4 bg-muted rounded-xl">Field group B here</div>,
    },
    {
      label: "Audit",
      content: <div className="p-4 bg-muted rounded-xl">Field group C here</div>,
    },
  ];

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h2 className="text-xl font-semibold mb-4">SnTabs Demo</h2>
      <SnTabs tabs={tabs} />
    </div>
  );
}
