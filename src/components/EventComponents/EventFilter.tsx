import React from 'react';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { Filter, Search, Calendar, Tag, List, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DatePicker from './DatePicker';
import { useNavigate } from 'react-router-dom';
import { useEventStore } from '@/stores/EventStore';

const EventFilter: React.FC = () => {
  const {
    eventFilter,
    setEventFilter,
    eventCostFilter,
    setEventCostFilter,
    eventDateFilter,
    setEventDateFilter,
    selectedDate,
    setSelectedDate,
    activeTab,
    setActiveTab,
    yearFilter,
    setYearFilter,
  } = useEventStore();

  const navigate = useNavigate();

  const clearFilter = () => {
    setEventFilter('');
    setEventCostFilter('');
    setEventDateFilter('');
    setSelectedDate('');
    setActiveTab('all');
    setYearFilter(new Date().getFullYear());
    console.log('Filters cleared');
  };

  const handleCostFilterChange = (value: string) => {
    console.log('Cost filter changed to:', value);
    setEventCostFilter(value);
  };

  const handleDateFilterChange = (value: string) => {
    console.log('Date filter changed to:', value);
    setEventDateFilter(value);
  };

  const handleStatusFilterChange = (value: string) => {
    console.log('Status filter changed to:', value);
    setActiveTab(value);
  };

  const handleDateSelection = (date: string) => {
    console.log('Date selected:', date);
    setSelectedDate(date);
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log('Year filter changed to:', e.target.value);
    setYearFilter(Number(e.target.value));
  };

  // Log current filter values
  console.log('Current Filters:', {
    eventFilter,
    eventCostFilter,
    eventDateFilter,
    selectedDate,
    activeTab,
    yearFilter,
  });

  return (
    <div className="space-y-4 mb-4">
      <div className="flex items-center space-x-6 justify-between">
        {/* Search Input */}
        <div className="relative flex-grow">
          <Input
            type="text"
            placeholder="Search Events"
            value={eventFilter}
            onChange={(e) => {
              console.log('Search input changed:', e.target.value);
              setEventFilter(e.target.value);
            }}
            className="w-[400px] px-6 py-5 bg-gray-800 text-white border border-gray-600 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out text-lg pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        <div className="flex items-center space-x-2 border border-gray-600 rounded-lg bg-gray-800 px-4 py-2 w-fit">
          <Calendar className="text-white w-5 h-5" />
          <select
            value={yearFilter}
            onChange={handleYearChange}
            className="bg-transparent text-white border-none focus:ring-0 outline-none px-2 cursor-pointer"
          >
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

        {/* Date Picker */}
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

        {/* Filter Dropdown */}
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
              checked={eventCostFilter === ''}
              onCheckedChange={() => {
                console.log('Cost filter toggle: All');
                handleCostFilterChange('');
              }}
            >
              <Tag size={16} className="mr-2" /> Cost: All
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={eventCostFilter === 'Free'}
              onCheckedChange={() => {
                console.log('Cost filter toggle: Free');
                handleCostFilterChange('Free');
              }}
            >
              <Tag size={16} className="mr-2" /> Cost: Free
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={eventCostFilter === 'Paid'}
              onCheckedChange={() => {
                console.log('Cost filter toggle: Paid');
                handleCostFilterChange('Paid');
              }}
            >
              <Tag size={16} className="mr-2" /> Cost: Paid
            </DropdownMenuCheckboxItem>

            <DropdownMenuSeparator />

            {/* Date Filter */}
            <DropdownMenuCheckboxItem
              checked={eventDateFilter === 'upcoming'}
              onCheckedChange={() => {
                console.log('Date filter toggle: Upcoming');
                handleDateFilterChange(eventDateFilter === 'upcoming' ? '' : 'upcoming');
              }}
            >
              <Calendar size={16} className="mr-2 mb-2 text-gray-400" /> Date: Upcoming
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={eventDateFilter === 'past'}
              onCheckedChange={() => {
                console.log('Date filter toggle: Past');
                handleDateFilterChange(eventDateFilter === 'past' ? '' : 'past');
              }}
            >
              <Calendar size={16} className="mr-2 mb-2 text-gray-400" /> Date: Past
            </DropdownMenuCheckboxItem>

            <DropdownMenuSeparator />

            {/* Status Filter */}
            <DropdownMenuCheckboxItem
              checked={activeTab === 'all'}
              onCheckedChange={() => {
                console.log('Status filter toggle: All');
                handleStatusFilterChange('all');
              }}
            >
              <List size={16} className="mr-2" /> Status: All
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={activeTab === 'ongoing'}
              onCheckedChange={() => {
                console.log('Status filter toggle: Ongoing');
                handleStatusFilterChange('ongoing');
              }}
            >
              <List size={16} className="mr-2" /> Status: Ongoing
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={activeTab === 'completed'}
              onCheckedChange={() => {
                console.log('Status filter toggle: Completed');
                handleStatusFilterChange('completed');
              }}
            >
              <List size={16} className="mr-2" /> Status: Completed
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={activeTab === 'drafts'}
              onCheckedChange={() => {
                console.log('Status filter toggle: Drafts');
                handleStatusFilterChange('drafts');
              }}
            >
              <List size={16} className="mr-2" /> Status: Drafts
            </DropdownMenuCheckboxItem>

            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Add Event Button */}
        <div>
          <Button
            variant="default"
            className="w-24 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition duration-150 ease-in-out"
            onClick={() => navigate('/events/new')}
          >
            <Plus className="mr-2" />
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EventFilter;
