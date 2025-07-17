"use client";

import { Separator } from "@/components/ui/separator";
import { TabField, TabGrid, TabSection, TabWrapper } from "../components";
import { useSettingStore } from "@/lib/state/setting.store";
import AcademicForm from "./components/form";
import SemesterButton from "./components/semester-button";
import AutoSetSwitch from "./components/autoset-switch";

export default function AcademicTab() {
  const { currentAY, currentSem } = useSettingStore();

  return (
    <TabWrapper>
      <TabSection
        title="Current Settings"
        desc="These are current academic period settings for quick preview"
        actions={[<AutoSetSwitch />]}
      />

      <div className="px-5 grid grid-cols-2 gap-4">
        <div className="border rounded-md p-4 bg-muted/20">
          <h2 className="font-semibold mb-1">Current Academic Year</h2>
          <p className="text-muted-foreground max-w-md">
            {currentAY ?? "No academic year set"}{" "}
          </p>
        </div>

        <div className="border rounded-md p-4 bg-muted/20">
          <h2 className="font-semibold mb-1">Current Semester</h2>
          <p className="text-muted-foreground max-w-md">
            {currentSem ?? "No semester set"}{" "}
          </p>
        </div>
      </div>

      <Separator />

      <TabSection
        title="Academic Period"
        desc="Update or set the active academic year and semester"
      />

      <Separator />

      <AcademicForm />

      <TabGrid>
        <TabField label="Set Semester" desc="Set the current academic year" />
        <SemesterButton />
      </TabGrid>
    </TabWrapper>
  );
}
