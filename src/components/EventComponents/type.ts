export interface Event {
    id: string;
    title: string;
    organizer: string;
    venue: string;
    cost: string;
    start: string;

    status: 'ongoing' | 'completed' | 'all';
  }
  
  export type EventType = 'ongoing' | 'completed' | 'all';
  