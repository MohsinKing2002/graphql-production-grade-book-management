function Input({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
  required = false,
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-1 block text-sm font-medium text-text-primary"
      >
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-md border border-border bg-surface px-3 py-2
          text-sm text-text-primary outline-none
          transition
          placeholder:text-text-secondary
          focus:border-primary focus:ring-2 focus:ring-primary/20"
      />
    </div>
  );
}

export default Input;
