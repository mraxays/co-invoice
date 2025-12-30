import React, { useRef } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { EditorSidebar } from "@/components/invoice/EditorSidebar";
import { PreviewCanvas } from "@/components/invoice/PreviewCanvas";
import { PanelLeftClose, PanelLeftOpen, Printer } from "lucide-react";
import { useReactToPrint } from "react-to-print";
import useInvoiceStore from "@/store/useInvoiceStore";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
  const [isMobile, setIsMobile] = React.useState(false);
  const contentRef = useRef(null);

  const { design } = useInvoiceStore();

  const handlePrint = useReactToPrint({
    contentRef,
    documentTitle: "Invoice",
    onAfterPrint: () => console.log("Printed successfully"),
  });

  // Detect mobile
  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Sync Dark Mode
  React.useEffect(() => {
    const root = window.document.documentElement;
    if (design.darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [design.darkMode]);

  if (isMobile) {
    return (
      <div className="min-h-screen bg-background text-foreground font-sans">
        <Tabs
          defaultValue="edit"
          className="h-full flex flex-col fixed inset-0"
        >
          <TabsList className="grid w-full grid-cols-2 rounded-none p-0 h-14 border-b border-border bg-card z-50">
            <TabsTrigger
              value="edit"
              className="rounded-none h-full text-base data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary transition-all"
            >
              Editor
            </TabsTrigger>
            <TabsTrigger
              value="preview"
              className="rounded-none h-full text-base data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary transition-all"
            >
              Preview
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value="edit"
            className="flex-1 overflow-auto mt-0 bg-background pb-20"
          >
            <EditorSidebar mobileView />
          </TabsContent>
          <TabsContent
            value="preview"
            className="flex-1 overflow-auto mt-0 bg-muted/30 pb-10 relative"
          >
            <div className="absolute top-4 right-4 z-50">
              <Button size="sm" onClick={handlePrint} className="shadow-lg">
                <Printer size={16} className="mr-2" /> Save PDF
              </Button>
            </div>
            <PreviewCanvas ref={contentRef} />
          </TabsContent>
        </Tabs>
      </div>
    );
  }

  return (
    <div className="h-screen w-full bg-background text-foreground flex overflow-hidden font-sans transition-colors duration-300">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "w-[480px]" : "w-0"
        } transition-all duration-300 ease-out relative flex-shrink-0 z-20 shadow-2xl shadow-black/5 bg-background border-r border-border overflow-hidden`}
      >
        <div className="h-full w-[480px]">
          <EditorSidebar />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 h-full overflow-hidden relative z-10 flex flex-col bg-muted/20">
        {/* Toggle Button */}
        <div className="absolute top-6 left-6 z-50 flex gap-2">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full shadow-md bg-background/80 backdrop-blur-md hover:bg-background h-10 w-10 border-border/60"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? (
              <PanelLeftClose size={18} className="text-muted-foreground" />
            ) : (
              <PanelLeftOpen size={18} className="text-foreground" />
            )}
          </Button>
        </div>

        {/* Print Button */}
        <div className="absolute top-6 right-8 z-50">
          <Button
            onClick={handlePrint}
            className="shadow-lg bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6 transition-all hover:scale-105 active:scale-95"
          >
            <Printer size={18} className="mr-2" /> Download / Print
          </Button>
        </div>

        <PreviewCanvas ref={contentRef} />
      </main>
    </div>
  );
}

export default App;
