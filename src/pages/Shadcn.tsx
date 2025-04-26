import AlertDemo from "@/components/shadcn/alert";
import InputForm from "@/components/shadcn/form";
import NotifyCard from "@/components/shadcn/notify-card";
import ProjectCard from "@/components/shadcn/project-card";
import ShareDialog from "@/components/shadcn/dialog";
import DrawerDemo from "@/components/shadcn/drawer";
import SheetDemo from "@/components/shadcn/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function Shadcn() {
  return (
    <div className="flex flex-col gap-4">
      <AlertDemo></AlertDemo>

      <Tabs defaultValue="cards" className="w-full">
        <TabsList className="grid w-full grid-cols-3 max-w-[800px] mx-auto">
          <TabsTrigger value="cards">Cards</TabsTrigger>
          <TabsTrigger value="form">Form</TabsTrigger>
          <TabsTrigger value="dialogs">Dialogs</TabsTrigger>
        </TabsList>
        <TabsContent value="cards" className="flex justify-center max-w-[800px] mx-auto p-4">
          <div className="flex gap-4 flex-wrap">
            <NotifyCard></NotifyCard>
            <div>
              <ProjectCard></ProjectCard>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="form">
          <div className="flex justify-center max-w-[800px] mx-auto p-4">
            <InputForm></InputForm>
          </div>
        </TabsContent>
        <TabsContent value="dialogs">
          <div className="flex flex-col gap-4 max-w-[800px] mx-auto py-4">
            <Alert>
              <AlertDescription>
                Shadcn has many useful draw over type of components. These
                include dialogs, drawers and sheets. Press the buttons below to
                see an example of each
              </AlertDescription>
            </Alert>
            <div className="flex mx-auto gap-4">
              <DrawerDemo></DrawerDemo>
              <ShareDialog></ShareDialog>
              <SheetDemo></SheetDemo>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
