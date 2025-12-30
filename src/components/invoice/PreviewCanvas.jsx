import React from "react";
import { ModernTemplate } from "./templates/ModernTemplate";
import { ClassicTemplate } from "./templates/ClassicTemplate";
import { BoldTemplate } from "./templates/BoldTemplate";
import { MinimalTemplate } from "./templates/MinimalTemplate";
import useInvoiceStore from "@/store/useInvoiceStore";

export const PreviewCanvas = React.forwardRef((props, ref) => {
  const { design } = useInvoiceStore();
  const { template } = design;

  // Render the appropriate template based on selection
  const renderTemplate = () => {
    switch (template) {
      case "modern":
        return <ModernTemplate ref={ref} />;
      case "classic":
        return <ClassicTemplate ref={ref} />;
      case "bold":
        return <BoldTemplate ref={ref} />;
      case "minimal":
        return <MinimalTemplate ref={ref} />;
      default:
        return <ModernTemplate ref={ref} />;
    }
  };

  return (
    <div className="h-full w-full bg-muted/30 p-4 md:p-8 overflow-y-auto flex justify-center items-start print:p-0 print:overflow-visible print:bg-white print:w-auto print:h-auto print:block">
      {renderTemplate()}
    </div>
  );
});

PreviewCanvas.displayName = "PreviewCanvas";
