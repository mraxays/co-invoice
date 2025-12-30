import React from "react";
import useInvoiceStore from "@/store/useInvoiceStore";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

export function LineItems() {
  const { invoice, addLineItem, removeLineItem, updateLineItem } =
    useInvoiceStore();
  const { lineItems } = invoice;

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Line Items</Label>
        <div className="space-y-3">
          {lineItems.map((item, index) => (
            <div
              key={item.id}
              className="group relative grid grid-cols-12 gap-2 items-start p-3 border rounded-lg bg-background hover:bg-muted/20 transition-colors"
            >
              <div className="col-span-5 space-y-1">
                <Label className="text-xs text-muted-foreground">
                  Description
                </Label>
                <Input
                  value={item.description}
                  onChange={(e) =>
                    updateLineItem(item.id, "description", e.target.value)
                  }
                  placeholder="Item name"
                  className="h-8"
                />
              </div>
              <div className="col-span-2 space-y-1">
                <Label className="text-xs text-muted-foreground">Qty</Label>
                <Input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) =>
                    updateLineItem(item.id, "quantity", Number(e.target.value))
                  }
                  className="h-8 text-right"
                />
              </div>
              <div className="col-span-3 space-y-1">
                <Label className="text-xs text-muted-foreground">Rate</Label>
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  value={item.rate}
                  onChange={(e) =>
                    updateLineItem(item.id, "rate", Number(e.target.value))
                  }
                  className="h-8 text-right"
                />
              </div>
              <div className="col-span-2 flex items-end justify-end h-full pb-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-destructive"
                  onClick={() => removeLineItem(item.id)}
                  disabled={lineItems.length === 1}
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <Button
          variant="outline"
          size="sm"
          className="w-full mt-2 border-dashed"
          onClick={addLineItem}
        >
          <Plus size={14} className="mr-2" /> Add Item
        </Button>
      </div>
    </div>
  );
}
