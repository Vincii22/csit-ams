import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { TabField, TabGrid, TabSection, TabWrapper } from "./components";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function AcademicTab() {
  return (
    <TabWrapper>
      <TabSection
        title="Year and Semester"
        desc="Change the active academic year or semester"
      />
      <Separator />
      <TabGrid>
        <TabField
          label="Current academic year"
          desc="Set the current academic year"
        />
        <div className="grid">
          <Input type="text" placeholder="A.Y 2024-2025" className="mb-4" />
          <Button size="sm" type="button" className="primary-btn w-fit">
            Save changes
          </Button>
        </div>
      </TabGrid>
      <TabGrid>
        <TabField
          label="Current academic semester"
          desc="Set the current academic semester"
        />
        <div className="grid">
          <Button
            type="button"
            size="sm"
            variant="destructive"
            className="w-fit"
          >
            Change to second semester
          </Button>
        </div>
      </TabGrid>
      <Separator />
      <TabSection
        title="Year and Semester"
        desc="Change the active academic year or semester"
      />
      <Separator />
    </TabWrapper>
  );
}
