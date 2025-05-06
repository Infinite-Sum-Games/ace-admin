import { useRecoilValue } from 'recoil';
import { eventRegistrationState } from '@/atoms/eventState'; // Adjust this path as needed
import { LineChart, Line, XAxis, CartesianGrid, Tooltip } from 'recharts';
import { ChartContainer } from '../ui/chart';
import { useEventStore } from '@/stores/EventStore';

// Define the ChartConfig interface with an index signature
interface ChartConfig {
  [key: string]: {
    label: string;
    color: string;
  };
}

// Define RegistrationCounts interface
interface RegistrationCounts {
  [date: string]: number; // Allow any string as a key with a number as a value
}

// Define ChartData interface
interface ChartData {
  date: string;
  count: number;
}

// Props to pass the specific event
interface RegistrationLineChartProps {
  eventId: string; // Pass the ID of the event being viewed
}

// Render the Line Chart
export function RegistrationLineChart({ eventId }: RegistrationLineChartProps) {
  // Get the participants from the specific event in the state
  const eventRegistration = useEventStore((state) => state.eventRegistrations);
  
  // Find the specific event by eventId
  const event = eventRegistration.find(e => e.eventId === eventId);

  // Initialize an object to store aggregated registration counts
  const registrationCounts: RegistrationCounts = {};

  // Check if the event exists and aggregate registration counts by date
  if (event) {
    const participants = event.registeredParticipants || [];

    participants.forEach(participant => {
      const date = new Date(participant.registeredDate).toISOString().split('T')[0]; // Format date as YYYY-MM-DD
      registrationCounts[date] = (registrationCounts[date] || 0) + 1; // Increment the count for that date
    });
  }

  // Convert the aggregated object into an array for the chart
  const chartData: ChartData[] = Object.keys(registrationCounts).map(date => ({
    date,
    count: registrationCounts[date],
  }));

  // Log chartData for debugging
  console.log(chartData); // Check if chartData is populated correctly

  // Create the config object for the chart
  const chartConfig: ChartConfig = {
    desktop: {
      label: "Desktop",
      color: "var(--color-desktop)", // Adjust the color as needed
    },
  };

  return (
    <ChartContainer config={chartConfig}>
      <LineChart data={chartData} width={500} height={300}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="date" 
          tickFormatter={(value) => new Date(value).toLocaleDateString()} 
        />
        <Tooltip />
        <Line 
          type="monotone" 
          dataKey="count" 
          stroke="#4760ff" // Hardcoded color for testing
        />
      </LineChart>
    </ChartContainer>
  );
}
