function Button({
  children,
  type = "button",
  variant = "primary",
  disabled = false,
  onClick,
}) {
  const variants = {
    primary: "bg-primary text-white hover:bg-primary-hover",
    secondary:
      "border border-border bg-surface text-text-primary hover:bg-background",
    danger: "bg-danger text-white hover:bg-danger-hover",
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`cursor-pointer rounded-md px-4 py-2 text-sm font-medium transition-colors
        disabled:cursor-not-allowed disabled:opacity-50
        ${variants[variant]}`}
    >
      {children}
    </button>
  );
}

export default Button;
