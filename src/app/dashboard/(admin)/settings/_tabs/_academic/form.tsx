"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TabField, TabGrid } from "../components";
import { Button } from "@/components/ui/button";
import { ChevronDownIcon } from "lucide-react";
import { useSettingStore } from "../../store";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";

function getAcademicYears(): string[] {
  let current_year: number = new Date().getFullYear();
  const academic_years: string[] = [];

  for (let i = 0; i < 5; i++) {
    academic_years.push(`S.Y. ${current_year} - ${current_year + 1}`);
    current_year += 1;
  }

  return academic_years;
}

function AcademicForm() {
  const { autoSet } = useSettingStore();
  const academic_years = getAcademicYears();
  const form = useForm();

  return (
    <Form {...form}>
      <form>
        <TabGrid>
          <TabField
            label="Set Academic Year"
            desc="Set the current academic year"
          />
          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger disabled={autoSet} asChild>
                <Button
                  className="w-[20rem] flex justify-between"
                  variant={"outline"}
                >
                  <span>Select Academic Year</span>
                  <ChevronDownIcon />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[20rem]">
                {academic_years.map((ay, i) => (
                  <DropdownMenuItem key={i}>{ay}</DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </TabGrid>

        <TabGrid>
          <TabField label="Set Semester" desc="Set the current academic year" />
          <div className="flex gap-2">
            <Button
              variant={"outline"}
              className="w-[20rem]"
              disabled={autoSet}
            >
              Switch to Second Sem
            </Button>
          </div>
        </TabGrid>
      </form>
    </Form>
  );
}

export default AcademicForm;
