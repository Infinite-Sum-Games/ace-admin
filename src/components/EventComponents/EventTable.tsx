import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  filteredEventListState,
  selectedDateState,
  yearFilterState,
} from "@/atoms/eventState";
import { EventType } from "@/types/type";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Eye, Info, Edit } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useNavigate } from "react-router-dom";

interface EventsTableProps {
  eventType: EventType;
}

const EventsTable: React.FC<EventsTableProps> = ({ eventType }) => {
  const [selectedDate, setSelectedDate] = useRecoilState(selectedDateState);
  const [selectedYear, setSelectedYear] = useRecoilState(yearFilterState);
  const allEvents = useRecoilValue(filteredEventListState);
  const [editEventId, setEditEventId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    setIsModalOpen(true);
  };

  const Navigate = useNavigate();

  return (
    <div>
      <Table className="border-2 border-gray-800 rounded-xl text-sm">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[5%] text-center py-2">ID</TableHead>
            <TableHead className="w-[15%] text-center py-2">Title</TableHead>
            <TableHead className="w-[15%] text-center py-2">Venue</TableHead>
            <TableHead className="w-[10%] text-center py-2">Cost</TableHead>
            <TableHead className="w-[15%] text-center py-2">Start</TableHead>
            <TableHead className="w-[15%] text-center py-2">Status</TableHead>
            <TableHead className="w-[10%] text-center py-2">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event, index) => (
              <TableRow
                key={event.id}
                className={index % 2 === 0 ? "bg-accent" : ""}
              >
                <TableCell className="text-center py-6">{event.id}</TableCell>
                <TableCell className="text-center py-2 font-medium">
                  {event.title}
                </TableCell>
                <TableCell className="text-center py-6">
                  {event.venue}
                </TableCell>
                <TableCell className="text-center py-2">
                  <Badge
                    className={`text-xs border-2 ${
                      event.cost === "Paid"
                        ? "border-[#5e4b8b] text-[#ab7df8] bg-[#2b2a43]"
                        : "border-[#a6a6a6] text-[#a6a6a6] bg-accent"
                    }`}
                    variant="secondary"
                  >
                    {event.cost}
                  </Badge>
                </TableCell>
                <TableCell className="text-center py-6">
                  {event.start}
                </TableCell>
                <TableCell className="text-center py-6">
                  <Badge
                    className={`w-fit px-3 py-1 text-xs rounded-full ${
                      event.status === "completed"
                        ? "border-2 border-[#215c33] text-[#3fb950] bg-[#192f28]"
                        : event.status === "ongoing"
                        ? "border-2 border-[#254f88] text-[#4493f8] bg-[#192639]"
                        : event.status === "upcoming"
                        ? "border-2 border-[#674c17] text-[#d29922] bg-[#2e2a1f]"
                        : event.status === "drafts"
                        ? "border-2 border-[#6c6c6c] text-[#b3b3b3] bg-[#2f2f2f]"
                        : "bg-gray-200 text-gray-800"
                    }`}
                    variant="secondary"
                  >
                    {event.status}
                  </Badge>
                </TableCell>
                <TableCell className="py-6 text-center">
                  <div className="flex justify-center gap-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <button
                            onClick={() => handleEdit(event.id)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <Edit className="w-5 h-5" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Edit Event</p>
                        </TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger>
                          <button
                            onClick={() =>
                              Navigate(`/events/analytics/${event.id}`)
                            }
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <Eye className="w-5 h-5" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Event Analytics</p>
                        </TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger>
                          <button className="text-blue-600 hover:text-blue-800">
                            <Info className="w-5 h-5" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Event Info</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
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
  );
};

export default EventsTable;
