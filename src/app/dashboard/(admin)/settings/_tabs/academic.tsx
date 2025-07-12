"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { TabField, TabGrid, TabSection, TabWrapper } from "./components";
import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useSettingStore } from "../store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date>();

  const { autoSet } = useSettingStore();

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

      <TabGrid>
        <TabField
          label="Set Academic Year"
          desc="Set the current academic year"
        />
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger disabled={autoSet}>
              <Button
                variant={"outline"}
                disabled={autoSet}
                className="flex justify-between w-[20rem]"
              >
                <span>Select Academic Year</span>
                <ChevronDownIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[20rem]">
              <DropdownMenuItem>S.Y. 2025 - 2026</DropdownMenuItem>
              <DropdownMenuItem>S.Y. 2025 - 2026</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </TabGrid>

      <TabGrid>
        <TabField label="Set Semester" desc="Set the current academic year" />
        <div className="flex gap-2">
          <Button variant={"outline"} className="w-[20rem]" disabled={autoSet}>
            Switch to Second Sem
          </Button>
          {/* <DropdownMenu>
            <DropdownMenuTrigger disabled={autoSet}>
              <Button
                variant={"outline"}
                disabled={autoSet}
                className="flex justify-between w-[20rem]"
              >
                <span>Select Semester</span>
                <ChevronDownIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[20rem]">
              <DropdownMenuItem>First Semester</DropdownMenuItem>
              <DropdownMenuItem>Second Semester</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu> */}
        </div>
      </TabGrid>
    </TabWrapper>
  );
}
