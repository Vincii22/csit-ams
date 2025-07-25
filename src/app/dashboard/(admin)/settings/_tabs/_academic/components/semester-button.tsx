import { useEffect, useState } from "react";
import { useSettingStore } from "../../../../../../../lib/state/setting.store";
import { updateSemester } from "../action";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import Loader from "@/components/ui/loader";

function SemesterButton() {
  const { autoSet, currentSem, setCurrentSem } = useSettingStore();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error>();

  async function updateSem() {
    setLoading(true);
    const { error, current_semester } = await updateSemester({
      semester:
        currentSem == "FIRST_SEMESTER" ? "SECOND_SEMESTER" : "FIRST_SEMESTER",
    });

    if (error) {
      setError(error);
    } else {
      setCurrentSem(current_semester!);
      setError(undefined);
    }

    setLoading(false);
  }

  useEffect(() => {
    setError(undefined);
  }, [currentSem, setCurrentSem]);

  return (
    <div>
      <Button
        variant={error && !loading ? "destructive" : "outline"}
        size="sm"
        className="w-[20rem]"
        disabled={autoSet || currentSem == "SECOND_SEMESTER" || !currentSem}
        onClick={updateSem}
      >
        {loading ? <Loader /> : <>Switch to Second Semester</>}
      </Button>

      {error && !loading && (
        <p className="mt-2 text-destructive text-sm">{error.message}</p>
      )}
    </div>
  );
}

export default SemesterButton;
