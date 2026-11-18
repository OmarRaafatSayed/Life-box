"use client";

import React from "react";

export function PageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-black text-gray-900 mb-1">{title}</h1>
        <p className="text-sm lg:text-base text-gray-600">{description}</p>
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  );
}

export function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`bg-white rounded-2xl shadow-sm border border-gray-200 ${className}`}>
      {children}
    </div>
  );
}

export function Button({
  children,
  onClick,
  variant = "primary",
  type = "button",
  disabled = false,
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "danger";
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
}) {
  const baseClasses =
    "px-5 py-2.5 rounded-xl font-semibold text-sm transition-all inline-flex items-center justify-center gap-2";

  const variantStyles = {
    primary: { background: "#3D1A6E", color: "#ffffff" },
    secondary: {},
    danger: { background: "#DC2626", color: "#ffffff" },
  };

  const variantClasses = {
    primary: "hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed",
    secondary:
      "border-2 border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed",
    danger: "hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={variantStyles[variant]}
    >
      {children}
    </button>
  );
}

export function Input({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  className = "",
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl transition-all text-gray-700 text-right"
        style={{ direction: "rtl" }}
        onFocus={(e) => (e.currentTarget.style.borderColor = "#3D1A6E")}
        onBlur={(e) => (e.currentTarget.style.borderColor = "#e5e7eb")}
      />
    </div>
  );
}

export function Textarea({
  label,
  value,
  onChange,
  placeholder,
  required = false,
  rows = 4,
  className = "",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  rows?: number;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="block text-sm font-bold text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        rows={rows}
        className="w-full px-4 py-3 border border-gray-300 rounded-2xl text-right"
        style={{ direction: "rtl" }}
        onFocus={(e) => (e.currentTarget.style.borderColor = "#3D1A6E")}
        onBlur={(e) => (e.currentTarget.style.borderColor = "#d1d5db")}
      />
    </div>
  );
}

export function Select({
  label,
  value,
  onChange,
  options,
  required = false,
  className = "",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  required?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="block text-sm font-bold text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full px-4 py-3 border border-gray-300 rounded-2xl text-right"
        style={{ direction: "rtl" }}
        onFocus={(e) => (e.currentTarget.style.borderColor = "#3D1A6E")}
        onBlur={(e) => (e.currentTarget.style.borderColor = "#d1d5db")}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export function Checkbox({
  label,
  checked,
  onChange,
  className = "",
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="w-5 h-5 rounded"
        style={{ accentColor: "#3D1A6E" }}
      />
      <label className="text-sm font-semibold text-gray-700">{label}</label>
    </div>
  );
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-black text-gray-900">{title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

export function Table({
  headers,
  children,
  emptyMessage = "لا توجد بيانات",
}: {
  headers: string[];
  children: React.ReactNode;
  emptyMessage?: string;
}) {
  const hasData = React.Children.count(children) > 0;

  return (
    <Card>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {headers.map((header, index) => (
                <th
                  key={index}
                  className="px-6 py-3 text-right text-xs font-bold text-gray-700 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {hasData ? (
              children
            ) : (
              <tr>
                <td colSpan={headers.length} className="text-center py-12 text-gray-500">
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

export function StatusBadge({
  status,
  type = "success",
}: {
  status: string;
  type?: "success" | "warning" | "error" | "info";
}) {
  const colors = {
    success: { bg: "#D1FAE5", text: "#065F46" },
    warning: { bg: "#FEF3C7", text: "#92400E" },
    error: { bg: "#FEE2E2", text: "#991B1B" },
    info: { bg: "#DBEAFE", text: "#1E40AF" },
  };
  const color = colors[type];
  return (
    <span
      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold"
      style={{ background: color.bg, color: color.text }}
    >
      {status}
    </span>
  );
}

export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center p-12">
      <div
        className="animate-spin rounded-full h-12 w-12 border-b-2"
        style={{ borderColor: "#3D1A6E" }}
      />
    </div>
  );
}
