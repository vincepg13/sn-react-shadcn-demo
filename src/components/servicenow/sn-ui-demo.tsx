import { useEffect, useMemo, useState } from "react";
import { SnRecordPickerItem, SnRecordPicker, SnClippy, SnActivity, SnFilter } from "sn-shadcn-kit";
import { SnTabsDemo } from "./sn-tabs-demo";
import { useUser } from "@/context/user-context";
import { Separator } from "../ui/separator";
import { useLocation } from "react-router-dom";

function getInstance() {
  return import.meta.env.MODE === "development" ? import.meta.env.VITE_DEV_URL : window.location.origin;
}

export function SnUiDemo() {
  const testTable = "problem";
  const testQuery = "";
  const user = useUser();
  const location = useLocation();
  const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const [demoUser, setDemoUser] = useState<SnRecordPickerItem | null>(null);
  const [demoProblem, setDemoProblem] = useState<SnRecordPickerItem | null>(null);
  const [demoIncident, setDemoIncident] = useState<SnRecordPickerItem | null>(null);

  const [table, setTable] = useState<SnRecordPickerItem | null>(null);
  const [query, setQuery] = useState(searchParams.get("query") || testQuery);

  useEffect(() => {
    const newQuery = searchParams.get("query") || testQuery;
    setQuery(newQuery);
  }, [searchParams, testTable]);

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
    <div className="flex flex-col gap-6">
      <SnRecordPicker
        table="sys_db_object"
        fields={["label", "name"]}
        metaFields={["name", "label"]}
        value={table}
        onChange={(record) => {
          return setTable(record as SnRecordPickerItem);
        }}
        placeholder="Select a table to view its condition builder"
      />
      {table && (
        <>
          <Separator />

          <SnFilter
            table={table.meta!.name.value}
            encodedQuery={query}
            initialOpenState="open"
            onQueryBuilt={(q) => {
              console.log("Q:", q);
            }}
          />
        </>
      )}
    </div>
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
