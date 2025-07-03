import React, { useId } from "react";

const Input = React.forwardRef(function Input(
  {
    label,
    type = "text",
    className = "",
    placeholder = "",
    required = false,
    ...props
  },
  ref
) {
  const id = useId();

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="inline-block mb-1 pl-1 text-sm font-medium text-gray-700"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
    <input
  type={type}
  className={`px-3 py-2 rounded-lg bg-blue-100 text-blue-900 outline-none focus:bg-yellow-100 border border-yellow-400 w-full ${className}`}
  ref={ref}
  id={id}
  {...props}
/>
    </div>
  );
});

export default Input;
