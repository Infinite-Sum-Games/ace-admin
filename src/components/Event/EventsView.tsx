import { Component, createSignal } from 'solid-js';
import '../style/BGstyles.css';
interface Event {
  id: number;
  name: string;
  date: string;
  time: string;
  venue: string;
  content: string;
  status: 'completed/terminated' | 'in progress' | 'upcoming';
}

const EventView: Component<{ events: Event[], onSave: (event: Event) => void, onDelete: (id: number) => void }> = (props) => {
  const [editableEvent, setEditableEvent] = createSignal<Event | null>(null);

  const handleEditClick = (event: Event) => {
    setEditableEvent({ ...event });
  };

  const handleSaveClick = () => {
    if (editableEvent()) {
      props.onSave(editableEvent()!);
      setEditableEvent(null);
    }
  };

  return (
    <div>
      <h2 class="events-title">Events</h2>
      <ul class="events-list">
        {props.events.map(event => (
          <li key={event.id}>
            {editableEvent()?.id === event.id ? (
              <div>
                <input
                  type="text"
                  value={editableEvent()!.name}
                  onInput={(e) => setEditableEvent({ ...editableEvent()!, name: (e.target as HTMLInputElement).value })}
                />
                <input
                  type="date"
                  value={editableEvent()!.date}
                  onInput={(e) => setEditableEvent({ ...editableEvent()!, date: (e.target as HTMLInputElement).value })}
                />
                <input
                  type="time"
                  value={editableEvent()!.time}
                  onInput={(e) => setEditableEvent({ ...editableEvent()!, time: (e.target as HTMLInputElement).value })}
                />
                <input
                  type="text"
                  value={editableEvent()!.venue}
                  onInput={(e) => setEditableEvent({ ...editableEvent()!, venue: (e.target as HTMLInputElement).value })}
                />
                <textarea
                  value={editableEvent()!.content}
                  onInput={(e) => setEditableEvent({ ...editableEvent()!, content: (e.target as HTMLTextAreaElement).value })}
                />
                <button class="save" onClick={handleSaveClick}>Save</button>
                <button class="delete" onClick={() => props.onDelete(event.id)}>Delete</button>
              </div>
            ) : (
              <div>
                <h3>{event.name}</h3>
                <p>{event.date} {event.time}</p>
                <p>{event.venue}</p>
                <p>{event.content}</p>
                <button class="edit" onClick={() => handleEditClick(event)} style="margin-left: 81%; justify-content: flex-end;">Edit</button>
                <button class="delete" onClick={() => props.onDelete(event.id)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventView;