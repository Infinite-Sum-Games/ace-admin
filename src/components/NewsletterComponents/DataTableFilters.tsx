import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { CalendarIcon, CheckCircleIcon, XCircle } from "lucide-react";

// YearFilter Component
export const YearFilter = ({
  years,
  selectedYears,
  onYearChange,
  clearYearFilters,
}: {
  years: number[];
  selectedYears: number[];
  onYearChange: (year: number) => void;
  clearYearFilters: () => void;
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="outline">
          <CalendarIcon className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Filter by Year</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {years.map((year) => (
          <DropdownMenuCheckboxItem
            key={year}
            checked={selectedYears.includes(year)}
            onCheckedChange={() => onYearChange(year)}
          >
            {year}
          </DropdownMenuCheckboxItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={clearYearFilters}>
          Clear Filter
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// StatusFilter Component
export const StatusFilter = ({
  statuses,
  onStatusChange,
  clearStatusFilters,
}: {
  statuses: string[];
  onStatusChange: (status: string) => void;
  clearStatusFilters: () => void;
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="outline">
          <CheckCircleIcon className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {statuses.map((status) => (
          <DropdownMenuItem key={status} onClick={() => onStatusChange(status)}>
            {status}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={clearStatusFilters}>
          Clear Filter
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// ResetFiltersButton Component
export const ResetFiltersButton = ({
  resetAllFilters,
}: {
  resetAllFilters: () => void;
}) => {
  return (
    <Button variant="outline" onClick={resetAllFilters}>
      <XCircle className="w-4 h-4" />
    </Button>
  );
};