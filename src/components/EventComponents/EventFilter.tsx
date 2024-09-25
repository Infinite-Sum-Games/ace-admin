import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import {
  eventCostFilterState,
  eventDateFilterState,
  eventFilterState,
  activeTabState,
  selectedDateState,
  yearFilterState, // Add this import
} from '@/atoms/eventState';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { Filter, Search, Calendar, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { List } from 'lucide-react';
import DatePicker from './DatePicker'; // Import the DatePicker component

const EventFilter: React.FC = () => {
  const [filter, setFilter] = useRecoilState(eventFilterState);
  const [costFilter, setCostFilter] = useRecoilState(eventCostFilterState);
  const [dateFilter, setDateFilter] = useRecoilState(eventDateFilterState);
  const [selectedDate, setSelectedDate] = useRecoilState(selectedDateState);
  const [activeTab, setActiveTab] = useRecoilState(activeTabState);
  const [selectedYear, setSelectedYear] = useRecoilState(yearFilterState); // Use recoil state for year

  const clearFilter = () => {
    setFilter('');
    setCostFilter('');
    setDateFilter('');
    setSelectedDate('');
    setActiveTab('all');
    setSelectedYear(new Date().getFullYear());
  };

  const handleCostFilterChange = (value: string) => {
    setCostFilter((prev) => (prev === value ? '' : value));
  };

  const handleDateFilterChange = (value: string) => {
    setDateFilter(value);
  };

  const handleStatusFilterChange = (value: string) => {
    setActiveTab(value);
  };

  const handleDateSelection = (date: string) => {
    setSelectedDate(date);
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(Number(e.target.value));
  };

  return (
    <div className="space-y-4 mb-4">
      <div className="flex items-center space-x-6">
        {/* Search Input */}
        <div className="relative flex-grow">
          <Input
            type="text"
            placeholder="Search Events"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-[400px] px-6 py-5 bg-gray-800 text-white border border-gray-600 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out text-lg pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        <div className="flex items-center space-x-2 border border-gray-600 rounded-lg bg-gray-800 px-4 py-2 w-fit">
  {/* Lucide React Calendar Icon */}
  <Calendar className="text-white w-5 h-5" />

{/* Select Dropdown */}
<select
  value={selectedYear}
  onChange={handleYearChange}
  className="bg-transparent text-white border-none focus:ring-0 outline-none px-2 cursor-pointer"
>
  {/* Render years from 2018 to the current year */}
  {[...Array(new Date().getFullYear() - 2017)].map((_, index) => (
    <option
      key={index}
      value={2018 + index}
      className="bg-[hsl(var(--background))] text-[hsl(var(--foreground))]"
    >
      {2018 + index}
    </option>
  ))}
</select>


        </div>

        {/* DatePicker Component */}
        <div className="flex items-center space-x-2">
          <DatePicker selectedDate={selectedDate} onDateChange={handleDateSelection} />
        </div>

        <div>
          <Button
            variant="outline"
            onClick={clearFilter}
            className="w-24 rounded-lg bg-gray text-white border hover:bg-blue-500 hover:text-white transition duration-150 ease-in-out"
          >
            Clear
          </Button>
        </div>

        {/* Dropdown Menu for Filters */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Filter className="mr-2 text-xl" /> Filters
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-gray-900 text-white p-4 w-64">
            <DropdownMenuLabel>Filter By</DropdownMenuLabel>
            <DropdownMenuSeparator />

            {/* Cost Filter */}
            <DropdownMenuCheckboxItem
              checked={costFilter === ''}
              onCheckedChange={() => handleCostFilterChange('')}
            >
              <Tag size={16} className="mr-2" /> Cost: All
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={costFilter === 'Free'}
              onCheckedChange={() => handleCostFilterChange('Free')}
            >
              <Tag size={16} className="mr-2" /> Cost: Free
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={costFilter === 'Paid'}
              onCheckedChange={() => handleCostFilterChange('Paid')}
            >
              <Tag size={16} className="mr-2" /> Cost: Paid
            </DropdownMenuCheckboxItem>

            <DropdownMenuSeparator />

            {/* Date Filters: Upcoming, Past */}
            <DropdownMenuCheckboxItem
              checked={dateFilter === 'upcoming'}
              onCheckedChange={() => handleDateFilterChange(dateFilter === 'upcoming' ? '' : 'upcoming')}
            >
              <Calendar size={16} className="mr-2 mb-2 text-gray-400" /> Date: Upcoming
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={dateFilter === 'past'}
              onCheckedChange={() => handleDateFilterChange(dateFilter === 'past' ? '' : 'past')}
            >
              <Calendar size={16} className="mr-2 mb-2 text-gray-400" /> Date: Past
            </DropdownMenuCheckboxItem>

            <DropdownMenuSeparator />

            {/* Status Filter */}
            <DropdownMenuCheckboxItem
              checked={activeTab === 'all'}
              onCheckedChange={() => handleStatusFilterChange('all')}
            >
              <List size={16} className="mr-2" /> Status: All
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={activeTab === 'ongoing'}
              onCheckedChange={() => handleStatusFilterChange('ongoing')}
            >
              <List size={16} className="mr-2" /> Status: Ongoing
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={activeTab === 'completed'}
              onCheckedChange={() => handleStatusFilterChange('completed')}
            >
              <List size={16} className="mr-2" /> Status: Completed
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={activeTab === 'drafts'}
              onCheckedChange={() => handleStatusFilterChange('drafts')}
            >
              <List size={16} className="mr-2" /> Status: Drafts
            </DropdownMenuCheckboxItem>

            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default EventFilter;
