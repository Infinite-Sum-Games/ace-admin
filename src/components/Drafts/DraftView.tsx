import { Component, createSignal } from 'solid-js';
import '../style/BGstyles.css'
interface Draft {
  id: number;
  name: string;
  date: string;
  time: string;
  venue: string;
  content: string;
  status: 'completed/terminated' | 'in progress' | 'upcoming';
}

const DraftView: Component<{ drafts: Draft[], onSave: (draft: Draft) => void, onDelete: (id: number) => void }> = (props) => {
  const [editableDraft, setEditableDraft] = createSignal<Draft | null>(null);

  const handleEditClick = (draft: Draft) => {
    setEditableDraft({ ...draft });
  };

  const handleSaveClick = () => {
    if (editableDraft()) {
      props.onSave(editableDraft()!);
      setEditableDraft(null);
    }
  };

  return (
    <div>
      <h2 class="drafts-title">Drafts</h2>
      <ul class="drafts-list">
        {props.drafts.map(draft => (
          <li key={draft.id}>
            {editableDraft()?.id === draft.id ? (
              <div>
                <input type="text" value={editableDraft()!.name} onInput={(e) => setEditableDraft({ ...editableDraft()!, name: (e.target as HTMLInputElement).value })} />
                <input type="date" value={editableDraft()!.date} onInput={(e) => setEditableDraft({ ...editableDraft()!, date: (e.target as HTMLInputElement).value })} />
                <input type="time" value={editableDraft()!.time} onInput={(e) => setEditableDraft({ ...editableDraft()!, time: (e.target as HTMLInputElement).value })} />
                <input type="text" value={editableDraft()!.venue} onInput={(e) => setEditableDraft({ ...editableDraft()!, venue: (e.target as HTMLInputElement).value })} />
                <textarea value={editableDraft()!.content} onInput={(e) => setEditableDraft({ ...editableDraft()!, content: (e.target as HTMLTextAreaElement).value })} />
                <button class="save" onClick={handleSaveClick}>Save</button>
                <button class="delete" onClick={() => props.onDelete(draft.id)}>Delete</button>
              </div>
            ) : (
              <div>
                <h3>{draft.name}</h3>
                <p>{draft.date} {draft.time}</p>
                <p>{draft.venue}</p>
                <p>{draft.content}</p>
                <button class="edit" onClick={() => handleEditClick(draft)} style="margin-left: 81%; justify-content: flex-end;">Edit</button>
                <button class="delete" onClick={() => props.onDelete(draft.id)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DraftView;