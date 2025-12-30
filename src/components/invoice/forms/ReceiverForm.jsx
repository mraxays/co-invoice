import React from "react";
import useInvoiceStore from "@/store/useInvoiceStore";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ReceiverForm() {
  const { invoice, updateReceiver } = useInvoiceStore();
  const { receiver } = invoice;

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Client Name</Label>
        <Input
          value={receiver.name}
          onChange={(e) => updateReceiver("name", e.target.value)}
          placeholder="Client Company"
        />
      </div>

      <div className="space-y-2">
        <Label>Address</Label>
        <textarea
          className="flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          value={receiver.address}
          onChange={(e) => updateReceiver("address", e.target.value)}
          placeholder="456 Client Ave"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Email</Label>
          <Input
            value={receiver.email}
            onChange={(e) => updateReceiver("email", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label>Phone</Label>
          <Input
            value={receiver.phone}
            onChange={(e) => updateReceiver("phone", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
