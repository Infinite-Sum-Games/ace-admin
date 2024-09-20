import { useRecoilState } from 'recoil';
import { activeTabState } from '@/atoms/eventState';

const TabBar: React.FC = () => {
  const [activeTab, setActiveTab] = useRecoilState<string>(activeTabState);

  return (
    <div className="flex space-x-4 mb-6">
      {['all', 'ongoing', 'completed'].map((tab: string) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-4 py-2 rounded border border-gray-300 transition-all duration-200 ${
            activeTab === tab ? 'bg-blue-500 text-white' : 'bg-white text-black hover:bg-gray-100'
          }`}
          aria-selected={activeTab === tab}
        >
          {tab.charAt(0).toUpperCase() + tab.slice(1)} Events
        </button>
      ))}
    </div>
  );
};

export default TabBar;
