import { Loader2 } from "lucide-react";

export default function Loader() {
  return (
    <p className="icon-label text-base">
      <Loader2 className="animate-spin" size={18} strokeWidth={3} />
      Please wait
    </p>
  );
}
