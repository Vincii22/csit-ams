"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GeneralTab from "./_tabs/general";
import AcademicTab from "./_tabs/_academic/tab";
import { useLayoutEffect } from "react";
import { useSettingStore } from "./store";
import { getCurrentAcademicYear } from "./action";

export default function SettingsPage() {
  const { setCurrentAY, setCurrentSem } = useSettingStore();

  useLayoutEffect(() => {
    getCurrentAcademicYear().then(({ academicYear, semester }) => {
      if (semester && academicYear) {
        setCurrentAY(academicYear);
        setCurrentSem(semester);
      }
    });
  }, []);

  return (
    <div className=" w-full flex flex-col">
      <h1 className="font-bold text-3xl p-5">Settings</h1>
      <Tabs defaultValue="general" className="pb-32">
        <TabsList className="px-4 py-3 sticky top-0 bg-background w-full border-y border-muted mb-3.5">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="academic">Academic</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="data">Data Control</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
        </TabsList>
        <TabsContent value="general">
          <GeneralTab />
        </TabsContent>
        <TabsContent value="academic">
          <AcademicTab />
        </TabsContent>
        <TabsContent value="notifications"></TabsContent>
        <TabsContent value="data"></TabsContent>
        <TabsContent value="maintenance"></TabsContent>
      </Tabs>
    </div>
  );
}
