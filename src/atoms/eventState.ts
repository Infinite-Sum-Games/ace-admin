import { atom, selector } from 'recoil';
import { Event } from '@/types/type';
export const activeTabState = atom<string>({
  key: 'activeTabState',
  default: 'all',
});
interface RegisteredParticipant {
  id: string;
  name: string;
  email: string;
  status: string;
  department:string;
}
interface EventRegistration {
  eventId: string;
  eventTitle: string;
  registeredParticipants: RegisteredParticipant[];
}
export const eventRegistrationState = atom<EventRegistration[]>({
  key: 'eventRegistrationState',
  default: [
    {
      eventId: '1',
      eventTitle: 'Event 1',
      registeredParticipants: [
        { id: '101', name: 'Alice', email: 'alice@example.com', status: 'checked in',department:'CSE' },
        { id: '102', name: 'Bob', email: 'bob@example.com', status: 'not checked in',department:'EEE' },
        { id: '103', name: 'Participant3', email: 'alice@example.com', status: 'checked in',department:'MEE' },
        { id: '104', name: 'Bob', email: 'bob@example.com', status: 'not checked in',department:'CSE' },
      ],
    },
    {
      eventId: '2',
      eventTitle: 'Event 2',
      registeredParticipants: [
        { id: '103', name: 'Charlie', email: 'charlie@example.com', status: 'checked in',department:'CSE' },
      ],
    },
    {
      eventId: '3',
      eventTitle: 'Event 3',
      registeredParticipants: [],
    },
    // Add more events with participants as needed
  ],
});
export const eventListState = atom<Event[]>({
  key: 'eventListState',
  default: [
    { id: '1', title: 'Event 1',  venue: 'Venue 1', cost: 'Free', start: '2024-01-18',  status: 'drafts' },
    { id: '2', title: 'Event 2',  venue: 'Venue 2', cost: 'Paid', start: '2024-09-19',  status: 'completed' },
    { id: '3', title: 'Event 3', venue: 'Venue 3', cost: 'Free', start: '2024-09-20',  status: 'ongoing' },
    { id: '4', title: 'Event 4', venue: 'Venue 4', cost: 'Paid', start: '2024-05-21',  status: 'completed' },
    { id: '5', title: 'Event 5', venue: 'Venue 5', cost: 'Free', start: '2024-09-22',  status: 'completed' },
    { id: '6', title: 'Event 6',  venue: 'Venue 6', cost: 'Free', start: '2024-09-18',  status: 'ongoing' },
    { id: '7', title: 'Event 7', venue: 'Venue 7', cost: 'Paid', start: '2024-02-9',  status: 'completed' },
    { id: '8', title: 'Event 8',  venue: 'Venue 8', cost: 'Free', start: '2024-09-2',  status: 'ongoing' },
    { id: '9', title: 'Event 9',  venue: 'Venue 9', cost: 'Paid', start: '2024-12-1',  status: 'upcoming' },
    { id: '10', title: 'Event 10', venue: 'Venue 10', cost: 'Free', start: '2024-09-22',  status: 'completed' },
  ], 
});


export const yearFilterState = atom<number>({
  key: 'yearFilterState',
  default: new Date().getFullYear(),
});
export const selectedDateState = atom<string>({
  key: 'selectedDateState',
  default: '', // Default date can be empty or a specific date string
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
    const activeTab = get(activeTabState); // Get the active tab state

    const currentDate = new Date();

    return eventList.filter((event) => {
      const matchesTitle = event.title.toLowerCase().includes(filter.toLowerCase());
      const matchesCost = !costFilter || event.cost === costFilter;

      // Update the date filtering logic
      const matchesDate =
        !dateFilter ||
        (dateFilter === 'past' && new Date(event.start) < currentDate) ||
        (dateFilter === 'upcoming' && new Date(event.start) >= currentDate);

      // Update the event status filtering logic
      const matchesStatus =
        activeTab === 'all' ||
        (activeTab === 'ongoing' && event.status === 'ongoing') ||
        (activeTab === 'completed' && event.status === 'completed') ||
        (activeTab === 'drafts' && event.status === 'drafts');

      return matchesTitle && matchesCost && matchesDate && matchesStatus;
    });
  },
});
