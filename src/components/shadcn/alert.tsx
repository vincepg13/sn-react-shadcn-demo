import { Terminal } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function AlertDemo() {
  return (
    <Alert>
      <Terminal className="h-4 w-4" />
      <AlertTitle>Prebuilt Shadcn Components</AlertTitle>
      <AlertDescription>
        If you would prefer to use components that are already built, shadcn/ui
        is the perfect framework for you. Each component is built with Radix UI
        and Tailwind CSS, so you can easily customize them to fit your needs.
        Everything on this page is built with shadcn components
      </AlertDescription>
    </Alert>
  );
}
