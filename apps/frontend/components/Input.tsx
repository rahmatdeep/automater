"use client";

import React, { RefObject } from "react";

interface InputProps {
  label: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: "text" | "password";
}

// Using forwardRef to allow parent components to pass refs
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, placeholder, onChange, type = "text" }, ref) => {
    return (
      <div>
        <div className="text-sm pb-1 pt-2">
          * <label>{label}</label>
        </div>
        <input
          className="border rounded px-4 py-2 w-full border-black"
          type={type}
          placeholder={placeholder}
          onChange={onChange}
          ref={ref}
        />
      </div>
    );
  }
);

Input.displayName = "Input";
