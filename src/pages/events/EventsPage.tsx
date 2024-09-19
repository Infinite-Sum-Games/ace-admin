import { OngoingEvents, CompletedEvents, AllEvents } from '@/components/EventComponents/OngoingEvents';
import { useRecoilValue } from 'recoil';
import { activeTabState } from '@/atoms/eventState';
import TabBar from '@/components/EventComponents/TabBar';

const EventsPage = () => {
  const activeTab = useRecoilValue(activeTabState);

  return (
    <div className="min-h-screen flex flex-col bg-black text-white p-4 sm:p-8">
      <div className="text-center mb-6 sm:mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold">Events</h1>
        <p className="text-base sm:text-lg mt-2">Search and manage your events</p>
      </div>
      <div className="flex-grow flex bg-black p-4 sm:p-6">
        <div className="w-full border border-gray-600 rounded-lg shadow-lg bg-gray-900">
          <div className="w-full h-full bg-black rounded-lg shadow-xl p-4 sm:p-8">
            <div className="flex flex-col space-y-4 sm:space-y-6">
              <TabBar />
              <div className="w-full overflow-x-auto bg-black rounded-lg shadow-lg border p-4 sm:p-6">
                {activeTab === 'ongoing' && (
                  <div className="w-full">
                    <OngoingEvents />
                  </div>
                )}
                {activeTab === 'completed' && (
                  <div className="w-full">
                    <CompletedEvents />
                  </div>
                )}
                {activeTab === 'all' && (
                  <div className="w-full">
                    <AllEvents />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsPage;
