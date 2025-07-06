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

export default function AcademicTab() {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date>();

  return (
    <TabWrapper>
      <TabSection
        title="Academic Period"
        desc="Update the active academic year and semester"
      />
      <Separator />

      <TabGrid>
        <TabField
          label="Current academic year"
          desc="Set the current academic year"
        />
        <div className="grid">
          <Input
            type="text"
            placeholder="A.Y 2024-2025"
            className="max-w-xs mb-4"
          />
          <Button size="sm" type="button" className="primary-btn w-fit">
            Save changes
          </Button>
        </div>
      </TabGrid>

      <TabGrid>
        <TabField
          label="Current academic semester"
          desc="Switch to the next semester"
        />
        <Button type="button" size="sm" variant="destructive" className="w-fit">
          Change to second semester
        </Button>
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
