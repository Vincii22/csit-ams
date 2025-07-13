"use client";

import { updateAcademicYear } from "@/app/dashboard/(admin)/settings/_tabs/_academic/action";
import { getCurrentAcademicYear } from "@/app/dashboard/(admin)/settings/action";
import { useSettingStore } from "@/lib/state/setting.store";
import { getAcademicYears } from "@/lib/utils/get-academic-years";
import { useLayoutEffect } from "react";
import { useAuth } from "./use-auth";

function useAcademic() {
  const { setCurrentAY, setCurrentSem, setDates, autoSet } = useSettingStore();
  const { user } = useAuth();

  async function initAcademicData() {
    const { academicYear, semester, startDate, endDate } =
      await getCurrentAcademicYear();

    if (semester && academicYear) {
      setCurrentAY(academicYear);
      setCurrentSem(semester);
      setDates({ start: startDate as Date, end: endDate as Date });

      if (autoSet && (endDate as Date) <= new Date() && user?.role == "admin") {
        await updateAcademicYear({
          academic_year: getAcademicYears()[0],
        });

        await initAcademicData();
      }
    }
  }

  useLayoutEffect(() => {
    initAcademicData();
  }, []);
}

export default useAcademic;
