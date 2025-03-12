/** @format */

import { useState } from "react";
import clsx from "clsx";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  type?: "text" | "password" | "email" | "number";
  size?: "sm" | "md" | "lg";
  variant?: "outlined" | "filled" | "standard";
  error?: boolean;
  disabled?: boolean;
  iconLeft?: React.ReactNode;
  eye?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  type = "text",
  size = "md",
  variant = "outlined",
  error = false,
  disabled = false,
  iconLeft,
  eye = false,
  className,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const baseStyles =
    "block w-full rounded-lg transition duration-300 focus:ring-2 outline-none";
  const sizeStyles = {
    sm: "px-2 py-1 text-sm",
    md: "px-3 py-2 text-base",
    lg: "px-4 py-3 text-lg",
  };

  const variantStyles = {
    outlined: "border border-gray-300 focus:border-blue-500",
    filled: "bg-gray-100 focus:bg-white border border-gray-300",
    standard: "border-b border-gray-400 focus:border-blue-500 rounded-none",
  };

  return (
    <div className="w-full">
      {label && <label className="block mb-1 text-gray-700">{label}</label>}
      <div className="relative flex items-center">
        {iconLeft && (
          <span className="absolute left-3">
            <img className="h-4 w-4" src={iconLeft} alt="eye toggle" />
          </span>
        )}
        <input
          type={eye ? (showPassword ? "text" : "password") : type}
          disabled={disabled}
          className={clsx(
            baseStyles,
            sizeStyles[size],
            variantStyles[variant],
            iconLeft && "pl-10",
            disabled && "opacity-50 cursor-not-allowed",
            eye && "pr-10",
            className
          )}
          {...props}
        />
        {eye && (
          <span
            className="absolute right-3 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            <img
              className="h-4 w-4"
              src={
                showPassword
                  ? "https://cdn-icons-png.flaticon.com/128/10812/10812267.png"
                  : "https://cdn-icons-png.flaticon.com/128/159/159604.png"
              }
              alt="eye toggle"
            />
          </span>
        )}
      </div>
    </div>
  );
};

export default Input;
