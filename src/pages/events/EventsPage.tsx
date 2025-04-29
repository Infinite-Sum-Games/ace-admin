import { useRecoilValue } from 'recoil';
import { activeTabState } from '@/atoms/eventState';
import { OngoingEvents, CompletedEvents, AllEvents, DraftEvents } from '@/components/EventComponents/OngoingEvents';
import Sidebar from '@/components/Sidebar';

const EventsPage = () => {
  const activeTab = useRecoilValue(activeTabState);

  return (
    <div className="min-h-screen flex bg-[hsl(var(--background))] text-[hsl(var(--foreground))] text-white">
      <Sidebar />
      <div className="flex-1 flex flex-col p-8">
        <div className="text-center mb-3 sm:mb-4">
          <h1 className="text-3xl sm:text-6xl font-bold text-le text-left">Events</h1>

        </div>

        <div className="w-full h-full bg-[hsl(var(--background))] text-[hsl(var(--foreground))] rounded-lg shadow-xl p-4 sm:p-8">
          <div className="flex flex-col space-y-4 sm:space-y-6">
            <div className="w-full overflow-x-auto bg-[hsl(var(--background))] text-[hsl(var(--foreground))] rounded-lg shadow-lg border border-1 border-gray-800 p-4 sm:p-6">
              {activeTab === 'ongoing' && <OngoingEvents />}
              {activeTab === 'completed' && <CompletedEvents />}
              {activeTab === 'all' && <AllEvents />}
              {activeTab === 'drafts' && <DraftEvents />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsPage;
