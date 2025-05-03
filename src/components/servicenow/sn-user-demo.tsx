import { useState } from "react";
import { SnRecordPicker, SnRecordPickerItem, SnUserCard } from "sn-shadcn-kit";

export default function SnUserDemo() {
  const [selected, setSelected] = useState<SnRecordPickerItem[]>([]);
  console.log("Selected", selected);

  return (
    <div className="">
      {/* Move below to component */}
      <div className="max-w-[400px] flex flex-col gap-4">
        <SnRecordPicker
          table="sys_user"
          fields={["name", "email"]}
          metaFields={["title", "photo", "mobile_phone"]}
          query="active=true^nameISNOTEMPTY^emailISNOTEMPTY"
          value={selected}
          multiple={true}
          onChange={(record) => setSelected(record as SnRecordPickerItem[])}
          placeholder="Select user(s) to view their card(s)..."
        ></SnRecordPicker>
        {!!selected.length &&
          selected.map(
            (s) =>
              s?.meta && (
                <SnUserCard
                  key={s.value}
                  name={s.meta!.name.display_value}
                  im={`https://teams.microsoft.com/l/chat/0/0?users=${s.meta.email.value}`}
                  email={s.meta.email.value}
                  phone={s.meta.mobile_phone.value}
                  image={`/${s.meta.photo.display_value}`}
                  primaryInfo={s.meta.title.display_value}
                ></SnUserCard>
              )
          )}
      </div>
    </div>
  );
}
