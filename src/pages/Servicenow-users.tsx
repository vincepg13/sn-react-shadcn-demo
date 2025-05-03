import SnGroupDemo from "@/components/servicenow/sn-group-demo";
import SnUserDemo from "@/components/servicenow/sn-user-demo";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

export default function ServicenowUsers() {
  return (
    <div className="flex flex-col gap-4">
      <Alert className="mb-4">
        <Terminal className="h-4 w-4" />
        <AlertTitle>ServiceNow Users & Groups</AlertTitle>
        <AlertDescription>
          <span className="inline whitespace-normal">
            Below are some examples of how to interact with user data in ServiceNow. This makes use of the following
            componenents from sn-shadcn-kit:
          </span>
          <ul className="list-disc pl-4">
            <li>
              <b>SnRecordPicker</b> - used to select the users or the group.
            </li>
            <li>
              <b>SnUserCard</b> - used to display the user card.
            </li>
            <li>
              <b>SnGroupWrapper</b> - used to display the group card. This is a wrapper for SnGroupCard which loads all
              the group data and feeds it into this component
            </li>
            <li>
              <b>SnAvatar</b> - used to display a users image or fall back to their initials
            </li>
            <li>
              <b>SnSimplePagination</b> - used to paginate the group members when the set page size is exceeded
            </li>
          </ul>
        </AlertDescription>
      </Alert>
      <div className="flex gap-4 flex-wrap mx-auto">
        <div className="w-[400px] ">
          <SnUserDemo></SnUserDemo>
        </div>
        <div className="w-[400px]">
          <SnGroupDemo></SnGroupDemo>
        </div>
      </div>
    </div>
  );
}
