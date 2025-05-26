import { useState } from "react";
import { SnRecordPickerItem, SnTabs } from "sn-shadcn-kit";
import { SnRecordPicker } from "sn-shadcn-kit";
import { SnClippy } from "sn-shadcn-kit";

function getInstance() {
  return import.meta.env.MODE === "development"
    ? import.meta.env.VITE_DEV_URL
    : window.location.origin;
}

export function SnTabsDemo() {
  const instance = getInstance();
  const [demoUser, setDemoUser] = useState<SnRecordPickerItem | null>(null);
  const [demoProblem, setDemoProblem] = useState<SnRecordPickerItem | null>(
    null
  );

  const tabs = [
    {
      label: "Record Picker",
      content: (
        <div className="p-4 bg-muted rounded-xl flex flex-col gap-2">
          <span className="text-sm text-muted-foreground">
            If you need to select a record outside of a form context, you can
            use SnRecordPicker. For example, try selecting a user below:
          </span>
          <SnRecordPicker
            table="sys_user"
            fields={["name", "email"]}
            metaFields={["title", "photo", "mobile_phone"]}
            query="active=true^nameISNOTEMPTY^emailISNOTEMPTY"
            value={demoUser}
            onChange={(record) => setDemoUser(record as SnRecordPickerItem)}
            placeholder="Select a user"
          ></SnRecordPicker>
        </div>
      ),
    },
    {
      label: "Attachments",
      content: (
        <div className="p-4 bg-muted rounded-xl ">
          <div className="text-sm text-muted-foreground mb-2">
            SnClippy will allow you to view attachments for a given record.
            Select a problem record below to test out clippy{" "}
          </div>
          <div className="flex justify-center items-center gap-2">
            <SnRecordPicker
              table="problem"
              fields={["number", "short_description"]}
              query=""
              value={demoProblem}
              onChange={(record) => {
                console.log("PROB REC", record);
                return setDemoProblem(record as SnRecordPickerItem);
              }}
              placeholder="Select a problem record"
            />
            {demoProblem && (
              <SnClippy
                instance={instance}
                table="problem"
                guid={demoProblem.value}
              />
            )}
          </div>
        </div>
      ),
    },
  ];

  return <SnTabs tabs={tabs} />;
}
