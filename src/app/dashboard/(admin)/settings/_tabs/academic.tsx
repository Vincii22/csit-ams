"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { TabField, TabGrid, TabSection, TabWrapper } from "./components";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useSettingStore } from "../store";
import {
  DropdownMenu,
  DropdownMenuContent,
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
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger disabled={autoSet}>
              <Button
                variant={"outline"}
                disabled={autoSet}
                className="flex justify-between w-[20rem]"
              >
                <span>S.Y. 2025-2026</span>
                <ChevronDownIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <div className="flex">
                <Calendar
                  mode="single"
                  numberOfMonths={1}
                  // selected={date}
                  // onSelect={setDate}
                  className="rounded-tl-lg rounded-bl-lg border shadow-sm"
                />
                <Calendar
                  mode="single"
                  numberOfMonths={1}
                  defaultMonth={date}
                  // selected={date}
                  // onSelect={setDate}
                  className="rounded-tr-lg rounded-br-lg border shadow-sm"
                />
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </TabGrid>

      <TabGrid>
        <TabField
          label="Current academic semester"
          desc="Switch to the next semester"
        />
        <Input
          type="text"
          value={"First Semester"}
          className="max-w-xs mb-4"
          disabled
        />
      </TabGrid>
      <TabGrid>
        <TabField
          label="Archive current academic year"
          desc="All data from this academic year will be archived"
        />
        <Button type="button" size="sm" variant="destructive" className="w-fit">
          Archive now
        </Button>
      </TabGrid>

      <Separator />
      <TabSection
        title="Semester"
        desc="Mark the semester as complete or set its start and end date"
      />
      <Separator />

      <TabGrid>
        <TabField
          label="Start date"
          desc="Change the start date of the semester"
        />
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              id="date"
              className="max-w-xs justify-between font-normal"
            >
              {date ? date.toLocaleDateString() : "Select date"}
              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              captionLayout="dropdown"
              onSelect={(date) => {
                setDate(date);
                setOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>
      </TabGrid>
      <TabGrid>
        <TabField label="End date" desc="Change the end date of the semester" />
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              id="date"
              className="max-w-xs justify-between font-normal"
            >
              {date ? date.toLocaleDateString() : "Select date"}
              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              captionLayout="dropdown"
              onSelect={(date) => {
                setDate(date);
                setOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>
      </TabGrid>
      <TabGrid>
        <TabField
          label="Archive current academic year"
          desc="All data from this academic year will be archived"
        />
        <Button type="button" size="sm" variant="destructive" className="w-fit">
          Mark semester as completed
        </Button>
      </TabGrid>

      <Separator />
      <TabSection
        title="Officers"
        desc="Change officers for the academic year"
      />
      <Separator />

      <TabGrid>
        <TabField
          label="Reset officer positions"
          desc="Clear all officers and turn their role to students"
        />
        <Button type="button" size="sm" variant="destructive" className="w-fit">
          Reset officers
        </Button>
      </TabGrid>
    </TabWrapper>
  );
}
