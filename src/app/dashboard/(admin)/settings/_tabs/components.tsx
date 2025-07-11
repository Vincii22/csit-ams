import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import React from "react";
import { map } from "zod";

export function TabWrapper({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-5 overflow-hidden">{children}</div>;
}

export function TabSection({
  title,
  desc,
  actions,
}: {
  title?: string;
  desc?: string;
  actions?: React.ReactNode[];
}) {
  return (
    <div className="flex px-5 justify-between items-center">
      <div>
        <h2 className="text-xl font-semibold mb-1">{title ?? "Test field"}</h2>
        <p className="text-muted-foreground">
          {desc ??
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim, voluptate?"}{" "}
        </p>
      </div>

      <div className="flex gap-8">{actions?.map((action) => action)}</div>
    </div>
  );
}

export function TabGrid({ children }: { children: React.ReactNode }) {
  return <div className="px-5 grid grid-cols-[40%_60%] pb-9">{children}</div>;
}

export function TabField({ label, desc }: { label?: string; desc?: string }) {
  return (
    <div>
      <h3 className="font-semibold mb-1">{label ?? "Test field"}</h3>
      <p className="text-muted-foreground max-w-md">
        {desc ??
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis iusto similique aperiam cum exercitationem."}
      </p>
    </div>
  );
}
