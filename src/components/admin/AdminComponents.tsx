"use client";

import React from "react";

export function PageHeader({ 
  title, 
  description, 
  action 
}: { 
  title: string; 
  description: string; 
  action?: React.ReactNode; 
}) {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-3xl font-black text-gray-900 mb-2">{title}</h1>
        <p className="text-gray-600">{description}</p>
      </div>
      {action}
    </div>
  );
}

export function Card({ 
  children, 
  className = "" 
}: { 
  children: React.ReactNode; 
  className?: string; 
}) {
  return (
    <div className={`bg-white rounded-3xl shadow-sm border border-gray-100 ${className}`}>
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
  className = ""
}: { 
  children: React.ReactNode; 
  onClick?: () => void; 
  variant?: "primary" | "secondary" | "danger";
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
}) {
  const baseClasses = "px-6 py-3 rounded-2xl font-semibold transition-all";
  
  const variantClasses = {
    primary: "text-white hover:scale-105",
    secondary: "border-2 border-gray-300 text-gray-700 hover:bg-gray-50",
    danger: "bg-red-600 text-white hover:bg-red-700"
  };

  const style = variant === "primary" 
    ? { background: "linear-gradient(135deg, #3D1A6E, #E91E8C)" }
    : undefined;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      style={style}
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
  className = ""
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
      <label className="block text-sm font-bold text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
  className = ""
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
        className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
  className = ""
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
        className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
  className = ""
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
        className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
      />
      <label className="text-sm font-semibold text-gray-700">{label}</label>
    </div>
  );
}

export function Modal({ 
  isOpen, 
  onClose, 
  title, 
  children 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  title: string; 
  children: React.ReactNode; 
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-black text-gray-900 mb-6">{title}</h2>
        {children}
      </div>
    </div>
  );
}

export function Table({ 
  headers, 
  children, 
  emptyMessage = "No data found" 
}: { 
  headers: string[]; 
  children: React.ReactNode; 
  emptyMessage?: string; 
}) {
  const hasData = React.Children.count(children) > 0;

  return (
    <Card>
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                className="text-left px-6 py-4 text-sm font-bold text-gray-700"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
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
    </Card>
  );
}

export function StatusBadge({ 
  status, 
  type = "success" 
}: { 
  status: string; 
  type?: "success" | "warning" | "error" | "info"; 
}) {
  const colors = {
    success: { bg: "#D1FAE5", text: "#065F46" },
    warning: { bg: "#FEF3C7", text: "#92400E" },
    error: { bg: "#FEE2E2", text: "#991B1B" },
    info: { bg: "#DBEAFE", text: "#1E40AF" }
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
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
    </div>
  );
}
