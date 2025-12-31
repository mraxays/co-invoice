import React from "react";
import useInvoiceStore from "@/store/useInvoiceStore";
import { formatCurrency, calculateTotals } from "@/lib/utils";
import { getFontFamily, getFontClass } from "@/lib/fontConfig";

export const ModernTemplate = React.forwardRef((props, ref) => {
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
      style={{
        borderTop: `10px solid ${accentHex}`,
        borderBottom: `10px solid ${accentHex}`,
        fontFamily,
      }}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start gap-6 mb-10 border-b border-gray-900 pb-4">
        <div className="sm:w-1/2">
          {sender.logo ? (
            <img
              src={sender.logo}
              alt="Logo"
              className="h-16 object-contain mb-4"
            />
          ) : (
            <div
              className="text-3xl sm:text-4xl font-bold uppercase tracking-tight"
              style={{ color: accentHex }}
            >
              {sender.name || "Company"}
            </div>
          )}
        </div>

        <div className="text-left sm:text-right">
          <h1 className="text-4xl font-light tracking-tight text-gray-900 mb-2">
            INVOICE
          </h1>
          <p className="text-gray-500">#{details.number}</p>
          <p className="text-sm text-gray-400 mt-1">
            Date: {details.date}
          </p>
          {details.dueDate && (
            <p className="text-sm text-gray-400">
              Due: {details.dueDate}
            </p>
          )}
        </div>
      </div>

      {/* Addresses */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
        <div>
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
            From
          </h3>
          <p className="font-medium text-gray-900">{sender.name}</p>
          <p className="text-gray-500 text-sm mt-1 whitespace-pre-wrap">
            {sender.address}
          </p>
          <p className="text-gray-500 text-sm mt-1">{sender.email}</p>
          <p className="text-gray-500 text-sm">{sender.phone}</p>
        </div>

        <div className="sm:text-right">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
            Bill To
          </h3>
          <p className="font-medium text-gray-900">{receiver.name}</p>
          <p className="text-gray-500 text-sm mt-1 whitespace-pre-wrap">
            {receiver.address}
          </p>
          <p className="text-gray-500 text-sm mt-1">{receiver.email}</p>
          <p className="text-gray-500 text-sm">{receiver.phone}</p>
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
          <table className="w-full">
            <thead className="sticky top-0 z-10 bg-white">
              <tr className="border-y border-gray-900">
                <th className="text-left py-3 px-2 font-semibold text-sm uppercase tracking-wide text-gray-700">
                  Description
                </th>
                <th className="text-center py-3 px-2 font-semibold text-sm uppercase tracking-wide text-gray-700 w-20">
                  Qty
                </th>
                <th className="text-right py-3 px-2 font-semibold text-sm uppercase tracking-wide text-gray-700 w-28">
                  Rate
                </th>
                <th className="text-right py-3 px-2 font-semibold text-sm uppercase tracking-wide text-gray-700 w-32">
                  Amount
                </th>
              </tr>
            </thead>

            <tbody>
              {lineItems.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-gray-100"
                >
                  <td className="py-3 px-2 text-gray-700">
                    {item.description}
                  </td>
                  <td className="py-3 px-2 text-center text-gray-600">
                    {item.quantity}
                  </td>
                  <td className="py-3 px-2 text-right text-gray-600">
                    {formatCurrency(item.rate, details.currency)}
                  </td>
                  <td className="py-3 px-2 text-right font-medium text-gray-900">
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
        <div className="w-full sm:w-80">
          <div className="flex justify-between py-2 px-3 border-b border-gray-900">
            <span className="text-gray-600">Subtotal</span>
            <span className="text-gray-900 font-medium">
              {formatCurrency(subtotal, details.currency)}
            </span>
          </div>

          <div className="flex justify-between py-2 px-3 border-b border-gray-900">
            <span className="text-gray-600">Tax</span>
            <span className="text-gray-900 font-medium">
              {formatCurrency(taxAmount, details.currency)}
            </span>
          </div>

          <div className="flex justify-between text-lg font-bold pt-3 px-3">
            <span className="text-gray-900">Total</span>
            <span style={{ color: accentHex }}>
              {formatCurrency(total, details.currency)}
            </span>
          </div>
        </div>
      </div>

      {/* Footer */}
      {footer && (
        <div className="border-t border-gray-900 pt-8 sm:pt-16">
          <p className="text-sm text-center text-gray-500 whitespace-pre-wrap">
            {footer}
          </p>
        </div>
      )}
    </div>
  );
});

ModernTemplate.displayName = "ModernTemplate";
