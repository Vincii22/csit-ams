"use client";

import { Separator } from "@/components/ui/separator";
import { TabField, TabGrid, TabSection, TabWrapper } from "../components";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useSettingStore } from "../../store";
import AcademicForm from "./form";

function AutoSetSwitch() {
  const { setAutoSet, autoSet } = useSettingStore();

  return (
    <div className="flex gap-2">
      <Switch id="auto_set" checked={autoSet} onCheckedChange={setAutoSet} />
      <Label htmlFor="auto_set">Auto Set</Label>
    </div>
  );
}

export default function AcademicTab() {
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
        <div className="flex gap-2">S.Y. 2025 - 2026</div>
      </TabGrid>

      <TabGrid>
        <TabField
          label="Current academic year"
          desc="Set the current academic year"
        />
        <div className="flex gap-2">Second Semester</div>
      </TabGrid>

      <Separator />

      <TabSection
        title="Set Academic"
        desc="Update the active academic year and semester"
      />
      <Separator />

      <AcademicForm />
    </TabWrapper>
  );
}
