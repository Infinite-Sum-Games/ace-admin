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

const events = [
  {
    title: "Annual Gala",
    venue: "City Hall",
    time: "2024-12-15T19:00:00",
    paid: true,
    amount: 100,
    participants: 250,
    status: "Upcoming",
  },
  {
    title: "Monthly Workshop",
    venue: "Community Center",
    time: "2024-09-10T10:00:00",
    paid: false,
    amount: null,
    participants: 80,
    status: "Ongoing",
  },
  {
    title: "Networking Event",
    venue: "Downtown Café",
    time: "2024-10-05T18:00:00",
    paid: false,
    amount: null,
    participants: 150,
    status: "Upcoming",
  },
  {
    title: "Annual Conference",
    venue: "Convention Center",
    time: "2024-11-20T09:00:00",
    paid: true,
    amount: 150,
    participants: 500,
    status: "Completed",
  },
  {
    title: "Charity Auction",
    venue: "Local Park",
    time: "2024-08-30T15:00:00",
    paid: true,
    amount: 50,
    participants: 100,
    status: "Completed",
  },
  {
    title: "Fundraising Dinner",
    venue: "Hotel Ballroom",
    time: "2024-07-25T19:00:00",
    paid: true,
    amount: 75,
    participants: 200,
    status: "Completed",
  },
];

export default function EventsTable() {
  return (
    <Card className="border-[hsl(var(--border))]">
      <CardHeader className="px-7 flex flex-row justify-between items-center">
        <div className="pb-1.5">
          <CardTitle>Recent Events</CardTitle>
          <CardDescription className="pt-1.5">
            Upcoming and past events in your club.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Event Title</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Participants</TableHead>
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
                    className="text-xs"
                    variant={event.paid ? "secondary" : "outline"}
                  >
                    {event.paid ? "Paid" : "Free"}
                  </Badge>
                </TableCell>
                <TableCell>{event.status}</TableCell>
                <TableCell>
                  {new Date(event.time).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  {event.participants}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
