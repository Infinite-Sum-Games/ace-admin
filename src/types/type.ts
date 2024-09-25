export interface Event {
    id: string;
    title: string;
    venue: string;
    cost: string;
    start: string;
  
    status: 'ongoing' | 'completed' | 'all' | 'drafts' |'upcoming';
  }
  
  export type EventType = 'ongoing' | 'completed' | 'all' | 'drafts'|'upcoming';
  