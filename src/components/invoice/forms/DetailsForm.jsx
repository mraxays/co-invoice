import React from "react";
import useInvoiceStore from "@/store/useInvoiceStore";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function DetailsForm() {
  const { invoice, updateDetails } = useInvoiceStore();
  const { details } = invoice;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Invoice #</Label>
          <Input
            value={details.number}
            onChange={(e) => updateDetails("number", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label>Currency</Label>
          <Input
            value={details.currency}
            onChange={(e) => updateDetails("currency", e.target.value)}
            placeholder="$"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Date</Label>
          <Input
            type="date"
            value={details.date}
            onChange={(e) => updateDetails("date", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label>Due Date</Label>
          <Input
            type="date"
            value={details.dueDate}
            onChange={(e) => updateDetails("dueDate", e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Tax Rate (%)</Label>
        <Input
          type="number"
          min="0"
          max="100"
          step="0.01"
          value={details.taxRate || 0}
          onChange={(e) => updateDetails("taxRate", Number(e.target.value))}
          placeholder="0"
        />
      </div>
    </div>
  );
}
