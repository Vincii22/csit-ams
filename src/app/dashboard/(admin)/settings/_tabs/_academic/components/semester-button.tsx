import { useEffect, useState } from "react";
import { useSettingStore } from "../../../store";
import { updateSemester } from "../action";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

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
        className="w-[20rem]"
        disabled={autoSet}
        onClick={updateSem}
      >
        {loading ? (
          <>
            <span>Updating</span>
            <Loader2 className="animate-spin" />
          </>
        ) : (
          <>
            Switch to{" "}
            {currentSem != "SECOND_SEMESTER"
              ? "Second Semester"
              : "First Semester"}
          </>
        )}
      </Button>

      {error && !loading && (
        <p className="mt-2 text-destructive text-sm">{error.message}</p>
      )}
    </div>
  );
}

export default SemesterButton;
