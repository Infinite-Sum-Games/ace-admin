import { createSignal, onMount } from 'solid-js';
import type { Component } from 'solid-js';

import '../style/BGstyles.css';

import EventFormSidebar from '../Event/EventFormSidebar';
import AddAdminModal from '../Admin/adminForm';
import SideBar from '../NavBars/sidebar';
import TopBarView from '../NavBars/TopBarView';
import MainView from './MainView';
import AdminView from '../Admin/AdminView';

interface Admin {
  id: number;
  firstName: string;
  lastName: string;
  rollNumber: string;
  email: string;
}
const DashBoard: Component = () => {
  const [activeIndex, setActiveIndex] = createSignal(0);
  const [isEventFormOpen, setIsEventFormOpen] = createSignal(false);
  const [isAddAdminModalOpen, setIsAddAdminModalOpen] = createSignal(false);
  const [events, setEvents] = createSignal<any[]>([]);
  const [drafts, setDrafts] = createSignal<any[]>([]);
  const [admins, setAdmins] = createSignal<Admin[]>([]);
  const [isModalOpen, setIsModalOpen] = createSignal(false);
  3
  const titles = ['Dashboard', 'Drafts', 'Campaigns', 'Admin', 'Newsletter', 'Subscribers'];

  onMount(() => {
    const storedEvents = localStorage.getItem('events');
    const storedDrafts = localStorage.getItem('drafts');
    if (storedEvents) setEvents(JSON.parse(storedEvents));
    if (storedDrafts) setDrafts(JSON.parse(storedDrafts));
  });

  const handleAddEventClick = () => {
    setIsEventFormOpen(true);
  };

  const handleCloseEventForm = () => {
    setIsEventFormOpen(false);
  };

  const handlePublishEvent = (event: any) => {
    const updatedEvents = [...events(), event];
    setEvents(updatedEvents);
    localStorage.setItem('events', JSON.stringify(updatedEvents));
    setIsEventFormOpen(false);
  };

  const handleSaveDraft = (event: any) => {
    const updatedDrafts = [...drafts(), event];
    setDrafts(updatedDrafts);
    localStorage.setItem('drafts', JSON.stringify(updatedDrafts));
    setIsEventFormOpen(false);
  };

  const handleSaveEvent = (event: any) => {
    const updatedEvents = events().map(e => e.id === event.id ? event : e);
    setEvents(updatedEvents);
    localStorage.setItem('events', JSON.stringify(updatedEvents));
  };

  const handleUpdateSaveDraft = (draft: any) => {
    const updatedDrafts = drafts().map(d => d.id === draft.id ? draft : d);
    setDrafts(updatedDrafts);
    localStorage.setItem('drafts', JSON.stringify(updatedDrafts));
  };

  const handleDeleteEvent = (id: number) => {
    const updatedEvents = events().filter(event => event.id !== id);
    setEvents(updatedEvents);
    localStorage.setItem('events', JSON.stringify(updatedEvents));
  };

  const handleDeleteDraft = (id: number) => {
    const updatedDrafts = drafts().filter(draft => draft.id !== id);
    setDrafts(updatedDrafts);
    localStorage.setItem('drafts', JSON.stringify(updatedDrafts));
  };

  const handleAddAdminClick = () => {
    setIsAddAdminModalOpen(true);
  };

  const handleCloseAddAdminModal = () => {
    setIsAddAdminModalOpen(false);
  };

  const handleAddAdmin = (admin: Omit<Admin, 'id'>) => {
    setAdmins([...admins(), { ...admin, id: admins().length + 1 }]);
  };

  return (
    <div class="container" style="display: flex;">
      <div style="width: 15%;">
        <SideBar activeIndex={activeIndex()} setActiveIndex={setActiveIndex} />
      </div>
      <div style="width: 85%;">
        <TopBarView
          title={titles[activeIndex()]}
          activeIndex={activeIndex()}
          onAddEventClick={handleAddEventClick}
          onAddAdminClick={handleAddAdminClick}
        />
        <MainView
          activeIndex={activeIndex()}
          events={events()}
          drafts={drafts()}
          admins={admins()}
          onSaveEvent={handleSaveEvent}
          onSaveDraft={handleSaveDraft}
          onDeleteEvent={handleDeleteEvent}
          onDeleteDraft={handleDeleteDraft}
        />
      </div>
      <EventFormSidebar
        isOpen={isEventFormOpen()}
        onClose={handleCloseEventForm}
        onPublish={handlePublishEvent}
        onSaveDraft={handleSaveDraft}
      />
      <AddAdminModal
        isOpen={isAddAdminModalOpen()}
        onClose={handleCloseAddAdminModal}
        onAdd={handleAddAdmin}
      />
    </div>
  );
};

export default DashBoard;
