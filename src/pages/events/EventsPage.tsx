import { OngoingEvents, CompletedEvents, AllEvents } from '@/components/EventComponents/OngoingEvents';
import { useRecoilValue } from 'recoil';
import { activeTabState } from '@/atoms/eventState';
import TabBar from '@/components/EventComponents/TabBar';
const EventsPage = () => {
  const activeTab = useRecoilValue(activeTabState); 

  return (

    <div className="w-full h-full bg-black rounded-lg shadow-xl p-8">
      <div className="flex flex-col space-y-6">
        <TabBar />
        <div className="flex-grow bg-black rounded-lg shadow-lg border p-6">
          {activeTab === 'ongoing' && <OngoingEvents />}
          {activeTab === 'completed' && <CompletedEvents />}
          {activeTab === 'all' && <AllEvents />}
        </div>
      </div>
    </div>
  );
};

export default EventsPage;
