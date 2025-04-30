import { useState } from "react";
import { SnRecordPicker, SnRecordPickerItem, SnUserCard } from "sn-shadcn-kit";

export default function ServicenowUI() {
  const [selected, setSelected] = useState<SnRecordPickerItem | null>(null);
  console.log("Selected", selected);

  return (
    <div className="">
      {/* Move below to component */}
      <div className="max-w-[400px] flex flex-col gap-4">
        <SnRecordPicker
          table="sys_user"
          fields={["name", "email"]}
          metaFields={["title", "photo", "mobile_phone"]}
          query="active=true^nameSTARTSWITHVince"
          value={selected}
          onChange={setSelected}
          placeholder="Select a user to view their card..."
        ></SnRecordPicker>
        {selected?.meta && (
          <SnUserCard
            name={selected.meta!.name.display_value}
            im={`https://teams.microsoft.com/l/chat/0/0?users=${selected.meta.email.value}`}
            email={selected.meta.email.value}
            phone={selected.meta.mobile_phone.value}
            image={`/${selected.meta.photo.display_value}`}
            primaryInfo={selected.meta.title.display_value}
          ></SnUserCard>
        )}
      </div>
    </div>
  );
}
