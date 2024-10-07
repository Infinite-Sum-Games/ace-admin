import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { filteredEventListState,selectedDateState,yearFilterState,} from "@/atoms/eventState";
import { EventType } from "@/types/type";
import {Table,TableBody,TableHead,TableHeader,TableRow,TableCell} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Eye, Info, Edit } from "lucide-react";
import {Tooltip,TooltipContent,TooltipProvider,TooltipTrigger,}from "@/components/ui/tooltip";
import { useNavigate } from "react-router-dom";

interface EventsTableProps {
  eventType: EventType;
}

const EventsTable: React.FC<EventsTableProps> = ({ eventType }) => {
  const [selectedDate, setSelectedDate] = useRecoilState(selectedDateState);
  const [selectedYear, setSelectedYear] = useRecoilState(yearFilterState);
  const allEvents = useRecoilValue(filteredEventListState);
  const [editEventId, setEditEventId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility

  const filteredEventsYear = selectedYear
    ? allEvents.filter((event) => {
        const eventYear = new Date(event.start).getFullYear();
        return eventYear === selectedYear;
      })
    : allEvents;

  const filteredEvents = filteredEventsYear.filter((event) => {
    const isMatchingDate = selectedDate ? event.start === selectedDate : true;
    const isMatchingStatus = event.status === eventType || eventType === "all";
    return isMatchingDate && isMatchingStatus;
  });

  const handleEdit = (id: string) => {
    setEditEventId(id);
    setIsModalOpen(true); // Open the modal when editing an event
  };

  const handleCloseModal = () => {
    setEditEventId(null);
    setIsModalOpen(false); // Close the modal
  };
  const Navigate = useNavigate();
  return (
    <>
      <div>
        <Table className="border-2 border-gray-800 rounded-2xl">
          <TableHeader>
            <TableRow className="h-20">
              <TableHead className="w-1/12 text-center py-4 text-gray text-lg">
                ID
              </TableHead>
              <TableHead className="w-1/12 text-center py-4 text-gray text-lg">
                Title
              </TableHead>
              <TableHead className="w-2/12 text-center py-4 text-gray text-lg">
                Venue
              </TableHead>
              <TableHead className="w-2/12 text-center py-4 text-gray text-lg">
                Cost
              </TableHead>
              <TableHead className="w-2/12 text-center py-4 text-gray text-lg">
                Start
              </TableHead>
              <TableHead className="w-2/12 text-center py-4 text-gray text-lg">
                Status
              </TableHead>
              <TableHead className="w-1/12 text-center py-4 text-gray text-lg">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event, index) => (
                <TableRow
                  key={event.id}
                  className={index % 2 === 0 ? "bg-accent" : ""}
                >
                  <TableCell className="w-1/12 text-center py-8 text-m">
                    {event.id}
                  </TableCell>
                  <TableCell className="w-2/12 text-center py-8 text-m">
                    <div className="font-medium">{event.title}</div>
                  </TableCell>
                  <TableCell className="w-2/12 text-center py-8 text-m">
                    {event.venue}
                  </TableCell>
                  <TableCell className="w-2/12 text-center py-8 text-m">
                    <Badge
                      className={`text-xs border-2 ${
                        event.cost === "Paid"
                          ? "border-[#5e4b8b] text-[#ab7df8] bg-[#2b2a43]"
                          : "border-[#a6a6a6] text-[#a6a6a6] bg-accent"
                      }`}
                      variant="secondary"
                    >
                      {event.cost === "Paid" ? "Paid" : "Free"}
                    </Badge>
                  </TableCell>
                  <TableCell className="w-2/12 text-center py-8 text-m">
                    {event.start}
                  </TableCell>
                  <TableCell className="w-2/12 text-center py-8 text-m">
                    <Badge
                      className={`w-20 h-8 text-xs rounded-full ${
                        event.status === "completed"
                          ? "border-2 border-[#215c33] text-[#3fb950] bg-[#192f28] text-center "
                          : event.status === "ongoing"
                          ? "border-2 border-[#254f88] text-[#4493f8] bg-[#192639] text-center w-16 h-8"
                          : event.status === "upcoming"
                          ? "border-2 border-[#674c17] text-[#d29922] bg-[#2e2a1f] text-center"
                          : event.status === "drafts"
                          ? "border-2 border-[#6c6c6c] text-[#b3b3b3] bg-[#2f2f2f] text-center w-14 h-8"
                          : "bg-gray-200 text-gray-800 text-center"
                      }`}
                      variant="secondary"
                    >
                      {event.status}
                    </Badge>
                  </TableCell>

                  <TableCell className="w-1/12 py-8 text-center text-m flex justify-around">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <button
                            onClick={() => handleEdit(event.id)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <Edit className="w-6 h-6" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Edit Event</p>
                        </TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger>
                          <button
                            className="text-blue-600 hover:text-blue-800 mx-2"
                            onClick={() => Navigate("/events/analytics")}
                          >
                            <Eye className="w-6 h-6" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>View Event</p>
                        </TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger>
                          <button className="text-blue-600 hover:text-blue-800">
                            <Info className="w-6 h-6" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Event Info</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-4">
                  No events found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default EventsTable;
