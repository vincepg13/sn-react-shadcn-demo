import { useState } from "react";
import { SnRecordPickerItem, SnRecordPicker, SnClippy, SnActivity, SnConditionBuilder } from "sn-shadcn-kit";
import { SnTabsDemo } from "./sn-tabs-demo";
import { useUser } from "@/context/user-context";
import { Separator } from "../ui/separator";

function getInstance() {
  return import.meta.env.MODE === "development" ? import.meta.env.VITE_DEV_URL : window.location.origin;
}

export function SnUiDemo() {
  const user = useUser();
  const [demoUser, setDemoUser] = useState<SnRecordPickerItem | null>(null);
  const [demoProblem, setDemoProblem] = useState<SnRecordPickerItem | null>(null);
  const [demoIncident, setDemoIncident] = useState<SnRecordPickerItem | null>(null);

  const pickerNode = (
    <div className="p-4 bg-muted rounded-xl flex flex-col gap-2">
      <span className="text-sm text-muted-foreground">
        If you need to select a record outside of a form context, you can use SnRecordPicker. For example, try selecting
        a user below:
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
  );

  const attachmentsNode = (
    <div className="p-4 bg-muted rounded-xl ">
      <div className="text-sm text-muted-foreground mb-2">
        SnClippy will allow you to view attachments for a given record. Select a problem record below to test out clippy{" "}
      </div>
      <div className="flex justify-center items-center gap-2">
        <SnRecordPicker
          table="problem"
          fields={["number", "short_description"]}
          query=""
          value={demoProblem}
          onChange={(record) => {
            return setDemoProblem(record as SnRecordPickerItem);
          }}
          placeholder="Select a problem record"
        />
        {demoProblem && <SnClippy instance={getInstance()} table="problem" guid={demoProblem.value} />}
      </div>
    </div>
  );

  const activityNode = (
    <div className="flex flex-col gap-4">
      {" "}
      <SnRecordPicker
        table="incident"
        fields={["number", "short_description"]}
        query="active-true^state!=7"
        value={demoProblem}
        onChange={(record) => {
          return setDemoIncident(record as SnRecordPickerItem);
        }}
        placeholder="Select an incident to view its activity"
      />
      {demoIncident && <Separator />}
      {demoIncident && (
        <SnActivity table="incident" guid={demoIncident.value} user={user.guid} fullWidth={true}></SnActivity>
      )}
    </div>
  );

  const conditionNode = (
    <SnConditionBuilder table="x_659318_react_demo" encodedQuery="bool=true^ORdecimal<5^ORtitleISNOTEMPTY^priority=low^NQsys_created_onONToday@javascript:gs.beginningOfToday()@javascript:gs.endOfToday()" />
  );

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">General ServiceNow UI Components</h2>
      <SnTabsDemo
        picker={pickerNode}
        attachments={attachmentsNode}
        activity={activityNode}
        conditions={conditionNode}
      />
    </div>
  );
}
