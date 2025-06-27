import { Loader2 } from "lucide-react";
import { Label } from "./label";

export default function Loader() {
  return (
    <Label className="icon-label text-base">
      <Loader2 className="animate-spin" size={18} strokeWidth={3} />
      Please wait
    </Label>
  );
}
