import React, { useId } from 'react'

const Select = React.forwardRef(function Select(
  {
    options = [],
    label,
    className = "",
    ...props
  },
  ref
) {
  const id = useId()

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="inline-block mb-1 pl-1 font-medium">
          {label}
        </label>
      )}
      <select
  id={id}
  ref={ref}
  className={`px-3 py-2 rounded-lg bg-blue-100 text-blue-900 border border-yellow-400 w-full ${className}`}
  {...props}
>
  {options?.map((option) => (
    <option key={option} value={option}>
      {option}
    </option>
  ))}
</select>

    </div>
  )
})

export default Select
