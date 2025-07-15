import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useSettingStore } from "../../../../../../../lib/state/setting.store";
import { updateAutoSet } from "../../../action";

function AutoSetSwitch() {
  const { setAutoSet, autoSet } = useSettingStore();

  return (
    <div className="flex gap-2">
      <Switch
        id="auto_set"
        checked={autoSet}
        onCheckedChange={async (value) => {
          setAutoSet(value);
          const { error } = await updateAutoSet(value);

          if (error) {
            setAutoSet(!value);
          }
        }}
      />
      <Label htmlFor="auto_set">Auto Set</Label>
    </div>
  );
}

export default AutoSetSwitch;
