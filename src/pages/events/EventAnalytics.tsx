import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { eventListState, eventRegistrationState } from "@/atoms/eventState";
import io from "socket.io-client";
import { Button } from "@/components/ui/button";
import {
  Search,
  ChevronDown,
  Filter,
  ChevronRight,
  ChevronLeft,
  TrendingUp,
  FileText,
  Clock,
  DollarSign,
  MapPin,
} from "lucide-react"; // Importing the necessary icons
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Label,
  LabelList,
  Line,
  LineChart,
  Pie,
  PieChart,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { CheckCircle, UserPlus, UserX } from "lucide-react"; // Importing icons
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
interface Participant {
  ticketid: string;
  department: string;
  id: string;
  name: string;
  status: string;
}

import Sidebar from "@/components/Sidebar";
import { RegistrationLineChart } from "@/components/EventComponents/RegistrationLineChart";
const MyRadialBarChartComponent = () => {
  // Assuming you have `registeredCount` and `checkedInCount` available from props, state, or API
  const registeredCount = 100; // replace with actual value or state
  const checkedInCount = 75; // replace with actual value or state

  // Declare chartData after defining the counts
  const chartData = [
    { name: "Registered", count: registeredCount },
    { name: "Checked In", count: checkedInCount },
  ];
};

const getDepartmentData = (participants: Participant[]) => {
  const departmentCount: { [key: string]: number } = {};

  participants.forEach((participant) => {
    departmentCount[participant.department] =
      (departmentCount[participant.department] || 0) + 1;
  });

  return Object.entries(departmentCount).map(([name, count]) => ({
    name,
    count,
  }));
};

const EventAnalytics: React.FC = () => {
  // Define colors for the pie chart segments
  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#FF5678",
    "#B66DFF",
    "#cc1d3a",
  ];
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(
    null
  );
  const { eventId } = useParams();
  const events = useRecoilValue(eventListState);
  const eventRegistrations = useRecoilValue(eventRegistrationState);

  const event = events.find((e) => e.id === eventId);
  const registration = eventRegistrations.find(
    (reg) => reg.eventId === eventId
  );
  const [participants, setParticipants] = useState<Participant[]>(
    registration?.registeredParticipants || []
  );

  const departments = Array.from(
    new Set(participants.map((p) => p.department))
  );
  const filteredParticipants = participants.filter((participant) => {
    const matchesSearch =
      participant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      participant.department.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = selectedStatus
      ? participant.status === selectedStatus
      : true;

    const matchesDepartment = selectedDepartment
      ? participant.department === selectedDepartment
      : true;

    return matchesSearch && matchesStatus && matchesDepartment;
  });
  const departmentData = getDepartmentData(participants);
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Define how many items to show per page

  useEffect(() => {
    const socket = io("http://localhost:4000");

    if (eventId) {
      socket.emit("joinEvent", eventId);

      socket.on("participantUpdate", (newParticipant: Participant) => {
        setParticipants((prevParticipants) => [
          ...prevParticipants,
          newParticipant,
        ]);
      });

      socket.on(
        "updateParticipantStatus",
        (updatedParticipant: Participant) => {
          setParticipants((prevParticipants) =>
            prevParticipants.map((participant) =>
              participant.id === updatedParticipant.id
                ? updatedParticipant
                : participant
            )
          );
        }
      );
    }

    return () => {
      socket.disconnect();
    };
  }, [eventId]);

  const handleStatusChange = (participantId: string, isCheckedIn: boolean) => {
    setParticipants((prevParticipants) =>
      prevParticipants.map((participant) =>
        participant.id === participantId
          ? {
              ...participant,
              status: isCheckedIn ? "checked in" : "not checked in",
            }
          : participant
      )
    );

    const socket = io("http://localhost:4000");
    socket.emit("updateParticipantStatus", {
      id: participantId,
      status: isCheckedIn ? "checked in" : "not checked in",
    });
  };

  if (!event) {
    return <div className="text-white">Event not found</div>;
  }

  const checkedInCount = participants.filter(
    (participant) => participant.status === "checked in"
  ).length;

  // Bar chart data for registered vs checked-in participants
  const chartData = [
    { name: "Registered", count: participants.length },
    { name: "Checked In", count: checkedInCount },
  ];

  // Chart config
  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "hsl(var(--chart-1))",
    },
  };

  // Pagination Logic
  const totalPages = Math.ceil(filteredParticipants.length / itemsPerPage);
  const indexOfLastParticipant = currentPage * itemsPerPage;
  const indexOfFirstParticipant = indexOfLastParticipant - itemsPerPage;
  const currentParticipants = filteredParticipants.slice(
    indexOfFirstParticipant,
    indexOfLastParticipant
  );
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="min-h-screen flex bg-[hsl(var(--background))] text-[hsl(var(--foreground))] ">
      <Sidebar /> {/* Placing Sidebar here on the left side */}
      <div className="flex-1 flex flex-col p-8">
        {" "}
        {/* Using flex-1 to take the remaining space */}
        <Tabs defaultValue="participants">
          <TabsList className="mb-4">
            <TabsTrigger value="participants">Participants</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          {/* Parent container for heading + participants card and table + chart */}
          <div className="flex flex-col space-x-8">
            <TabsContent value="participants">
              {" "}
              {/* Flex container for horizontal alignment */}
              {/* Left container for heading and table */}
              <div className="flex flex-col flex-1">
                {" "}
                {/* Flex column for heading and table */}
                <h1 className="text-4xl font-bold mb-2">{event.title}</h1>{" "}
                {/* Flex container with spacing */}
                <div className="mt-5 flex items-center justify-between space-x-4 mb-4 w-full">
                  {/* Flex container for input and dropdown, full width */}

                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-2.5 text-gray-500 transition duration-300 ease-in-out transform hover:scale-110" />
                    <input
                      type="text"
                      placeholder="Search participants..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="bg-gray-900 w-full md:w-1/3 pl-10 pr-4 py-3 rounded-lg border border-gray-600 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out placeholder:text-gray-400"
                    />
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <button className="h-[40px] flex items-center space-x-2 px-4 py-2 bg-gray-900 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300 ease-in-out">
                        <Filter className="text-gray-400" /> {/* Filter icon */}
                        <span className="font-medium">
                          {selectedStatus ? selectedStatus : "Filter by Status"}
                        </span>
                        <ChevronDown className="text-gray-400 transition-transform duration-200 transform hover:scale-105" />
                      </button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent className="bg-gray-900 border border-gray-700 rounded-md shadow-lg mt-2 z-50 divide-y divide-gray-700">
                      <DropdownMenuItem
                        className="px-4 py-2 hover:bg-gray-800 flex items-center space-x-2 cursor-pointer transition duration-200"
                        onClick={() => setSelectedStatus(null)}
                      >
                        <span>All</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="px-4 py-2 hover:bg-gray-800 flex items-center space-x-2 cursor-pointer transition duration-200"
                        onClick={() => setSelectedStatus("checked in")}
                      >
                        <span>Checked In</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="px-4 py-2 hover:bg-gray-800 flex items-center space-x-2 cursor-pointer transition duration-200"
                        onClick={() => setSelectedStatus("not checked in")}
                      >
                        <span>Not Checked In</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                {/* Event Title Heading */}
                {/* Participants Table */}
                <div className="border border-1 rounded border-gray-700 xl">
                  {participants.length > 0 ? (
                    <Table className="w-full text-[hsl(var(--foreground))]">
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-1/12 text-center font-semibold py-4">
                            ParticipantID
                          </TableHead>
                          <TableHead className="w-3/12 text-center font-semibold py-4">
                            Name
                          </TableHead>
                          <TableHead className="w-1/12 text-center font-semibold py-4">
                            Ticket ID
                          </TableHead>
                          <TableHead className="w-1/8 text-center font-semibold py-4">
                            Department
                          </TableHead>
                          <TableHead className="w-1/8 text-center font-semibold py-4">
                            Status
                          </TableHead>
                          <TableHead className="w-1/8 text-center font-semibold py-4">
                            Actions
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {currentParticipants.map((participant) => (
                          <TableRow
                            key={participant.id}
                            className={`hover:bg-gray-700 transition duration-300 ${
                              participant.status === "checked in"
                                ? "bg-gray-800"
                                : "bg-gray-900"
                            }`}
                          >
                            <TableCell className="text-center py-4 px-6">
                              {participant.id}
                            </TableCell>
                            <TableCell className="text-center py-4 px-6">
                              {participant.name}
                            </TableCell>
                            <TableCell className="text-center py-4 px-6">
                              {participant.ticketid}
                            </TableCell>
                            <TableCell className="text-center py-4 px-6">
                              {participant.department}
                            </TableCell>
                            <TableCell className="text-center py-4 px-6">
                              {participant.status === "checked in" ? (
                                <span className="flex justify-center items-center text-green-500">
                                  <CheckCircle className="mr-1" />
                                  {participant.status}
                                </span>
                              ) : (
                                <span className="flex justify-center items-center text-red-500">
                                  <UserX className="mr-1" />
                                  {participant.status}
                                </span>
                              )}
                            </TableCell>
                            <TableCell className="text-center py-4 px-6">
                              <label className="flex justify-center items-center space-x-2">
                                <input
                                  type="checkbox"
                                  checked={participant.status === "checked in"}
                                  onChange={(e) =>
                                    handleStatusChange(
                                      participant.id,
                                      e.target.checked
                                    )
                                  }
                                  className="h-4 w-4 rounded focus:ring-2 focus:ring-[hsl(var(--primary))] accent-[hsl(var(--primary))]"
                                />
                                <span>Checked In</span>
                              </label>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <p className="text-center text-gray-400">
                      No participants yet
                    </p>
                  )}
                </div>
                {/* Pagination Controls */}
                <div className="flex justify-center items-center mt-6 space-x-4">
                  {/* Previous Button */}
                  <Button
                    variant="secondary"
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1}
                    className={`flex items-center justify-center p-3 bg-transparent text-white rounded-full transition duration-300 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))] ${
                      currentPage === 1
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-[hsl(var(--primary-dark))] hover:shadow-lg"
                    }`}
                    aria-label="Previous Page"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </Button>

                  {/* Page Information */}
                  <span className="text-white text-lg">
                    Page {currentPage} of {totalPages}
                  </span>

                  {/* Next Button */}
                  <Button
                    variant="secondary"
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                    className={`flex items-center justify-center p-3 bg-transparent text-white rounded-full transition duration-300 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))] ${
                      currentPage === totalPages
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-[hsl(var(--primary-dark))] hover:shadow-lg"
                    }`}
                    aria-label="Next Page"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </TabsContent>
          </div>
          <TabsContent
            value="analytics"
            className="bg-[hsl(var(--background))] min-h-screen"
          >
            <h2 className="text-4xl mb-6 font-semibold text-center">
              {event.title} Analytics
            </h2>

            <div className="grid grid-cols-4 gap-x-4 gap-y-6 w-full h-auto">
              {/* Event Data Card */}
              <Card className="shadow-lg border border-gray-700 rounded-lg flex flex-col col-span-2">
                <CardHeader className="flex items-center border-b border-gray-600 p-4">
                  <CardTitle className="text-lg font-semibold text-[hsl(var(--text-primary))] flex items-center ">
                    Event Data
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-4 p-6 text-[hsl(var(--text-secondary))] text-sm">
                  <p className="flex items-center space-x-2">
                    <FileText className="w-5 h-5 text-[hsl(var(--text-primary))]" />
                    <strong className="text-[hsl(var(--text-primary))]">
                      Event Name:
                    </strong>
                    <span>{event?.title || "N/A"}</span>
                  </p>
                  <p className="flex items-center space-x-2">
                    <MapPin className="w-5 h-5 text-[hsl(var(--text-primary))]" />
                    <strong className="text-[hsl(var(--text-primary))]">
                      Venue:
                    </strong>
                    <span>{event?.venue || "N/A"}</span>
                  </p>
                  <p className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-[hsl(var(--text-primary))]" />
                    <strong className="text-[hsl(var(--text-primary))]">
                      Start Time:
                    </strong>
                    <span>{event?.start || "N/A"}</span>
                  </p>
                  <p className="flex items-center space-x-2">
                    <DollarSign className="w-5 h-5 text-[hsl(var(--text-primary))]" />
                    <strong className="text-[hsl(var(--text-primary))]">
                      Cost:
                    </strong>
                    <span>{event?.cost ? `${event.cost}` : "N/A"}</span>
                  </p>
                  <p className="flex items-center space-x-2">
                    <UserX className="w-5 h-5 text-[hsl(var(--text-primary))]" />
                    <strong className="text-[hsl(var(--text-primary))]">
                      Registrations:
                    </strong>
                    <span>{participants.length}</span>
                  </p>
                  <p className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-[hsl(var(--text-primary))]" />
                    <strong className="text-[hsl(var(--text-primary))]">
                      Attendees:
                    </strong>
                    <span>{checkedInCount}</span>
                  </p>
                </CardContent>
              </Card>

              {/* Total Registrations Card */}
              <Card className="shadow-lg border border-gray-700 rounded-lg flex flex-col">
                <CardHeader className="flex items-center justify-between p-3 border-b border-gray-600">
                  <CardTitle className="text-lg font-semibold text-[hsl(var(--text-primary))]">
                    <div className="flex items-center">
                      <UserPlus className="mr-2 " />
                      Total Registrations
                      {/* Registered icon */}
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex justify-center items-center p-6">
                  <h3 className="text-5xl font-bold text-[hsl(var(--text-primary))] ">
                    {participants.length}
                  </h3>
                </CardContent>
                <CardFooter className="text-center text-sm p-2 text-[hsl(var(--text-secondary))]">
                  Total number of registrations for this Event.
                </CardFooter>
              </Card>

              {/* Total Checked In Card */}
              <Card className="shadow-lg border border-gray-700 rounded-lg flex flex-col">
                <CardHeader className="flex items-center justify-between p-3 border-b border-gray-600">
                  <CardTitle className="text-lg font-semibold text-[hsl(var(--text-primary))]">
                    <div className="flex items-center">
                      <CheckCircle className="mr-2  " />
                      Total Attendees
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex justify-center items-center p-6">
                  <h3 className="text-5xl font-bold text-[hsl(var(--text-primary))]">
                    {checkedInCount}
                  </h3>
                </CardContent>
                <CardFooter className="text-center text-sm p-2 text-[hsl(var(--text-secondary))]">
                  Total number of Attendees For this Event
                </CardFooter>
              </Card>

              <Card className="shadow-lg border border-gray-700 rounded-lg flex flex-col h-[500px]">
                {" "}
                {/* Set a fixed height */}
                <CardHeader className="items-center">
                  <CardTitle>Department Distribution</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 pb-0 flex flex-col items-center ">
                  {" "}
                  {/* Use justify-between to space out the chart and legend */}
                  <ChartContainer
                    config={chartConfig}
                    className="mx-auto h-full w-full"
                  >
                    <PieChart width={300} height={300}>
                      {" "}
                      {/* Set width and height to fill the card */}
                      <Pie
                        data={departmentData}
                        dataKey="count"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={120} // Adjust outerRadius for a better fit
                        fill="#8884d8"
                        label
                      >
                        {departmentData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                    </PieChart>
                  </ChartContainer>
                  {/* Legend Section */}
                  <div className="flex flex-wrap justify-center max-h-[120px] mb-2">
                    {" "}
                    {/* Allow wrapping and add bottom margin */}
                    {departmentData.map((entry, index) => (
                      <div
                        key={`legend-${index}`}
                        className="flex items-center mb-2 mx-2"
                      >
                        {" "}
                        {/* Add margin for spacing */}
                        <div
                          className="w-4 h-4 mr-1" // Adjusted margin to make it tighter
                          style={{
                            backgroundColor: COLORS[index % COLORS.length],
                          }} // Color box
                        ></div>
                        <span className="text-sm text-[hsl(var(--text-secondary))]">
                          {entry.name} ({entry.count})
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border border-gray-700 rounded-lg flex flex-col h-[500px] overflow-hidden">
                <CardHeader className="items-center p-4">
                  <CardTitle className="text-2xl font-semibold text-[hsl(var(--text-primary))] pb-1">
                    Event Participants
                  </CardTitle>
                  <CardDescription className="text-sm text-[hsl(var(--text-secondary))] pb-0">
                    Registrations vs Attendees
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 pb-0 flex flex-col items-center justify-center">
                  <ChartContainer
                    config={chartConfig}
                    className="mx-auto h-full w-full"
                  >
                    <RadialBarChart
                      data={chartData} // Ensure this data has keys for 'registrations' and 'attendees'
                      startAngle={90}
                      endAngle={450}
                      innerRadius={120}
                      outerRadius={150}
                      width={300}
                      height={300}
                    >
                      <PolarGrid radialLines={false} />
                      <RadialBar
                        dataKey="count"
                        background
                        cornerRadius={20}
                        fill="hsl(var(--primary))"
                      >
                        <LabelList
                          position="insideEnd"
                          dataKey="count"
                          content={() => (
                            <g>
                              {/* Display Registrations count */}
                              <text
                                style={{
                                  fill: "#c0c6cf",
                                  fontWeight: "light",
                                  fontSize: "1.25rem",
                                }}
                                textAnchor="end" // Align to the end for the first value
                                dominantBaseline="middle"
                                x={130} // Adjust as necessary for positioning
                                y={170} // Center vertically
                              >
                                {participants.length}{" "}
                                {/* Total Registrations */}
                              </text>

                              {/* Display Ratio Symbol */}
                              <text
                                style={{
                                  fill: "#c0c6cf",
                                  fontWeight: "light",
                                  fontSize: "1.25rem",
                                }}
                                textAnchor="middle" // Center the ratio symbol
                                dominantBaseline="middle"
                                x={145} // Centered for the ratio symbol
                                y={170} // Center vertically
                              >
                                {"/"} {/* Ratio symbol */}
                              </text>

                              {/* Display Attendees count */}
                              <text
                                style={{
                                  fill: "#c0c6cf",
                                  fontWeight: "light",
                                  fontSize: "1.25rem",
                                }}
                                textAnchor="start" // Align to the start for the second value
                                dominantBaseline="middle"
                                x={160} // Adjust as necessary for positioning
                                y={170} // Center vertically
                              >
                                {checkedInCount} {/* Total Attendees */}
                              </text>
                            </g>
                          )}
                        />
                      </RadialBar>
                      <PolarRadiusAxis
                        tick={false}
                        tickLine={false}
                        axisLine={false}
                      />
                    </RadialBarChart>
                  </ChartContainer>
                </CardContent>
                <CardFooter className="flex justify-between items-center p-4 bg-transparent text-white">
                  <div className="flex items-center">
                    <UserPlus className="mr-1 text-green-500" />{" "}
                    {/* Registered icon */}
                    <span className="text-sm text-green-500">
                      Registrations: <strong>{participants.length}</strong>
                    </span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="mr-1  text-red-500" />{" "}
                    {/* Checked In icon */}
                    <span className="text-sm text-red-500">
                      Attendees: <strong>{checkedInCount}</strong>
                    </span>
                  </div>
                </CardFooter>
              </Card>

              {/* Participants Registration Trend Card */}
              <Card className="shadow-lg border border-gray-700 rounded-lg flex flex-col col-span-2">
                <CardHeader className="items-center">
                  <CardTitle>Participants Registration Trend</CardTitle>
                  <CardDescription>Registration by Date</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={{}} className="mx-auto">
                    <RegistrationLineChart eventId={event?.id} />
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EventAnalytics;
