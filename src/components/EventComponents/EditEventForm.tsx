import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { eventListState } from '@/atoms/eventState';
interface EditEventFormProps {
  eventId: string;
  onClose: () => void;
}

const EditEventForm: React.FC<EditEventFormProps> = ({ eventId, onClose }) => {
  const [eventList, setEventList] = useRecoilState(eventListState);
  const eventToEdit = eventList.find(event => event.id === eventId);

  const [title, setTitle] = useState(eventToEdit?.title || '');
  const [venue, setVenue] = useState(eventToEdit?.venue || '');
  const [cost, setCost] = useState(eventToEdit?.cost || '');
  const [start, setStart] = useState(eventToEdit?.start || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEventList(prevList =>
      prevList.map(event =>
        event.id === eventId
          ? { ...event, title, venue, cost, start }
          : event
      )
    );
    onClose();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-70">
      <div className="bg-black text-white p-8 rounded-lg shadow-lg w-1/2 max-w-4xl">
        <h2 className="text-2xl font-semibold mb-4">Edit Event</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-300">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-700 rounded-md bg-gray-800 text-white"
            />
          </div>
  
          <div className="mb-4">
            <label className="block text-gray-300">Venue</label>
            <input
              type="text"
              value={venue}
              onChange={(e) => setVenue(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-700 rounded-md bg-gray-800 text-white"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300">Cost</label>
            <input
              type="text"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-700 rounded-md bg-gray-800 text-white"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300">Start Date</label>
            <input
              type="date"
              value={start}
              onChange={(e) => setStart(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-700 rounded-md bg-gray-800 text-white"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEventForm;
