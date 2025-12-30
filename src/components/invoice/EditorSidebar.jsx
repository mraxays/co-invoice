import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Separator } from "@/components/ui/separator";
import { SenderForm } from "./forms/SenderForm";
import { ReceiverForm } from "./forms/ReceiverForm";
import { DetailsForm } from "./forms/DetailsForm";
import { LineItems } from "./forms/LineItems";
import { DesignControls } from "./DesignControls";
import useInvoiceStore from "@/store/useInvoiceStore";
import { Label } from "@/components/ui/label";

export function EditorSidebar({ mobileView }) {
  const { invoice, updateFooter, design } = useInvoiceStore();

  // Map accent colors to hex
  const colorMap = {
    "blue-600": "#2563eb",
    "emerald-600": "#059669",
    "rose-600": "#e11d48",
    "amber-600": "#d97706",
    "slate-600": "#475569",
  };

  const accentHex = design.accentColor.startsWith("#")
    ? design.accentColor
    : colorMap[design.accentColor] || "#2563eb";

  return (
    <div
      className={`h-full flex flex-col ${
        mobileView ? "" : "border-r border-border bg-card/30 backdrop-blur-xl"
      }`}
    >
      <div className="p-6 pb-2">
        <h2
          className="text-2xl font-mono uppercase font-semibold"
          style={{ color: accentHex }}
        >
          <a href="/">Co-Invoice</a>
        </h2>
      </div>

      <Tabs
        defaultValue="content"
        className="flex-1 flex flex-col overflow-hidden"
      >
        <div className="px-6 pb-4">
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="design">Design</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent
          value="content"
          className="flex-1 overflow-y-auto px-6 pb-6 space-y-8 mt-0 custom-scrollbar"
        >
          {/* Section 1: From & To */}
          <div className="space-y-6">
            <div className="bg-background/50 p-4 rounded-lg border border-border/50">
              <h3 className="font-semibold mb-3 text-sm uppercase tracking-wider text-muted-foreground">
                From
              </h3>
              <SenderForm />
            </div>

            <div className="bg-background/50 p-4 rounded-lg border border-border/50">
              <h3 className="font-semibold mb-3 text-sm uppercase tracking-wider text-muted-foreground">
                To
              </h3>
              <ReceiverForm />
            </div>
          </div>
          <Separator />
          {/* Section 2: Details */}
          <div>
            <h3 className="font-semibold mb-3 text-sm uppercase tracking-wider text-muted-foreground">
              Invoice Details
            </h3>
            <DetailsForm />
          </div>
          <Separator />
          {/* Section 3: Line Items */}
          <div>
            <LineItems />
          </div>
          <Separator />
          {/* Section 4: Footer */}
          <div className="space-y-2">
            <Label>Footer Note</Label>
            <textarea
              className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              value={invoice.footer}
              onChange={(e) => updateFooter(e.target.value)}
              placeholder="Thank you message..."
            />
          </div>
          <div className="h-20"></div> {/* Spacer */}
        </TabsContent>

        <TabsContent
          value="design"
          className="flex-1 overflow-y-auto px-6 pb-6 mt-0"
        >
          <DesignControls />
        </TabsContent>
      </Tabs>
    </div>
  );
}
