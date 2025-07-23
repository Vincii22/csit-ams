"use client";

import { Button } from "@/components/ui/button";
import { usePopup } from "@/shared/contexts/popup-context";
import { Plus, X } from "lucide-react";

export default function RolePage() {
  const { openPopup } = usePopup();

  return (
    <div className="p-5">
      <div className="grid grid-cols-2 mb-4 items-center">
        <h1 className="font-bold text-2xl">Manage Roles</h1>
        <Button size="sm" className="primary-btn w-fit justify-self-end">
          <Plus className="size-4" />
          Add user
        </Button>
      </div>
      <div className="border border-border rounded-lg">
        <div
          className="grid text-start font-bold uppercase py-2 px-4 border-b border-border bg-muted/25"
          style={{ gridTemplateColumns: "1fr 400px 400px" }}
        >
          <h4>User</h4>
          <h4>Position</h4>
          <div>{/*Actions*/}</div>
        </div>
        <div>
          <div
            className="grid text-start items-center py-3 px-4 border-b border-border"
            style={{ gridTemplateColumns: "1fr 400px 400px" }}
          >
            <div>
              <h4 className="font-bold">Caenar Arteta</h4>
              <p className="text-muted-foreground">07310316@dwc-legazpi.edu</p>
            </div>
            <h4>External Vice President</h4>
            <button className="flex gap-2 items-center text-muted-foreground hover:text-red-400 transition-all cursor-pointer w-fit justify-self-end bg-muted/20 py-1 px-3 rounded-lg border border-border">
              Remove user
            </button>
          </div>
        </div>
        <div className="py-2 px-4 bg-muted/5">1 user</div>
      </div>
    </div>
  );
}
