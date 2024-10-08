import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { eventListState, eventRegistrationState } from "@/atoms/eventState";
import io from "socket.io-client";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";  // Importing ShadCN card components

interface Participant {
  department: string;
  id: string;
  name: string;
  status: string;
}

const EventAnalytics: React.FC = () => {
  const { eventId } = useParams();
  const events = useRecoilValue(eventListState);
  const eventRegistrations = useRecoilValue(eventRegistrationState);

  const event = events.find((e) => e.id === eventId);
  const registration = eventRegistrations.find((reg) => reg.eventId === eventId);
  const [participants, setParticipants] = useState<Participant[]>(registration?.registeredParticipants || []);

  useEffect(() => {
    const socket = io("http://localhost:4000");

    if (eventId) {
      socket.emit("joinEvent", eventId);

      socket.on("participantUpdate", (newParticipant: Participant) => {
        setParticipants((prevParticipants) => [...prevParticipants, newParticipant]);
      });

      socket.on("updateParticipantStatus", (updatedParticipant: Participant) => {
        setParticipants((prevParticipants) =>
          prevParticipants.map((participant) =>
            participant.id === updatedParticipant.id ? updatedParticipant : participant
          )
        );
      });
    }

    return () => {
      socket.disconnect();
    };
  }, [eventId]);

  const handleStatusChange = (participantId: string, isCheckedIn: boolean) => {
    setParticipants((prevParticipants) =>
      prevParticipants.map((participant) =>
        participant.id === participantId ? { ...participant, status: isCheckedIn ? "checked in" : "not checked in" } : participant
      )
    );

    const socket = io("http://localhost:4000");
    socket.emit("updateParticipantStatus", { id: participantId, status: isCheckedIn ? "checked in" : "not checked in" });
  };

  if (!event) {
    return <div className="text-white">Event not found</div>;
  }

  const checkedInCount = participants.filter((participant) => participant.status === "checked in").length;

  return (
    <div className="p-8 bg-[hsl(var(--background))] rounded-lg text-white h-screen flex flex-col">
      {/* Flex container for the two cards at the top */}
      <div className="flex justify-between mb-8">
        {/* Event Title Card */}
        <Card className="w-1/2 mr-4">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Event: {event.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p><strong>Venue:</strong> {event.venue}</p>
            <p><strong>Cost:</strong> {event.cost}</p>
            <p><strong>Start Date:</strong> {event.start}</p>
            <p><strong>Status:</strong> {event.status}</p>
          </CardContent>
        </Card>

        {/* Participant Count Card */}
        <Card className="w-1/4">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Participants</CardTitle>
          </CardHeader>
          <CardContent>
            <p><strong>Total Participants:</strong> {participants.length}</p>
            <p><strong>Checked In Participants:</strong> {checkedInCount}</p>
          </CardContent>
        </Card>
      </div>

      {/* Table for participants below */}
      <div className="flex-1 overflow-auto">
        {participants.length > 0 ? (
          <Table className="w-full text-white border-collapse table-fixed">
            <TableHeader>
              <TableRow className="border-b border-gray-600">
                <TableHead className="py-3 px-4 text-left">Name</TableHead>
                <TableHead className="py-3 px-4 text-left">Department</TableHead>
                <TableHead className="py-3 px-4 text-left">Status</TableHead>
                <TableHead className="py-3 px-4 text-left">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {participants.map((participant, index) => (
                <TableRow key={participant.id} className={`hover:bg-[hsl(var(--hover))] ${index % 2 === 0 ? 'bg-[hsl(var(--even))]' : ''}`}>
                  <TableCell className="py-3 px-4">{participant.name}</TableCell>
                  <TableCell className="py-3 px-4">{participant.department}</TableCell>
                  <TableCell className="py-3 px-4">{participant.status}</TableCell>
                  <TableCell className="py-3 px-4">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={participant.status === "checked in"}
                        onChange={(e) => handleStatusChange(participant.id, e.target.checked)}
                        className="mr-2 h-4 w-4 rounded focus:ring-2 focus:ring-[hsl(var(--primary))]"
                      />
                      <span>Checked In</span>
                    </label>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p className="text-center">No participants yet</p>
        )}
      </div>
    </div>
  );
};

export default EventAnalytics;
