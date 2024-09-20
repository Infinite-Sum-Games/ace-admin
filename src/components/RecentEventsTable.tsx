import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { TicketCheckIcon } from "lucide-react";

type Event = {
  title: string;
  venue: string;
  time: string;
  paid: boolean;
  amount: number | null;
  status: string;
};

const events = [
  {
    title: "Annual Gala",
    venue: "City Hall",
    time: "2024-12-15T19:00:00",
    paid: true,
    amount: 100,
    status: "Upcoming",
  },
  {
    title: "Monthly Workshop",
    venue: "Community Center",
    time: "2024-09-10T10:00:00",
    paid: false,
    amount: null,
    status: "Ongoing",
  },
  {
    title: "Networking Event",
    venue: "Downtown Café",
    time: "2024-10-05T18:00:00",
    paid: false,
    amount: null,
    status: "Upcoming",
  },
  {
    title: "Annual Conference",
    venue: "Convention Center",
    time: "2024-11-20T09:00:00",
    paid: true,
    amount: 150,
    status: "Completed",
  },
  {
    title: "Charity Auction",
    venue: "Local Park",
    time: "2024-08-30T15:00:00",
    paid: true,
    amount: 50,
    status: "Completed",
  },
  {
    title: "Fundraising Dinner",
    venue: "Hotel Ballroom",
    time: "2024-07-25T19:00:00",
    paid: true,
    amount: 75,
    status: "Completed",
  },
];

export default function EventsTable() {
  const navigate = useNavigate();
  function goToEvents() {
    navigate("/events");
  }

  function eventStatus(event: Event): { className: string; variant: "outline" | "secondary" | "default" } {
    if (event.status === "Upcoming") {
      return { className: "border-2 border-[#215c33] text-[#3fb950] bg-[#192f28]", variant: "outline" }; 
    } else if (event.status === "Ongoing") {
      return { className: "border-2 border-[#674c17] text-[#d29922] bg-[#2e2a1f]", variant: "outline" }; 
    } else {
      return { className: "border-2 border-[#254f88] text-[#4493f8] bg-[#192639]", variant: "outline" };
    }       
  }

  return (
    <Card className="border-border">
      <CardHeader className="px-7 flex flex-row justify-between items-center">
        <div>
          <CardTitle>Recent Events</CardTitle>
          <CardDescription className="pt-1.5">
            Upcoming and past events in your club.
          </CardDescription>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="secondary"
            size="sm"
            className="hover:bg-primary" 
            onClick={goToEvents}
          >
            <TicketCheckIcon className="pr-1.5" />
            Events
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="px-4">Event Title</TableHead>
                <TableHead className="px-4">Type</TableHead>
                <TableHead className="px-4">Status</TableHead>
                <TableHead className="px-4 text-right">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events.map((event, index) => (
                <TableRow
                  key={index}
                  className={index % 2 === 0 ? "bg-accent" : ""}
                >
                  <TableCell>
                    <div className="font-medium">{event.title}</div>
                    <div className="text-sm text-muted-foreground">
                      {event.venue}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={`text-xs border-2 ${
                        event.paid
                          ? "border-[#5e4b8b] text-[#ab7df8] bg-[#2b2a43]"
                          : "border-[#3d444d] text-[#6b6b6b] bg-accent"
                      }`}
                      variant="secondary"
                    >
                      {event.paid ? "Paid" : "Free"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={`flex justify-center max-w-[5rem] font-normal ${eventStatus(event).className}`}
                      variant={eventStatus(event).variant}
                    >
                      {event.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {new Date(event.time).toLocaleDateString("en-IN", {
                      dateStyle: "medium",
                    })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
