import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useSettingStore } from "../../../../../../../lib/state/setting.store";

function AutoSetSwitch() {
  const { setAutoSet, autoSet } = useSettingStore();

  return (
    <div className="flex gap-2">
      <Switch id="auto_set" checked={autoSet} onCheckedChange={setAutoSet} />
      <Label htmlFor="auto_set">Auto Set</Label>
    </div>
  );
}

export default AutoSetSwitch;
