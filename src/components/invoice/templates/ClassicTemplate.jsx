import React from "react";
import useInvoiceStore from "@/store/useInvoiceStore";
import { formatCurrency, calculateTotals } from "@/lib/utils";
import { getFontFamily, getFontClass } from "@/lib/fontConfig";

export const ClassicTemplate = React.forwardRef((props, ref) => {
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
      className={`w-full max-w-[210mm] min-h-[297mm] bg-white text-black shadow-2xl shadow-black/5 p-6 sm:p-8 transition-all duration-300 ${fontClass} print:shadow-none print:m-0 print:w-full print:max-w-none print:min-h-0`}
      style={{ fontFamily }}
    >
      {/* Header */}
      <div
        className="flex flex-col sm:flex-row justify-between items-start gap-6 mb-8 pb-6 border-b-2"
        style={{ borderColor: accentHex }}
      >
        <div>
          {sender.logo ? (
            <img
              src={sender.logo}
              alt="Logo"
              className="h-14 object-contain mb-2"
            />
          ) : (
            <div
              className="text-2xl font-bold mb-1"
              style={{ color: accentHex }}
            >
              {sender.name || "Company"}
            </div>
          )}
          <div className="text-xs text-gray-600 space-y-0.5">
            <p>{sender.email}</p>
            <p>{sender.phone}</p>
          </div>
        </div>

        <div className="text-left sm:text-right">
          <h1 className="text-4xl font-bold mb-2" style={{ color: accentHex }}>
            INVOICE
          </h1>
          <p className="text-sm text-gray-600">#{details.number}</p>
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mb-8">
        <div>
          <h3
            className="text-xs font-bold uppercase mb-2"
            style={{ color: accentHex }}
          >
            Bill To
          </h3>
          <p className="font-semibold text-gray-900">{receiver.name}</p>
          <p className="text-sm text-gray-600 whitespace-pre-wrap mt-1">
            {receiver.address}
          </p>
          <p className="text-sm text-gray-600">{receiver.email}</p>
        </div>

        <div>
          <h3
            className="text-xs font-bold uppercase mb-2"
            style={{ color: accentHex }}
          >
            Invoice Details
          </h3>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Date:</span>
              <span className="font-medium text-gray-900">
                {details.date}
              </span>
            </div>
            {details.dueDate && (
              <div className="flex justify-between">
                <span className="text-gray-600">Due:</span>
                <span className="font-medium text-gray-900">
                  {details.dueDate}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile swipe hint */}
      <div className="text-xs text-gray-400 mb-2 sm:hidden flex items-center gap-1">
        <span>←</span>
        <span className="italic">Swipe to view full table</span>
        <span>→</span>
      </div>

      {/* Line Items (mobile-safe) */}
      <div className="mb-8 overflow-x-auto -mx-6 sm:mx-0">
        <div className="min-w-[640px] sm:min-w-0">
          <table className="w-full text-sm">
            <thead className="sticky top-0 z-10">
              <tr style={{ backgroundColor: accentHex, color: "white" }}>
                <th className="text-left py-3 px-4 font-semibold uppercase text-xs">
                  Description
                </th>
                <th className="text-center py-3 px-4 font-semibold uppercase text-xs w-16">
                  Qty
                </th>
                <th className="text-right py-3 px-4 font-semibold uppercase text-xs w-24">
                  Rate
                </th>
                <th className="text-right py-3 px-4 font-semibold uppercase text-xs w-28">
                  Amount
                </th>
              </tr>
            </thead>

            <tbody>
              {lineItems.map((item, index) => (
                <tr
                  key={item.id}
                  className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  <td className="py-3 px-4 text-gray-700">
                    {item.description}
                  </td>
                  <td className="py-3 px-4 text-center text-gray-600">
                    {item.quantity}
                  </td>
                  <td className="py-3 px-4 text-right text-gray-600">
                    {formatCurrency(item.rate, details.currency)}
                  </td>
                  <td className="py-3 px-4 text-right font-semibold text-gray-900">
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
      <div className="flex justify-end">
        <div className="w-full sm:w-80">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium text-gray-900">
                {formatCurrency(subtotal, details.currency)}
              </span>
            </div>

            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-600">Tax</span>
              <span className="font-medium text-gray-900">
                {formatCurrency(taxAmount, details.currency)}
              </span>
            </div>

            <div
              className="flex justify-between py-3 font-bold text-base"
              style={{ backgroundColor: accentHex, color: "white" }}
            >
              <span className="pl-4">TOTAL</span>
              <span className="pr-4">
                {formatCurrency(total, details.currency)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      {footer && (
        <div
          className="mt-8 sm:mt-12 pt-6 sm:pt-12 border-t"
          style={{ borderColor: accentHex }}
        >
          <p className="text-xs text-gray-600 text-center">{footer}</p>
        </div>
      )}
    </div>
  );
});

ClassicTemplate.displayName = "ClassicTemplate";
