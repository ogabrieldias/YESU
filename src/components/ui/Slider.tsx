"use client";

import { type InputHTMLAttributes } from "react";

interface SliderProps extends InputHTMLAttributes<HTMLInputElement> {
  min: number;
  max: number;
  step?: number;
  value: number;
  onValueChange?: (value: number[]) => void;
}

export function Slider({ min, max, step = 1, value, onValueChange, onChange, ...props }: SliderProps) {
  const percent = ((value - min) / (max - min)) * 100;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    onChange?.(e);
    onValueChange?.([newValue]);
  };

  return (
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={handleChange}
      className="w-full h-1 rounded-full appearance-none cursor-pointer"
      style={{
        background: `linear-gradient(to right, #FF6B00 ${percent}%, #1a1a1a ${percent}%)`,
        ...props.style,
      }}
      {...props}
    />
  );
}
