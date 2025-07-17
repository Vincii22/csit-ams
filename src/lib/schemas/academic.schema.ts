import { z } from "zod";

export const academicYearSchema = z.object({
  startAyDate: z
    .date({
      required_error: "Start date is required",
    })
    .nullable(),
  endAyDate: z
    .date({
      required_error: "End date is required",
    })
    .refine(
      (date, ctx) => {
        const startDate = ctx.parent.startAyDate;
        return !startDate || date > startDate;
      },
      {
        message: "End date must be after start date",
        path: ["endAyDate"],
      },
    )
    .nullable(),
});
