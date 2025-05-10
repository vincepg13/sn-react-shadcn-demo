import SnFormDemo from "@/components/servicenow/sn-form-demo";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

export default function ServicenowForm() {
  return (
    <>
      <Alert className="mb-4">
        <Terminal className="h-4 w-4" />
        <AlertTitle>ServiceNow Forms</AlertTitle>
        <AlertDescription>
          <span className="inline whitespace-normal">
            Below is a <span className="text-red-500 font-semibold">pre alpha version</span> of the ServiceNow form component. This is a work in progress and will be
            updated over time. It can run basic client scripts, UI policies, and inherits the form layout of the default
            view. in its current state it has the following limitations:
          </span>
          <ul className="list-disc pl-4 mb-2">
            <li>
              <b>Fields</b> - Not every field type is supported. Currently I have mapped what i consider the 10 most
              common field types: strings, choices, booleans, references, lists, dates, date times, integers, floats and
              decimals
            </li>
            <li>
              <b>UI Policies</b> - Only evaluates basic UI policies. Any policy using scripts will not be evaluated,
              neither will setting values from within the policy. Only the basic visible/readonly/mandatory options will
              work (and not ever condition will be perfectly mapped)
            </li>
            <li>
              <b>Client Scripts</b> onLoad and onChange currently supported however not every g_form method has been
              mapped. You can use common methods like getValue, setValue, setReadOnly, setDisplay, setVisible,
              setMandatory and clearValue
            </li>
            <li>
              <b>UI Actions</b> Server only UI actions are supported. Client side UI actions will not work.
            </li>
          </ul>
          <span>You can use "<em>table</em>" and "<em>guid</em>" query parameters to test with different tables</span>
        </AlertDescription>
      </Alert>
      <div className="max-w-5xl mx-auto p-8 bg-card rounded-lg inset-shadow-xs shadow-lg">
        <SnFormDemo />
      </div>
    </>
  );
}
