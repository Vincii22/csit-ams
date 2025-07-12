"use client";

import { Separator } from "@/components/ui/separator";
import { TabField, TabGrid, TabSection, TabWrapper } from "../components";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useSettingStore } from "../../store";
import AcademicForm from "./components/form";
import { Button } from "@/components/ui/button";
import SemesterButton from "./components/semester-button";
import AutoSetSwitch from "./components/autoset-switch";

export default function AcademicTab() {
  const { currentAY, currentSem } = useSettingStore();

  return (
    <TabWrapper>
      <TabSection
        title="Academic Period"
        desc="Update the active academic year and semester"
        actions={[<AutoSetSwitch />]}
      />
      <Separator />

      <TabGrid>
        <TabField
          label="Current academic year"
          desc="Set the current academic year"
        />

        <Button className="w-[20rem]" variant={"outline"}>
          {currentAY ?? "No active academic year"}
        </Button>
      </TabGrid>

      <TabGrid>
        <TabField
          label="Current academic year"
          desc="Set the current academic year"
        />

        <Button className="w-[20rem]" variant={"outline"}>
          {currentSem ?? "No active semester"}
        </Button>
      </TabGrid>

      <Separator />

      <AcademicForm />

      <TabGrid>
        <TabField label="Set Semester" desc="Set the current academic year" />

        <SemesterButton />
      </TabGrid>
    </TabWrapper>
  );
}
