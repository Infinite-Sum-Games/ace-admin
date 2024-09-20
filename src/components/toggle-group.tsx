import React from "react";

interface ToggleGroupProps {
  filter: string;
  onChange: (newFilter: string) => void;
}

const ToggleGroup: React.FC<ToggleGroupProps> = ({ filter, onChange }) => {
  return (
    <div className="flex space-x-4">
      <button
        className={`px-4 py-2 rounded-lg ${
          filter === "This Year"
            ? "bg-primary text-primary-foreground"
            : "bg-secondary text-secondary-foreground"
        }`}
        onClick={() => onChange("This Year")}
      >
        This Year
      </button>
      <button
        className={`px-4 py-2 rounded-lg ${
          filter === "Last Year"
            ? "bg-primary text-primary-foreground"
            : "bg-secondary text-secondary-foreground"
        }`}
        onClick={() => onChange("Last Year")}
      >
        Last Year
      </button>
      <button
        className={`px-4 py-2 rounded-lg ${
          filter === "All Time"
            ? "bg-primary text-primary-foreground"
            : "bg-secondary text-secondary-foreground"
        }`}
        onClick={() => onChange("All Time")}
      >
        All Time
      </button>
    </div>
  );
};

export default ToggleGroup;
