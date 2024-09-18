import React from "react";
import { Card, CardHeader, CardDescription, CardTitle } from "./ui/card";
import { useRecoilState } from "recoil";
import { filterState } from "../atoms/atoms";
import ToggleGroup from "./toggle-group";
import { User, CalendarCheck, Users, Flag, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import EventsTable from "./event-table";
import { Separator } from "./ui/separator";
import { Overview } from "./bar-chart";

interface Metric {
  thisYear: number;
  allTime: number;
  lastYear: number;
}

const Dashboard: React.FC = () => {
  const [filter, setFilter] = useRecoilState(filterState);

  const data = {
    activeMembers: {
      thisYear: 500,
      allTime: 2000,
      lastYear: 450,
    },
    eventsCompleted: {
      thisYear: 50,
      allTime: 300,
      lastYear: 45,
    },
    avgAttendeesPerEvent: {
      thisYear: 100,
      allTime: 80,
      lastYear: 90,
    },
    campaigns: {
      thisYear: 10,
      allTime: 50,
      lastYear: 8,
    },
  };

  const getFilteredData = (metric: Metric) => {
    switch (filter) {
      case "This Year":
        return metric.thisYear;
      case "Last Year":
        return metric.lastYear;
      case "All Time":
        return metric.allTime;
      default:
        return metric.thisYear;
    }
  };

  const calculatePercentageChange = (metric: Metric) => {
    const current = getFilteredData(metric);
    const previous =
      filter === "This Year" ? metric.lastYear : metric.thisYear;
    if (!previous) return 0;
    return ((current - previous) / previous) * 100;
  };

  const renderChangeIcon = (change: number) => {
    return change > 0 ? (
      <div className="flex items-center text-green-700">
        <ArrowUpRight className="w-4 h-4" />
        <span className="text-sm pl-1">{`+${change.toFixed(1)}% from last period`}</span>
      </div>
    ) : (
      <div className="flex items-center text-red-700">
        <ArrowDownRight className="w-4 h-4" />
        <span className="text-sm pl-1">{`${change.toFixed(1)}% from last period`}</span>
      </div>
    );
  };

  return (
    <div className="p-6 bg-[hsl(var(--background))] text-[hsl(var(--foreground))] min-h-screen">
      <h1 className="text-7xl font-bold pb-8">Dashboard</h1>

      {/* Filter toggle */}
      <div className="flex flex-row-reverse justify-between mb-6">
        <div>
          <ModeToggle />
        </div>
        <div>
          <ToggleGroup filter={filter} onChange={setFilter} />
        </div>
      </div>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-4 gap-6">
        {/* Card 1: Active Members */}
        <Card className="border-[hsl(var(--border))]">
          <CardHeader className="flex flex-row space-x-2">
            <User className="w-8 h-8" />
            <CardTitle className="tracking-wider">Active Members</CardTitle>
          </CardHeader>
          <CardDescription className="pl-7 pb-8">
            <p className="text-6xl font-black">
              {getFilteredData(data.activeMembers)}
            </p>
            <p className="pt-2">{renderChangeIcon(calculatePercentageChange(data.activeMembers))}</p>
          </CardDescription>
        </Card>

        {/* Card 2: Events Completed */}
        <Card className="border-[hsl(var(--border))] max-h-52">
          <CardHeader className="flex flex-row space-x-2">
            <CalendarCheck className="w-8 h-8" />
            <CardTitle className="tracking-wider">Events Completed</CardTitle>
          </CardHeader>
          <CardDescription className="pl-7 pb-8">
            <p className="text-6xl font-bold">
              {getFilteredData(data.eventsCompleted)}
            </p>
            <p className="pt-2">{renderChangeIcon(calculatePercentageChange(data.eventsCompleted))}</p>
          </CardDescription>
        </Card>

        {/* Card 3: Avg Attendees Per Event */}
        <Card className="border-[hsl(var(--border))]">
          <CardHeader className="flex flex-row space-x-2">
            <Users className="w-8 h-8" />
            <CardTitle className="tracking-wider">
              Avg Attendees Per Event
            </CardTitle>
          </CardHeader>
          <CardDescription className="pl-7 pb-8">
            <p className="text-6xl font-bold">
              {getFilteredData(data.avgAttendeesPerEvent)}
            </p>
            <p className="pt-2">{renderChangeIcon(calculatePercentageChange(data.avgAttendeesPerEvent))}</p>
          </CardDescription>
        </Card>

        {/* Card 4: Campaigns */}
        <Card className="border-[hsl(var(--border))]">
          <CardHeader className="flex flex-row space-x-2">
            <Flag className="w-8 h-8" />
            <CardTitle className="tracking-wider">Campaigns</CardTitle>
          </CardHeader>
          <CardDescription className="pl-7 pb-8">
            <p className="text-6xl font-bold">
              {getFilteredData(data.campaigns)}
            </p>
            <p className="pt-2">{renderChangeIcon(calculatePercentageChange(data.campaigns))}</p>
          </CardDescription>
        </Card>
      </div>

      <Separator className="my-8" />

      {/* Events Tables */}
      <div className="grid grid-cols-2 mt-6 gap-6">
        <div>
          <Overview />
        </div>
        <div>
          <EventsTable />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;