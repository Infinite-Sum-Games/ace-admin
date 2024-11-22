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
  department: string;
  ticketid: string;
  registeredDate: string;  // New field
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
        { id: '101', ticketid: '3030', name: 'Participant1', email: 'alice@example.com', status: 'checked in', department: 'CSE', registeredDate: '2024-09-26' },
        { id: '102', ticketid: '3030', name: 'Participant2', email: 'bob@example.com', status: 'not checked in', department: 'EEE', registeredDate: '2024-09-26' },
        { id: '103', ticketid: '3030', name: 'Participant3', email: 'alice@example.com', status: 'checked in', department: 'MEE', registeredDate: '2024-09-27' },
        { id: '105', ticketid: '3030', name: 'Participant4', email: 'bob@example.com', status: 'not checked in', department: 'CSE', registeredDate: '2024-09-26' },
        { id: '106', ticketid: '3030', name: 'Participant5', email: 'alice@example.com', status: 'checked in', department: 'CSE', registeredDate: '2024-09-27' },
        { id: '107', ticketid: '3030', name: 'Participant6', email: 'bob@example.com', status: 'not checked in', department: 'EEE', registeredDate: '2024-09-30' },
        { id: '108', ticketid: '3030', name: 'Participant7', email: 'alice@example.com', status: 'checked in', department: 'MEE', registeredDate: '2024-10-01' },
        { id: '109', ticketid: '3030', name: 'Participant8', email: 'bob@example.com', status: 'not checked in', department: 'CSE', registeredDate: '2024-10-01' },
        { id: '110', ticketid: '3030', name: 'Participant9', email: 'alice@example.com', status: 'checked in', department: 'CSE', registeredDate: '2024-10-01' },
        { id: '112', ticketid: '3030', name: 'Participant10', email: 'bob@example.com', status: 'not checked in', department: 'EEE', registeredDate: '2024-10-01' },
        { id: '113', ticketid: '3030', name: 'Participant11', email: 'alice@example.com', status: 'checked in', department: 'MEE', registeredDate: '2024-10-07' },
        { id: '114', ticketid: '3030', name: 'Participant12', email: 'bob@example.com', status: 'not checked in', department: 'CSE', registeredDate: '2024-10-05' },
        { id: '115', ticketid: '3030', name: 'Participant15', email: 'alice@example.com', status: 'checked in', department: 'CSE', registeredDate: '2024-10-07' },
        { id: '116', ticketid: '3030', name: 'Participant17', email: 'bob@example.com', status: 'not checked in', department: 'ARE', registeredDate: '2024-10-08' },
        { id: '117', ticketid: '3030', name: 'Participant21', email: 'alice@example.com', status: 'checked in', department: 'CSE', registeredDate: '2024-10-08' },
        { id: '118', ticketid: '3030', name: 'Participant32', email: 'bob@example.com', status: 'not checked in', department: 'CSE', registeredDate: '2024-10-09' },
      ],
    },
    {
      eventId: '2',
      eventTitle: 'Event 2',
      registeredParticipants: [
        { id: '103', ticketid: '3030', name: 'Charlie', email: 'charlie@example.com', status: 'checked in', department: 'CSE', registeredDate: '2024-09-30' },
      ],
    },
    {
      eventId: '3',
      eventTitle: 'Event 3',
      registeredParticipants: [
        { id: '103', ticketid: '3030', name: 'Participant3', email: 'alice@example.com', status: 'checked in', department: 'MEE', registeredDate: '2024-09-27' },
        { id: '105', ticketid: '3030', name: 'Participant4', email: 'bob@example.com', status: 'not checked in', department: 'CSE', registeredDate: '2024-09-26' },
        { id: '106', ticketid: '3030', name: 'Participant5', email: 'alice@example.com', status: 'checked in', department: 'CSE', registeredDate: '2024-09-27' },
        { id: '107', ticketid: '3030', name: 'Participant6', email: 'bob@example.com', status: 'not checked in', department: 'EEE', registeredDate: '2024-09-30' },
        { id: '108', ticketid: '3030', name: 'Participant7', email: 'alice@example.com', status: 'checked in', department: 'MEE', registeredDate: '2024-10-01' },
        { id: '109', ticketid: '3030', name: 'Participant8', email: 'bob@example.com', status: 'not checked in', department: 'CSE', registeredDate: '2024-10-01' },
      ],
    },
    {
      eventId: '4',
      eventTitle: 'Event 4',
      registeredParticipants: [
        { id: '1103', ticketid: '3030', name: 'Participant3', email: 'alice@example.com', status: 'checked in', department: 'MEE', registeredDate: '2024-12-27' },
        { id: '1105', ticketid: '3030', name: 'Participant4', email: 'bob@example.com', status: 'not checked in', department: 'CSE', registeredDate: '2024-12-7' },
        { id: '1106', ticketid: '3030', name: 'Participant5', email: 'alice@example.com', status: 'checked in', department: 'CSE', registeredDate: '2024-12-7' },
        { id: '1107', ticketid: '3030', name: 'Participant6', email: 'bob@example.com', status: 'not checked in', department: 'EEE', registeredDate: '2024-12-2' },
        { id: '1108', ticketid: '3030', name: 'Participant7', email: 'alice@example.com', status: 'checked in', department: 'MEE', registeredDate: '2024-12-7' },
        { id: '1109', ticketid: '3030', name: 'Participant8', email: 'bob@example.com', status: 'not checked in', department: 'CSE', registeredDate: '2024-12-2' },
      ],
    },
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
