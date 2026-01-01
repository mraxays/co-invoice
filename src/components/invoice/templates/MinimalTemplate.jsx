import React from "react";
import useInvoiceStore from "@/store/useInvoiceStore";
import { formatCurrency, calculateTotals } from "@/lib/utils";
import { getFontFamily, getFontClass } from "@/lib/fontConfig";

export const MinimalTemplate = React.forwardRef((props, ref) => {
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
      <div className="mb-12">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
          {sender.logo ? (
            <img
              src={sender.logo}
              alt="Logo"
              className="h-14 object-contain"
            />
          ) : (
            <div
              className="text-3xl font-bold uppercase tracking-wide"
              style={{ color: accentHex }}
            >
              {sender.name || "Company"}
            </div>
          )}

          <div className="text-left sm:text-right text-xs text-gray-400">
            <p>{sender.email}</p>
            <p>{sender.phone}</p>
          </div>
        </div>

        <div
          className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b pb-3 gap-3"
          style={{ borderColor: accentHex }}
        >
          <h1 className="text-3xl font-light text-gray-900">
            Invoice
          </h1>

          <div className="text-left sm:text-right text-xs text-gray-500">
            <p className="text-sm font-medium text-gray-700">
              #{details.number}
            </p>
            <p className="mt-1">{details.date}</p>
            {details.dueDate && <p>Due: {details.dueDate}</p>}
          </div>
        </div>
      </div>

      {/* Addresses */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12 text-xs">
        <div>
          <p className="uppercase text-gray-400 mb-2">From</p>
          <p className="font-medium text-gray-900">{sender.name}</p>
          <p className="text-gray-500 mt-1 whitespace-pre-wrap leading-relaxed">
            {sender.address}
          </p>
        </div>

        <div>
          <p className="uppercase text-gray-400 mb-2">To</p>
          <p className="font-medium text-gray-900">{receiver.name}</p>
          <p className="text-gray-500 mt-1 whitespace-pre-wrap leading-relaxed">
            {receiver.address}
          </p>
          <p className="text-gray-500">{receiver.email}</p>
        </div>
      </div>

      {/* Mobile scroll hint */}
      <div className="text-xs text-gray-400 mb-2 sm:hidden flex items-center gap-1">
        <span>←</span>
        <span className="italic">Swipe to view full table</span>
        <span>→</span>
      </div>

      {/* Line Items (mobile-safe) */}
      <div className="mb-12 overflow-x-auto -mx-6 sm:mx-0">
        <div className="min-w-[640px] sm:min-w-0">
          <div className="flex text-xs uppercase text-gray-400 py-3 border-y">
            <div className="flex-1 px-2">Description</div>
            <div className="w-16 text-center px-2">Qty</div>
            <div className="w-24 text-right px-2">Rate</div>
            <div className="w-28 text-right px-2">Amount</div>
          </div>

          {lineItems.map((item) => (
            <div
              key={item.id}
              className="flex text-sm py-3 border-b border-gray-100"
            >
              <div className="flex-1 px-2 text-gray-700">
                {item.description}
              </div>
              <div className="w-16 px-2 text-center text-gray-500">
                {item.quantity}
              </div>
              <div className="w-24 px-2 text-right text-gray-500">
                {formatCurrency(item.rate, details.currency)}
              </div>
              <div className="w-28 px-2 text-right font-medium text-gray-900">
                {formatCurrency(
                  item.quantity * item.rate,
                  details.currency
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Totals */}
      <div className="flex justify-end">
        <div className="w-full sm:w-72 text-sm space-y-2">
          <div className="flex justify-between text-gray-500">
            <span>Subtotal</span>
            <span className="text-gray-700">
              {formatCurrency(subtotal, details.currency)}
            </span>
          </div>

          <div className="flex justify-between text-gray-500">
            <span>Tax</span>
            <span className="text-gray-700">
              {formatCurrency(taxAmount, details.currency)}
            </span>
          </div>

          <div className="flex justify-between pt-3 border-t border-gray-300">
            <span className="font-medium text-gray-900">TOTAL</span>
            <span
              className="text-2xl font-light"
              style={{ color: accentHex }}
            >
              {formatCurrency(total, details.currency)}
            </span>
          </div>
        </div>
      </div>

      {/* Footer */}
      {footer && (
        <div className="mt-12 sm:mt-16 pt-6 border-t border-gray-100 text-center">
          <p className="text-xs text-gray-400 leading-relaxed whitespace-pre-wrap">
            {footer}
          </p>
        </div>
      )}
    </div>
  );
});

MinimalTemplate.displayName = "MinimalTemplate";
