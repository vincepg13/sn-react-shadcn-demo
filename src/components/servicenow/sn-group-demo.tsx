import { useState } from "react";
import { SnRecordPicker, SnRecordPickerItem, SnGroupWrapper, SnRow } from "sn-shadcn-kit";

function getImLink(member: SnRow, key: string) {
  // console.log("GETTING IM LINK", member);
  const email = member?.[key]?.value;
  return email ? `https://teams.microsoft.com/l/chat/0/0?users=${email}` : '';
}

export default function SnGroupDemo() {
  const [selected, setSelected] = useState<SnRecordPickerItem | null>(null);
  console.log("Selected Group", selected);

  return (
    <div className="">
      {/* Move below to component */}
      <div className="max-w-[400px] flex flex-col gap-4">
        <SnRecordPicker
          table="sys_user_group"
          fields={["name", "description"]}
          query="active=true^u_display_nameISNOTEMPTY"
          value={selected}
          onChange={(record) => setSelected(record as SnRecordPickerItem | null)}
          placeholder="Select a group to view its members..."
        ></SnRecordPicker>
        {selected?.meta && (
          <div>
            <SnGroupWrapper guid={selected.value} pageSize={5} getImLink={getImLink}></SnGroupWrapper>
          </div>
        )}
      </div>
    </div>
  );
}
