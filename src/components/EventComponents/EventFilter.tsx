import React from 'react';
import { useRecoilState } from 'recoil';
import { eventCostFilterState, eventDateFilterState, eventFilterState } from '@/atoms/eventState';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent} from '@/components/ui/dropdown-menu';
import { Filter , Search , Calendar,Tag} from 'lucide-react';
const EventFilter: React.FC = () => {
  const [filter, setFilter] = useRecoilState(eventFilterState);
  const [costFilter, setCostFilter] = useRecoilState(eventCostFilterState);
  const [dateFilter, setDateFilter] = useRecoilState(eventDateFilterState);

  const clearFilter = () => {
    setFilter('');
    setCostFilter('');
    setDateFilter('');
  };

  const handleCostFilterChange = (value: string) => {
    setCostFilter(prev => (prev === value ? '' : value));
  };

  const handleDateFilterChange = (value: string) => {
    setDateFilter(prev => (prev === value ? '' : value));
  };

  return (
    <div className="flex items-center space-x-6 mb-4">
      <div className="relative flex-grow">
        <Input
          type="text"
          placeholder="Search Events"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-[400px] px-6 py-5 bg-gray-800 text-white border border-gray-600 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out text-lg pl-10"
        />
        < Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-150 ease-in-out">
          <Filter className="mr-2" />
          Filter
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-gray-900 text-white p-4">
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={costFilter === ''}
                onChange={() => handleCostFilterChange('')}
                className="mr-2"
              />
              <Tag className="mr-2" /> Cost: All
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={costFilter === 'Free'}
                onChange={() => handleCostFilterChange('Free')}
                className="mr-2"
              />
              <Tag className="mr-2" /> Cost: Free
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={costFilter === 'Paid'}
                onChange={() => handleCostFilterChange('Paid')}
                className="mr-2"
              />
              <Tag className="mr-2" /> Cost: Paid
            </label>
          </div>
          <div className="space-y-2 mt-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={dateFilter === ''}
                onChange={() => handleDateFilterChange('')}
                className="mr-2"
              />
              <Calendar className="mr-2" /> Date: All
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={dateFilter === 'past'}
                onChange={() => handleDateFilterChange('past')}
                className="mr-2"
              />
              <Calendar className="mr-2" /> Date: Past Events
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={dateFilter === 'upcoming'}
                onChange={() => handleDateFilterChange('upcoming')}
                className="mr-2"
              />
              <Calendar className="mr-2" /> Date: Upcoming Events
            </label>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
      <button
        onClick={clearFilter}
        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-md transition duration-150 ease-in-out"
      >
        Clear
      </button>
    </div>
  );
};

export default EventFilter;
