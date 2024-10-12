import React from "react";
import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { useRecoilState } from "recoil";
import { filterDashboardCardState } from "@/atoms/atoms";
import ToggleGroup from "@/components/toggle-group";
import {
  User,
  CalendarCheck,
  Users,
  LandPlot,
  TrendingUp,
  TrendingDown
} from "lucide-react";
import EventsTable from "@/components/RecentEventsTable";
import { Separator } from "@/components/ui/separator";
import { Overview } from "@/components/DashboardBarChart";
import Sidebar from "@/components/Sidebar";

interface Metric {
  thisYear: number;
  allTime: number;
  lastYear: number;
}

const Dashboard: React.FC = () => {
  const [filter, setFilter] = useRecoilState(filterDashboardCardState);

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
    const previous = filter === "This Year" ? metric.lastYear : metric.thisYear;
    if (!previous) return 0;
    return ((current - previous) / previous) * 100;
  };

  const renderChangeIcon = (change: number) => {
    return change > 0 ? (
      <div className="flex items-center text-green-700">
        <div>
          <TrendingUp className="w-4 h-4" />
        </div>
        <span className="text-sm pl-1">{`+${change.toFixed(1)}% from last period`}</span>
      </div>
    ) : (
      <div className="flex items-center text-red-700">
        <TrendingDown className="w-4 h-4" />
        <span className="text-sm pl-1">{`${change.toFixed(
          1
        )}% from last period`}</span>
      </div>
    );
  };

  return (
    <div className="flex overflow-hidden">
      <Sidebar />

      <div className="p-6 bg-background text-foreground flex-1 overflow-auto">
        <h1 className="text-6xl font-bold pb-8">Dashboard</h1>

        {/* Filter toggle */}
        <div className="mb-6">
          <ToggleGroup filter={filter} onChange={setFilter} />
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-4 gap-6">
          {/* Card 1: Active Members */}
          <Card className="border-border">
            <CardHeader className="flex flex-row justify-between items-end">
              <CardTitle className="tracking-wider font-normal">
                Active Members
              </CardTitle>
              <User className="w-6 h-6" />
            </CardHeader>
            <CardDescription className="pl-7 pb-8">
              <p className="text-6xl font-extrabold text-white">
                {getFilteredData(data.activeMembers)}
              </p>
              <p className="pt-2">
                {renderChangeIcon(calculatePercentageChange(data.activeMembers))}
              </p>
            </CardDescription>
          </Card>

          {/* Card 2: Events Completed */}
          <Card className="border-border">
            <CardHeader className="flex flex-row justify-between items-end">
              <CardTitle className="tracking-wider font-normal">
                Events Completed
              </CardTitle>
              <CalendarCheck className="w-6 h-6" />
            </CardHeader>
            <CardDescription className="pl-7 pb-8">
              <p className="text-6xl font-extrabold text-white">
                {getFilteredData(data.eventsCompleted)}
              </p>
              <p className="pt-2">
                {renderChangeIcon(
                  calculatePercentageChange(data.eventsCompleted)
                )}
              </p>
            </CardDescription>
          </Card>

          {/* Card 3: Avg Attendees Per Event */}
          <Card className="border-border">
            <CardHeader className="flex flex-row justify-between items-end">
              <CardTitle className="tracking-wider font-normal">
                Avg Attendees Per Event
              </CardTitle>
              <Users className="w-6 h-6" />
            </CardHeader>
            <CardDescription className="pl-7 pb-8">
              <p className="text-6xl font-extrabold text-white">
                {getFilteredData(data.avgAttendeesPerEvent)}
              </p>
              <p className="pt-2">
                {renderChangeIcon(
                  calculatePercentageChange(data.avgAttendeesPerEvent)
                )}
              </p>
            </CardDescription>
          </Card>

          {/* Card 4: Campaigns */}
          <Card className="border-border">
            <CardHeader className="flex flex-row justify-between items-end">
              <CardTitle className="tracking-wider font-normal">
                Campaigns
              </CardTitle>
              <LandPlot className="w-6 h-6" />
            </CardHeader>
            <CardDescription className="pl-7 pb-8">
              <p className="text-6xl font-extrabold text-white">
                {getFilteredData(data.campaigns)}
              </p>
              <p className="pt-2">
                {renderChangeIcon(calculatePercentageChange(data.campaigns))}
              </p>
            </CardDescription>
          </Card>
        </div>

        <Separator className="my-8" />

        {/* Events Tables */}
        <div className="grid grid-cols-1 md:grid-cols-2 mt-6 gap-6 min-h-[300px]">
          <div>
            <Overview />
          </div>
          <div>
            <EventsTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
