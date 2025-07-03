import React from "react";

export default function Button({
  children,
  type = "button",
  bgColor = "bg-blue-700 hover:bg-yellow-400 hover:text-blue-900",
  textColor = "text-yellow-300",
  className = "",
  ...props
}) {
  return (
    <button
      className={`px-4 py-2 rounded-lg shadow-md font-semibold transition-all duration-300 ${bgColor} ${textColor} ${className}`}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}