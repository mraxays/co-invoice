import React from "react";
import useInvoiceStore from "@/store/useInvoiceStore";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectLabel,
  SelectSeparator,
  SelectGroup,
} from "@/components/ui/select";

import { cn } from "@/lib/utils";
import { FONTS } from "@/lib/fontConfig";
// Use basic button for toggle if Switch not created, or create Switch.
// I installed @radix-ui/react-switch. I haven't created the component file yet.
// I'll use a simple button toggle for now to save a file, or create Switch inline?
// "Switch" is standard in Shadcn. I should create it first?
// Or just use a checkbox/button. I'll use a Button group for Light/Dark.

const COLORS = [
  { name: "Blue", value: "blue-600", hex: "#2563eb" },
  { name: "Emerald", value: "emerald-600", hex: "#059669" },
  { name: "Rose", value: "rose-600", hex: "#e11d48" },
  { name: "Amber", value: "amber-600", hex: "#d97706" },
  { name: "Slate", value: "slate-600", hex: "#475569" },
];

export function DesignControls() {
  const { design, setDesignProperty } = useInvoiceStore();

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Theme</Label>
        <div className="flex items-center gap-4 bg-background/50 p-2 rounded-lg border border-border/50">
          <div className="flex-1 text-sm text-muted-foreground">Dark Mode</div>
          <button
            onClick={() => setDesignProperty("darkMode", !design.darkMode)}
            className={cn(
              "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
              design.darkMode ? "bg-primary" : "bg-input"
            )}
          >
            <span
              className={cn(
                "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                design.darkMode ? "translate-x-6" : "translate-x-1"
              )}
            />
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Accent Color</Label>
        <div className="flex flex-wrap gap-2 items-center">
          {COLORS.map((color) => (
            <button
              key={color.value}
              onClick={() => setDesignProperty("accentColor", color.value)}
              className={cn(
                "w-8 h-8 rounded-sm border-2 transition-all",
                design.accentColor === color.value
                  ? "border-foreground scale-110"
                  : "border-transparent opacity-80 hover:opacity-100 hover:scale-105"
              )}
              style={{ backgroundColor: color.hex }}
              title={color.name}
            />
          ))}

          {/* Custom Color Picker */}
          <div className="relative">
            <input
              type="color"
              value={
                design.accentColor.startsWith("#")
                  ? design.accentColor
                  : "#2563eb"
              }
              onChange={(e) => setDesignProperty("accentColor", e.target.value)}
              className="w-8 h-8 rounded-sm border-gray-300 cursor-pointer"
              title="Custom Color"
            />
            <div className="absolute -bottom-5 left-0 text-[10px] text-gray-400 whitespace-nowrap">
              Custom
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Typography</Label>
        <Select
          value={design.fontStack}
          onValueChange={(v) => setDesignProperty("fontStack", v)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select font" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Serif Fonts</SelectLabel>
              {FONTS.serif.map((font) => (
                <SelectItem key={font.value} value={font.value}>
                  {font.name}
                </SelectItem>
              ))}
            </SelectGroup>
            <SelectSeparator />
            <SelectGroup>
              <SelectLabel>Sans Serif Fonts</SelectLabel>
              {FONTS.sans.map((font) => (
                <SelectItem key={font.value} value={font.value}>
                  {font.name}
                </SelectItem>
              ))}
            </SelectGroup>
            <SelectSeparator />
            <SelectGroup>
              <SelectLabel>Monospace Fonts</SelectLabel>
              {FONTS.mono.map((font) => (
                <SelectItem key={font.value} value={font.value}>
                  {font.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Template Style</Label>
        <Tabs
          value={design.template}
          onValueChange={(v) => setDesignProperty("template", v)}
        >
          <TabsList className="w-full grid grid-cols-4">
            <TabsTrigger value="modern">Modern</TabsTrigger>
            <TabsTrigger value="classic">Classic</TabsTrigger>
            <TabsTrigger value="bold">Bold</TabsTrigger>
            <TabsTrigger value="minimal">Minimal</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
}
