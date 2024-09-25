import React from 'react';
import EventsTable from "./EventTable";
import EventFilter from "./EventFilter";

const OngoingEvents: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Ongoing Events</h2>
      <EventFilter />
      <EventsTable eventType="ongoing" />
    </div>
  );
};

const CompletedEvents: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Completed Events</h2>
      <EventFilter />
      <EventsTable eventType="completed" />
    </div>
  );
};

const AllEvents: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">All Events</h2>
      <EventFilter />
      <EventsTable eventType="all" />
    </div>
  );
};

const DraftEvents: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Draft Events</h2>
      <EventFilter />
      <EventsTable eventType="drafts" />
    </div>
  );
};

export { OngoingEvents, CompletedEvents, AllEvents, DraftEvents };
