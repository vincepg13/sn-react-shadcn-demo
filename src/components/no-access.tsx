import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function NoAccess() {
  return (
    <div className="p-8">
      <Alert variant="destructive" className="items-center">
        <AlertCircle className="" />
        <AlertTitle className="text-lg">Error</AlertTitle>
        <AlertDescription>You do not have access to this resource.</AlertDescription>
      </Alert>
    </div>
  );
}
