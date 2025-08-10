"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { User } from "@/lib/types";
import { fetchStudents } from "@/lib/db/fetch-students";
import { Positions } from "@/lib/constants";

const addOfficerSchema = z.object({
  id: z.string(),
  email: z
    .string()
    .min(1)
    .regex(/^[0-9]+@dwc-legazpi\.edu$/, "Invalid school email address")
    .optional(),
  position: z.string(),
});

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];

export function AddOfficerForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [students, setStudents] = useState<User[]>([]);

  useEffect(() => {
    async function fetchData() {
      const students = await fetchStudents();
      setStudents(students);
    }

    fetchData();
  });

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const form = useForm<z.infer<typeof addOfficerSchema>>({
    resolver: zodResolver(addOfficerSchema),
    defaultValues: {
      id: "",
      email: "",
      position: "",
    },
  });

  async function onSubmit() {}

  return (
    <Form {...form}>
      <form
        className={cn("flex flex-col gap-5 p-3", className)}
        onSubmit={form.handleSubmit(onSubmit)}
        {...props}
      >
        <Popover open={open} onOpenChange={setOpen}>
          <div>
            <Label className="mb-2">Student</Label>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-[430px] text-sm text-muted-foreground justify-between"
              >
                {value
                  ? students.find((stu) => stu.value === value)?.name
                  : "Find a student"}
                <ChevronsUpDown className="opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[430px] p-0">
              <Command>
                <CommandInput
                  placeholder="Search for a student..."
                  className="h-9"
                />
                <CommandList>
                  <CommandEmpty>No student found.</CommandEmpty>
                  <CommandGroup>
                    {students.map((student) => (
                      <CommandItem
                        key={student.id}
                        value={student.id}
                        onSelect={(currentValue) => {
                          setValue(currentValue === value ? "" : currentValue);
                          setOpen(false);
                        }}
                      >
                        {student.name}
                        <Check
                          className={cn(
                            "ml-auto",
                            value === student.id ? "opacity-100" : "opacity-0",
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </div>

          <FormField
            control={form.control}
            name="position"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Position</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-[430px]">
                      <SelectValue placeholder="Select a position" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.entries(Positions).map(([key, label], i) => (
                      <SelectItem key={key} value={key}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </Popover>
      </form>
    </Form>
  );
}
