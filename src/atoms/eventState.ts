import { atom, selector } from 'recoil';
import { Event } from '@/components/EventComponents/type';
export const activeTabState = atom<string>({
  key: 'activeTabState',
  default: 'all',
});


export const eventListState = atom<Event[]>({
  key: 'eventListState',
  default: [
    { id: '1', title: 'Event 1', organizer: 'Organizer 1', venue: 'Venue 1', cost: 'Free', start: '2024-01-18',  status: 'ongoing' },
    { id: '2', title: 'Event 2', organizer: 'Organizer 2', venue: 'Venue 2', cost: 'Paid', start: '2024-09-19',  status: 'completed' },
    { id: '3', title: 'Event 3', organizer: 'Organizer 3', venue: 'Venue 3', cost: 'Free', start: '2024-09-20',  status: 'ongoing' },
    { id: '4', title: 'Event 4', organizer: 'Organizer 4', venue: 'Venue 4', cost: 'Paid', start: '2024-05-21',  status: 'completed' },
    { id: '5', title: 'Event 5', organizer: 'Organizer 5', venue: 'Venue 5', cost: 'Free', start: '2024-09-22',  status: 'completed' },
    { id: '6', title: 'Event 6', organizer: 'Organizer 6', venue: 'Venue 6', cost: 'Free', start: '2024-09-18',  status: 'ongoing' },
    { id: '7', title: 'Event 7', organizer: 'Organizer 7', venue: 'Venue 7', cost: 'Paid', start: '2024-02-9',  status: 'completed' },
    { id: '8', title: 'Event 8', organizer: 'Organizer 8', venue: 'Venue 8', cost: 'Free', start: '2024-09-2',  status: 'ongoing' },
    { id: '9', title: 'Event 9', organizer: 'Organizer 9', venue: 'Venue 9', cost: 'Paid', start: '2024-07-1',  status: 'completed' },
    { id: '10', title: 'Event 10', organizer: 'Organizer 10', venue: 'Venue 10', cost: 'Free', start: '2024-09-22',  status: 'completed' },
  ], 
});

export const eventFilterState = atom<string>({
  key: 'eventFilterState',
  default: '',
});
export const eventCostFilterState = atom<string>({
  key: 'eventCostFilterState',
  default: '',
});

export const eventDateFilterState = atom<string>({
  key: 'eventDateFilterState',
  default: '',
});

export const filteredEventListState = selector({
  key: 'filteredEventListState',
  get: ({ get }) => {
    const filter = get(eventFilterState);
    const eventList = get(eventListState);
    const costFilter = get(eventCostFilterState);
    const dateFilter = get(eventDateFilterState);
    

    const currentDate = new Date();

    return eventList.filter((event) => {
      const matchesTitle = event.title.toLowerCase().includes(filter.toLowerCase());
      const matchesCost = !costFilter || event.cost === costFilter;
      const matchesDate =
        !dateFilter ||
        (dateFilter === 'past' && new Date(event.start) < currentDate) ||
        (dateFilter === 'upcoming' && new Date(event.start) >= currentDate);

      return matchesTitle && matchesCost && matchesDate;
  });
  }
},
)
;
