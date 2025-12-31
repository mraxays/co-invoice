import React from "react";
import useInvoiceStore from "@/store/useInvoiceStore";
import { formatCurrency, calculateTotals } from "@/lib/utils";
import { getFontFamily, getFontClass } from "@/lib/fontConfig";

export const BoldTemplate = React.forwardRef((props, ref) => {
  const { invoice, design } = useInvoiceStore();
  const { sender, receiver, details, lineItems, footer } = invoice;
  const { accentColor, fontStack } = design;

  const { subtotal, taxAmount, total } = calculateTotals(
    lineItems,
    details.taxRate
  );

  const fontClass = getFontClass(fontStack);
  const fontFamily = getFontFamily(fontStack);

  const colorMap = {
    "blue-600": "#2563eb",
    "emerald-600": "#059669",
    "rose-600": "#e11d48",
    "amber-600": "#d97706",
    "slate-600": "#475569",
  };

  const accentHex = accentColor.startsWith("#")
    ? accentColor
    : colorMap[accentColor] || "#2563eb";

  return (
    <div
      ref={ref}
      className={`w-full max-w-[210mm] min-h-[297mm] bg-white text-black shadow-2xl shadow-black/5 rounded-sm transition-all duration-300 ${fontClass} print:shadow-none print:m-0 print:w-full print:max-w-none print:min-h-0`}
      style={{ fontFamily }}
    >
      {/* Header */}
      <div
        className="p-6 sm:p-12"
        style={{ backgroundColor: accentHex, color: "white" }}
      >
        <div className="flex justify-between items-end flex-wrap gap-6">
          <div>
            {sender.logo ? (
              <img
                src={sender.logo}
                alt="Logo"
                className="h-20 object-contain mb-4 brightness-0 invert"
              />
            ) : (
              <div className="text-4xl font-black uppercase tracking-tight mb-2">
                {sender.name || "Company"}
              </div>
            )}
            <div className="text-sm opacity-90 space-y-0.5">
              <p>{sender.address}</p>
              <p>
                {sender.email} • {sender.phone}
              </p>
            </div>
          </div>

          <div className="text-right">
            <h1 className="text-4xl font-black uppercase tracking-tight mb-2">
              Invoice
            </h1>
            <p className="text-2xl font-bold opacity-90">
              #{details.number}
            </p>
          </div>
        </div>
      </div>

      <div className="px-6 sm:px-8 py-6">
        {/* Date + Billing */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
          <div className="space-y-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                Date Issued
              </span>
              <p className="text-lg font-bold">{details.date}</p>
            </div>

            {details.dueDate && (
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  Payment Due
                </span>
                <p
                  className="text-lg font-bold"
                  style={{ color: accentHex }}
                >
                  {details.dueDate}
                </p>
              </div>
            )}
          </div>

          <div>
            <h3
              className="text-xs font-bold uppercase tracking-wider mb-3"
              style={{ color: accentHex }}
            >
              Billed To
            </h3>
            <p className="text-xl font-bold mb-1">{receiver.name}</p>
            <p className="text-sm text-gray-600 whitespace-pre-wrap">
              {receiver.address}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              {receiver.email}
            </p>
            <p className="text-sm text-gray-600">
              {receiver.phone}
            </p>
          </div>
        </div>

        {/* Mobile Scroll Hint */}
        <div className="text-xs text-gray-400 mb-2 sm:hidden">
          ← Swipe to view full table →
        </div>

        {/* Table (Mobile-safe) */}
        <div className="mb-8 overflow-x-auto -mx-6 sm:mx-0">
          <div className="min-w-[640px] sm:min-w-0">
            <table className="w-full">
              <thead>
                <tr style={{ backgroundColor: accentHex, color: "white" }}>
                  <th className="text-left py-4 px-4 font-black text-xs uppercase tracking-widest">
                    Item Description
                  </th>
                  <th className="text-center py-4 px-4 font-black text-xs uppercase tracking-widest w-20">
                    Qty
                  </th>
                  <th className="text-right py-4 px-4 font-black text-xs uppercase tracking-widest w-28">
                    Rate
                  </th>
                  <th className="text-right py-4 px-4 font-black text-xs uppercase tracking-widest w-32">
                    Amount
                  </th>
                </tr>
              </thead>

              <tbody>
                {lineItems.map((item, index) => (
                  <tr
                    key={item.id}
                    className={
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    }
                  >
                    <td className="py-4 px-4 font-semibold text-gray-800">
                      {item.description}
                    </td>
                    <td className="py-4 px-4 text-center font-bold text-gray-700">
                      {item.quantity}
                    </td>
                    <td className="py-4 px-4 text-right text-gray-700">
                      {formatCurrency(item.rate, details.currency)}
                    </td>
                    <td className="py-4 px-4 text-right font-bold text-gray-900">
                      {formatCurrency(
                        item.quantity * item.rate,
                        details.currency
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Totals */}
        <div className="flex justify-end mb-10">
          <div className="w-full sm:w-96">
            <div className="flex justify-between py-3 border-b-2 border-gray-200">
              <span className="text-sm font-bold uppercase tracking-wider text-gray-600">
                Subtotal
              </span>
              <span className="text-xl font-bold">
                {formatCurrency(subtotal, details.currency)}
              </span>
            </div>

            <div className="flex justify-between py-3 border-b-2 border-gray-200">
              <span className="text-sm font-bold uppercase tracking-wider text-gray-600">
                Tax
              </span>
              <span className="text-xl font-bold">
                {formatCurrency(taxAmount, details.currency)}
              </span>
            </div>

            <div
              className="flex justify-between py-5 mt-2"
              style={{ backgroundColor: accentHex, color: "white" }}
            >
              <span className="text-base font-black uppercase tracking-widest pl-4">
                Amount Due
              </span>
              <span className="text-2xl font-black pr-4">
                {formatCurrency(total, details.currency)}
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        {footer && (
          <div className="border-t-2 pt-6" style={{ borderColor: accentHex }}>
            <p className="text-sm text-gray-600 font-medium whitespace-pre-wrap">
              {footer}
            </p>
          </div>
        )}
      </div>
    </div>
  );
});

BoldTemplate.displayName = "BoldTemplate";
