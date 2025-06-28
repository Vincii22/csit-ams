import Sidebar from "@/components/sidebar";

export function SidebarLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[15rem_1fr] min-h-svh overflow-hidden">
      <Sidebar />
      <main className="overflow-y-scroll">{children}</main>
    </div>
  );
}
