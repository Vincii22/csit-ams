"use client";

import { updateAcademicYear } from "@/app/dashboard/(admin)/settings/_tabs/_academic/action";
import { getSettingsData } from "@/app/dashboard/(admin)/settings/action";
import { useSettingStore } from "@/lib/state/setting.store";
import { getAcademicYears } from "@/lib/utils/get-academic-years";
import { useLayoutEffect } from "react";
import { useAuth } from "./use-auth";

function useSettings() {
  const {
    setCurrentAY,
    setCurrentSem,
    setDates,
    autoSet: globalAutoSet,
    setAutoSet,
  } = useSettingStore();
  const { user } = useAuth();

  async function initSettings() {
    const { academicYear, semester, startDate, endDate, autoSet } =
      await getSettingsData();

    if (academicYear && semester) {
      setCurrentAY(academicYear);
      setCurrentSem(semester);
      setDates({ start: startDate as Date, end: endDate as Date });

      if (autoSet !== undefined) {
        setAutoSet(autoSet);
      }

      if (
        globalAutoSet &&
        (endDate as Date) <= new Date() &&
        user?.role == "admin"
      ) {
        await updateAcademicYear({
          academic_year: getAcademicYears()[0],
        });
        await initSettings();
      }
    }
  }

  useLayoutEffect(() => {
    initSettings();
  }, []);
}

export default useSettings;
