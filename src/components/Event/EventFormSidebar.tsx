import { createSignal } from 'solid-js';
import { Component } from 'solid-js';

interface Event {
  id: number;
  name: string;
  date: string;
  time: string;
  venue: string;
  content: string;
  status: 'completed/terminated' | 'in progress' | 'upcoming' | 'draft';
}

const EventFormSidebar: Component<{
  isOpen: boolean;
  onClose: () => void;
  onPublish: (event: Event) => void;
  onSaveDraft: (event: Event) => void;
}> = (props) => {
  const [name, setName] = createSignal('');
  const [content, setContent] = createSignal('');
  const [date, setDate] = createSignal('');
  const [time, setTime] = createSignal('');
  const [venue, setVenue] = createSignal('');

  const createEvent = (status: 'upcoming' | 'draft'): Event => ({
    id: Math.floor(Math.random() * 1000),
    name: name(),
    content: content(),
    date: date(),
    time: time(),
    venue: venue(),
    status,
  });

  const handlePublish = () => {
    const newEvent = createEvent('upcoming');
    props.onPublish(newEvent);
    resetForm();
    props.onClose();
  };

  const handleSaveDraft = () => {
    const newEvent = createEvent('draft');
    props.onSaveDraft(newEvent);
    resetForm();
    props.onClose();
  };

  const resetForm = () => {
    setName('');
    setContent('');
    setDate('');
    setTime('');
    setVenue('');
  };

  return (
    <div class={`formSidebar ${props.isOpen ? 'active open' : ''}`}>
      <h2>Add Event</h2>
      <input type="text" placeholder="Event Name" value={name()} onInput={(e) => setName(e.currentTarget.value)} />
      <input type="date" placeholder="Date" value={date()} onInput={(e) => setDate(e.currentTarget.value)} />
      <input type="text" placeholder="Time" value={time()} onInput={(e) => setTime(e.currentTarget.value)} />
      <input type="text" placeholder="Venue" value={venue()} onInput={(e) => setVenue(e.currentTarget.value)} />
      <textarea placeholder="Description" value={content()} onInput={(e) => setContent(e.currentTarget.value)}></textarea>
      <button onClick={props.onClose} style="margin-right: 40.7%; margin-bottom: 5%;">Close</button>
      <button onClick={handleSaveDraft}>Save Draft</button>
      <button onClick={handlePublish} style="margin-left: 59%;">Publish Event</button>
    </div>
  );
};

export default EventFormSidebar;
