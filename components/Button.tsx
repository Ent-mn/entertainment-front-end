/** @format */

import React from "react";
import clsx from "clsx";

interface ButtonProps {
  type?: "link" | "button" | "toggle" | "switch";
  children: React.ReactNode;
  color?: "primary" | "secondary" | "danger" | "gray";
  size?: "sm" | "md" | "lg";
  border?: "rounded" | "square";
  effect?: "none" | "transition";
  hover?: "opacity-80" | "shadow-lg" | "none";
  error?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Button: React.FC<ButtonProps> = ({
  type = "button",
  children,
  color = "gray",
  size = "md",
  border = "rounded",
  effect = "transition",
  hover = "opacity-80",
  error = true,
  disabled = false,
  onClick,
  onChange,
}) => {
  const baseStyles = "font-medium focus:outline-none duration-300";
  const colorStyles = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    secondary: "bg-gray-500 text-white hover:bg-gray-600",
    danger: "bg-red-500 text-white hover:bg-red-600",
    gray: "bg-gray-300 text-black hover:bg-gray-400",
  };
  const sizeStyles = {
    sm: "px-2 py-1 text-sm",
    md: "px-3 py-2 text-base",
    lg: "px-4 py-2 text-lg",
  };
  const borderStyles = {
    rounded: "rounded-lg",
    square: "rounded-none",
  };
  const effectStyles = effect === "transition" ? "transition-all" : "";
  const hoverStyles = {
    "opacity-80": "hover:opacity-80",
    "shadow-lg": "hover:shadow-lg",
    none: "",
  };
  const errorStyles = error ? "border-2 border-red-500" : "";

  if (type === "link") {
    return (
      <a
        href="test"
        className={clsx(
          baseStyles,
          colorStyles[color],
          sizeStyles[size],
          borderStyles[border],
          effectStyles,
          hoverStyles[hover],
          errorStyles,
          disabled && "opacity-50 cursor-not-allowed"
        )}
      >
        {children}
      </a>
    );
  }

  if (type === "toggle" || type === "switch") {
    return (
      <label className="flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="hidden"
          onChange={onChange}
          disabled={disabled}
        />
        <span
          className={clsx(
            "w-10 h-5 flex items-center bg-gray-300 rounded-full p-1",
            effectStyles,
            hoverStyles[hover],
            errorStyles,
            disabled && "opacity-50 cursor-not-allowed"
          )}
        >
          <span className="bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300" />
        </span>
      </label>
    );
  }

  return (
    <button
      className={clsx(
        baseStyles,
        colorStyles[color],
        sizeStyles[size],
        borderStyles[border],
        effectStyles,
        hoverStyles[hover],
        errorStyles,
        disabled && "opacity-50 cursor-not-allowed"
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
