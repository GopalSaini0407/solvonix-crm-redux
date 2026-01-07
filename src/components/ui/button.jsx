export function Button({
    children,
    className = "",
    variant = "default",
    ...props
  }) {
    const base =
      "inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition";
  
    const variants = {
      default: "bg-indigo-600 text-white hover:bg-indigo-700",
      ghost: "bg-transparent hover:bg-gray-100",
      outline: "border border-gray-300 hover:bg-gray-100",
    };
  
    return (
      <button
        className={`${base} ${variants[variant]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
  