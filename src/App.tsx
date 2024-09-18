
import React from 'react';
import { RecoilRoot } from 'recoil';
import EventsPage from './pages/events/EventsPage';


const App: React.FC = () => {
  return (
    <RecoilRoot>
      <div className="min-h-screen flex flex-col bg-black text-white p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold">Events</h1>
          <p className="text-lg mt-2">Search and manage your events</p>
        </div>
        <div className="flex-grow flex bg-black p-6">
          <div className="flex-grow border border-gray-600 rounded-lg shadow-lg bg-gray-900">
            <EventsPage />
          </div>
        </div>
      </div>
    </RecoilRoot>
  );
};

export default App;
