import React, { useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { filteredEventListState, eventListState } from '@/atoms/eventState';
import { EventType } from '@/components/EventComponents/type';
import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from '@/components/ui/table';
import { IndianRupee,Calendar,Edit,Trash,Check } from 'lucide-react';
import EditEventForm from './EditEventForm';

interface EventsTableProps {
  eventType: EventType;
}

const EventsTable: React.FC<EventsTableProps> = ({ eventType }) => {
  const [eventList, setEventList] = useRecoilState(eventListState);
  const allEvents = useRecoilValue(filteredEventListState);
  const [editEventId, setEditEventId] = useState<string | null>(null);

  const filteredEvents = allEvents.filter(event => event.status === eventType || eventType === 'all');

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      setEventList(prevList => prevList.filter(event => event.id !== id));
    }
  };

  const handleEdit = (id: string) => {
    setEditEventId(id);
  };

  return (
    <>
      <Table className="w-full table-auto bg-black text-white">
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/10 py-4 text-gray text-lg">ID</TableHead>
            <TableHead className="w-1/6 py-4 text-gray text-lg">Title</TableHead>
            <TableHead className="w-1/6 py-4 text-gray text-lg">Organizer</TableHead>
            <TableHead className="w-1/6 py-4 text-gray text-lg">
              Venue 
            </TableHead>
            <TableHead className="w-1/6 py-4 text-gray text-lg">
              Cost <IndianRupee className="inline ml-2" />
            </TableHead>
            <TableHead className="w-1/6 py-4 text-gray text-lg">
              Start <Calendar className="inline ml-2" />
            </TableHead>
            <TableHead className="w-1/6 py-4 text-gray text-lg">
              Status
            </TableHead>
            <TableHead className="w-1/6 py-4 text-gray text-lg">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <TableRow key={event.id}>
                <TableCell className="py-8 text-m">{event.id}</TableCell>
                <TableCell className="py-8 text-m">{event.title}</TableCell>
                <TableCell className="py-8 text-m">{event.organizer}</TableCell>
                <TableCell className="py-8 text-m">{event.venue}</TableCell>
                <TableCell className="py-8 text-m">{event.cost}</TableCell>
                <TableCell className="py-8 text-m">{event.start}</TableCell>
                <TableCell className="py-8 text-m">
                  {event.status === 'completed' ? (
                    <>
                      {event.status} <Check className="inline ml-2 text-green-500" />
                    </>
                  ) : (
                    event.status
                  )}
                </TableCell>
                <TableCell className="py-8 text-m">
                  <button onClick={() => handleEdit(event.id)} className="mr-2 text-blue-500 hover:text-blue-700">
                    <Edit />
                  </button>
                  <button onClick={() => handleDelete(event.id)} className="text-red-500 hover:text-red-700">
                    <Trash />
                  </button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={9} className="text-center py-4">
                No events found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {editEventId && (
        <EditEventForm
          eventId={editEventId}
          onClose={() => setEditEventId(null)}
        />
      )}
    </>
  );
};

export default EventsTable;
