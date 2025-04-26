import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export function WelcomeCard({ user }: { user?: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>SN Shadcn Kit Demo</CardTitle>
        <CardDescription>Welcome to the ServiceNow + Shadcn + Tailwind demo application</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="mb-4">
          This application was built to demonstrate how easy it is to build a react application that can be installed on
          your ServiceNow instance whilst using all the latest features of React, Shadcn and Tailwind.
        </p>
        <p className="mb-4">
          It is also used to demonstrate all the reusable components built as part of the @sn-react/shadcn-kit package
          on npm.
        </p>

        {user && (
          <p className="italic">
            You are currently logged in as: <span className="font-semibold">{user}</span>
          </p>
        )}
      </CardContent>

      <CardFooter className="flex flex-col items-start gap-2">
        <p className="text-sm text-muted-foreground">Resources</p>
        <div className="flex gap-2 justify-between items-center flex-wrap w-full">
          <Button className="flex-1" variant="outline" asChild>
            <a target="_blank" href="https://ui.shadcn.com/">
              Shadcn
            </a>
          </Button>
          <Button className="flex-1" variant="outline" asChild>
            <a target="_blank" href="https://tailwindcss.com/">
              Tailwind
            </a>
          </Button>
          <Button className="flex-1" variant="outline" asChild>
            <a target="_blank" href="https://github.com/elinsoftware/servicenow-react-app">sn-react-app</a> 
          </Button>
          <Button className="flex-1" asChild>
          <a target="_blank" href="https://github.com/vincepg13/sn-react-shadcn">sn-shadcn-kit</a>
            </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
