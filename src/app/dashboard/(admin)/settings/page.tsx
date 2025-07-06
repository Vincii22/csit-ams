import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GeneralTab from "./_tabs/general";
import AcademicTab from "./_tabs/academic";

export default function SettingsPage() {
  return (
    <div className=" w-full flex flex-col">
      <h1 className="font-bold text-3xl p-5">Settings</h1>
      <Separator />
      <Tabs defaultValue="general" className="pt-3">
        <TabsList className="px-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="academic">Academic</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="data">Data Control</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
        </TabsList>
        <Separator />
        <TabsContent value="general">
          <GeneralTab />
        </TabsContent>
        <TabsContent value="academic">
          <AcademicTab />
        </TabsContent>
        <TabsContent value="notifications"></TabsContent>
        <TabsContent value="idata"></TabsContent>
        <TabsContent value="maintenance"></TabsContent>
      </Tabs>
    </div>
  );
}
