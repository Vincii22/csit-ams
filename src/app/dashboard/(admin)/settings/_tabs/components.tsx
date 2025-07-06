export function TabWrapper({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-5 overflow-hidden">{children}</div>;
}

export function TabSection({ title, desc }: { title?: string; desc?: string }) {
  return (
    <div className="px-5">
      <h2 className="text-xl font-semibold mb-1">{title ?? "Test field"}</h2>
      <p className="text-muted-foreground">
        {desc ??
          "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim, voluptate?"}{" "}
      </p>
    </div>
  );
}

export function TabGrid({ children }: { children: React.ReactNode }) {
  return <div className="px-5 grid grid-cols-[30%_70%] mb-8">{children}</div>;
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
