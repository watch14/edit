"use client";
import React from "react";

export default function AppModal({
  open,
  onClose,
  children,
  className = "",
  title,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  title?: string;
}) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/30"
      style={{ overflow: "visible" }}
    >
      <div
        className={
          "bg-white text-black rounded-lg shadow-lg p-6 min-w-[350px] relative overflow-visible " +
          className
        }
      >
        <button className="absolute top-2 right-2 text-lg" onClick={onClose}>
          &times;
        </button>
        {title && <div className="text-lg font-bold mb-4 text-center">{title}</div>}
        {children}
      </div>
    </div>
  );
}
