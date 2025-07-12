"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TabField, TabGrid, TabSection } from "../components";
import { Button } from "@/components/ui/button";
import { ChevronDownIcon, Loader2 } from "lucide-react";
import { useSettingStore } from "../../store";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import z from "zod";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateAcademicYear } from "./action";
import { getCurrentAcademicYear } from "../../action";
import { useState } from "react";

export const academicYearSchema = z.object({
  academic_year: z
    .string({ message: "Academic year is required." })
    .regex(/^S\.Y\.\s\d{4}\s-\s\d{4}$/, {
      message: "Academic year must be in format: S.Y. YYYY - YYYY",
    }),
});

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
  const { autoSet, setCurrentAY, setCurrentSem } = useSettingStore();
  const academic_years = getAcademicYears();

  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof academicYearSchema>>({
    resolver: zodResolver(academicYearSchema),
  });

  async function submitHandler(data: z.infer<typeof academicYearSchema>) {
    setLoading(true);
    const { error } = await updateAcademicYear(data);

    if (error) {
      form.setError("academic_year", {
        message: error.message,
      });
    } else {
      const { academicYear, semester } = await getCurrentAcademicYear();
      setCurrentAY(academicYear as string);
      setCurrentSem(semester as string);
    }
    setLoading(false);
  }

  return (
    <>
      <TabSection
        title="Update Academic Period"
        desc="Update the active academic year and semester"
      />
      <Separator />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(submitHandler)}>
          <TabGrid>
            <TabField
              label="Set Academic Year"
              desc="Select the academic period for this record."
            />
            <div className="flex flex-col gap-2 w-fit items-end">
              <FormField
                control={form.control}
                name="academic_year"
                render={({ field }) => (
                  <FormItem>
                    <div className="space-y-1">
                      <FormLabel>Academic Year</FormLabel>
                    </div>
                    <DropdownMenu>
                      <FormControl>
                        <DropdownMenuTrigger disabled={autoSet} asChild>
                          <Button
                            className="w-[20rem] flex justify-between"
                            variant="outline"
                          >
                            <span>{field.value || "Select Academic Year"}</span>
                            <ChevronDownIcon />
                          </Button>
                        </DropdownMenuTrigger>
                      </FormControl>
                      <DropdownMenuContent className="w-[20rem]">
                        {academic_years.map((ay, i) => (
                          <DropdownMenuItem
                            key={i}
                            onSelect={() => field.onChange(ay)}
                          >
                            {ay}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-fit" disabled={autoSet}>
                {loading ? (
                  <>
                    <span>Updating</span>
                    <Loader2 className="animate-spin" />
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </div>
          </TabGrid>
        </form>
      </Form>
    </>
  );
}

export default AcademicForm;
