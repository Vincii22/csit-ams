import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { TabField, TabGrid, TabSection, TabWrapper } from "./components";

export default function DataControlTab() {
  return (
    <TabWrapper>
      <TabSection />
      <Separator />
      <TabGrid>
        <TabField />
        <div className="grid">
          <Input
            type="text"
            placeholder="Idk what this is supposed to be"
            className="mb-4"
          />
          <Button size="sm" type="button" className="primary-btn w-fit">
            Save changes
          </Button>
        </div>
      </TabGrid>
    </TabWrapper>
  );
}
