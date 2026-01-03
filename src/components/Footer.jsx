import React, { useEffect, useState } from "react";
import useInvoiceStore from "@/store/useInvoiceStore";
import { Github, HeartHandshake } from "lucide-react";

export function Footer() {
  const { design } = useInvoiceStore();
  const [stars, setStars] = useState(null);


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

  useEffect(() => {
    fetch("https://api.github.com/repos/mraxays/co-invoice")
      .then((res) => res.json())
      .then((data) => setStars(data.stargazers_count))
      .catch(() => setStars(null));
  }, []);

  return (
    <footer className="border-t border-border/50 bg-background/60 backdrop-blur px-6 py-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
        <div className="flex flex-wrap justify-center md:justify-start items-center gap-2">
          <span>© {new Date().getFullYear()}</span>
          <span className="font-medium" style={{ color: accentHex }}>
            <a href="/">Co-Invoice.</a>
          </span>
          <span> Open source invoice generator.</span>
        </div>

        <div className="flex items-center gap-5">
          <a
            href="https://github.com/mraxays/co-invoice"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5"
            style={{ color: accentHex }}
          >
            <Github size={16} />
            <span>GitHub</span>
            {stars !== null && (
              <span className="text-xs font-bold opacity-80">⭐ {stars}</span>
            )}
          </a>

          <a
            href="https://github.com/sponsors/mraxays"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5"
            style={{ color: accentHex }}
          >
            <HeartHandshake size={16} />
            Sponsor
          </a>
        </div>
      </div>
    </footer>
  );
}
