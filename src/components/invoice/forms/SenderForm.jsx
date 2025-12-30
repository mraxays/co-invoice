import React, { useRef } from "react";
import useInvoiceStore from "@/store/useInvoiceStore";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";

export function SenderForm() {
  const { invoice, updateSender } = useInvoiceStore();
  const { sender } = invoice;
  const fileInputRef = useRef(null);

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateSender("logo", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Company Logo</Label>
        <div className="flex items-center gap-4">
          {sender.logo && (
            <div className="relative w-16 h-16 border rounded-md overflow-hidden bg-white">
              <img
                src={sender.logo}
                alt="Logo"
                className="w-full h-full object-contain"
              />
              <button
                onClick={() => updateSender("logo", null)}
                className="absolute top-0 right-0 bg-red-500 text-white p-0.5 rounded-bl hover:bg-red-600"
              >
                <X size={12} />
              </button>
            </div>
          )}
          <Input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleLogoUpload}
          />
          <Button
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload size={14} className="mr-2" /> Upload Logo
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Company Name</Label>
        <Input
          value={sender.name}
          onChange={(e) => updateSender("name", e.target.value)}
          placeholder="Your Company"
        />
      </div>

      <div className="space-y-2">
        <Label>Address</Label>
        <textarea
          className="flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          value={sender.address}
          onChange={(e) => updateSender("address", e.target.value)}
          placeholder="123 Business St"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Email</Label>
          <Input
            value={sender.email}
            onChange={(e) => updateSender("email", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label>Phone</Label>
          <Input
            value={sender.phone}
            onChange={(e) => updateSender("phone", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
