import { Component } from 'solid-js';
import EventView from '../Event/EventsView';
import DraftView from '../Drafts/DraftView';
import AdminView from '../Admin/AdminView';
import SubscribersView from '../Campaign/SubscribersView';
import NewsletterView from '../Campaign/NewsletterView';

const MainView: Component<{
  onDeleteEvent: (id: number) => void;
  onDeleteDraft: (id: number) => void; 
  activeIndex: number; 
  events: any[], drafts: any[], admins: any[],
  onSaveEvent: (event: any) => void, onSaveDraft: (draft: any) => void 
}> = (props) => {
  const renderContent = () => {
    switch (props.activeIndex) {
      case 0:
        return <div><EventView events={props.events} onSave={props.onSaveEvent} onDelete={props.onDeleteEvent} /></div>;
      case 1:
        return <div><DraftView drafts={props.drafts} onSave={props.onSaveDraft} onDelete={props.onDeleteDraft} /></div>;
      case 2:
        return <div>Campaigns Content</div>;
      case 3:
        return <div><AdminView admins={props.admins} /></div>;
      case 4:
        return <div><NewsletterView/></div>;
      case 5:
        return <div><SubscribersView/></div>;
      default:
        return <div>Dashboard Content</div>;
    }
  };

  return (
    <div class="mainContent">
      {renderContent()}
    </div>
  );
};

export default MainView;
