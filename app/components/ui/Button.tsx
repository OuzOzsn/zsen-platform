interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  // children, onClick, disabled, type → extends'ten geliyor otomatik
}

const variantClasses = {
    primary:   "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    danger:    "bg-red-600 text-white hover:bg-red-700",
    ghost:     "bg-transparent border border-gray-300 hover:bg-gray-100",
};

const sizeClasses = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
};

export function ZsenButton ({
    variant = "primary",
    size = "md",
    isLoading = false,
    children,
    className,
    disabled,
    ...rest
}: ButtonProps){

    const classes = `
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${disabled || isLoading ? "opacity-50 cursor-not-allowed" : ""}
        ${className ?? ""}
    `;

    return (
        <button
            className={classes}
            disabled={disabled || isLoading}
            {...rest}           // onClick, type, aria-label vs buradan geliyor
        >
            {isLoading ? "Yükleniyor..." : children}
        </button>
    );

}