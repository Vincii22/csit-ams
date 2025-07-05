"use client";

export default function OfficerView() {
  return (
    <div className="space-y-3 p-4">
      {Array.from({ length: 50 }, (_, i) => (
        <div
          key={i}
          className="bg-muted border border-border p-4 rounded-md shadow-sm"
        >
          <h2 className="font-semibold">Item {i + 1}</h2>
          <p className="text-muted-foreground">
            Test item to check if overflow behavior does not break layout
          </p>
        </div>
      ))}
    </div>
  );
}
