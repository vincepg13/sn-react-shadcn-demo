import { useState } from "react";
import { SnRecordPicker, SnRecordPickerItem } from "sn-shadcn-kit";

export default function ServicenowUI() {
  const [selected, setSelected] = useState<SnRecordPickerItem|null>(null);

  const pickerChange = (value: SnRecordPickerItem | null) => {
    if (value) {
      console.log("Selected value:", value);
    } else {
      console.log("No value selected");
    }
    setSelected(value);
  };

  return (
    <div>
      <SnRecordPicker
        table="sys_user"
        fields={["name", "email"]}
        query="active=true^nameSTARTSWITHVince"
        value={selected}
        onChange={pickerChange}
      ></SnRecordPicker>
    </div>
  );
}
