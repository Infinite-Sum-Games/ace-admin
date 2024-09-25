import React from 'react';
import { Calendar } from 'lucide-react'; // Import the Calendar icon from Lucide React

interface DatePickerProps {
  selectedDate: string;
  onDateChange: (date: string) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ selectedDate, onDateChange }) => {
  return (
    <div className="relative">
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => onDateChange(e.target.value)}
        className="w-64 h-10 pl-10 pr-3 rounded-md bg-gray-800 text-white border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out appearance-none"
      />
      {/* Calendar Icon from Lucide */}
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Calendar className="w-5 h-5 text-gray" />
      </div>
    </div>
  );
};

export default DatePicker;
