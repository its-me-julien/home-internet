import React from "react";

interface RatingFieldProps {
  label: string;
  name: string;
  value: number;
  onChange: (name: string, value: number) => void;
}

const RatingField: React.FC<RatingFieldProps> = ({ label, name, value, onChange }) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between w-full space-y-2 md:space-y-0">
      <label htmlFor={name} className="text-sm font-medium text-gray-800">
        {label}
      </label>
      <div className="rating flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <label
            key={`${name}-${star}`}
            className="cursor-pointer"
            aria-label={`${label} - ${star} Star`}
          >
            <input
              id={`${name}-${star}`}
              type="radio"
              name={name}
              className="hidden"
              value={star}
              checked={value === star}
              onChange={() => onChange(name, star)}
            />
            <div
              className={`mask mask-star-2 ${
                value >= star ? "bg-[#F6642D]" : "bg-gray-300"
              } w-6 h-6`}
            />
          </label>
        ))}
      </div>
    </div>
  );
};

export default RatingField;
