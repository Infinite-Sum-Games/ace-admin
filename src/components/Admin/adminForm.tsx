import { createSignal } from 'solid-js';
import type { Component } from 'solid-js';
import '../style/BGstyles.css';

interface AddAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (admin: { firstName: string; lastName: string; rollNumber: string; email: string; password: string }) => void;
}

const AddAdminModal: Component<AddAdminModalProps> = (props) => {
  const [firstName, setFirstName] = createSignal('');
  const [lastName, setLastName] = createSignal('');
  const [rollNumber, setRollNumber] = createSignal('');
  const [email, setEmail] = createSignal('');
  const [password, setPassword] = createSignal('');
  const [confirmPassword, setConfirmPassword] = createSignal('');

  const handleAddAdmin = () => {
    if (password() !== confirmPassword()) {
      alert('Passwords do not match');
      return;
    }
    props.onAdd({ firstName: firstName(), lastName: lastName(), rollNumber: rollNumber(), email: email(), password: password() });
    setFirstName('');
    setLastName('');
    setRollNumber('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    props.onClose();
  };

  return (
    <div class={`modal ${props.isOpen ? 'active' : ''}`}>
      <h2 class="modal-header">Add Admin</h2>
      <div class="modal-row">
        <input
          type="text"
          placeholder="First Name"
          value={firstName()}
          onInput={(e: Event) => setFirstName((e.target as HTMLInputElement).value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName()}
          onInput={(e: Event) => setLastName((e.target as HTMLInputElement).value)}
        />
      </div>
      <input
        type="text"
        placeholder="Roll Number"
        value={rollNumber()}
        onInput={(e: Event) => setRollNumber((e.target as HTMLInputElement).value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email()}
        onInput={(e: Event) => setEmail((e.target as HTMLInputElement).value)}
      />
      <div class="modal-row">
        <input
          type="password"
          placeholder="Password"
          value={password()}
          onInput={(e: Event) => setPassword((e.target as HTMLInputElement).value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword()}
          onInput={(e: Event) => setConfirmPassword((e.target as HTMLInputElement).value)}
        />
      </div>
      <div class="modal-button-container">
        <button onClick={handleAddAdmin} style="margin-left: 52.7%;">Add Admin</button>
        <button onClick={props.onClose}>Close</button>
      </div>
    </div>
  );
};

export default AddAdminModal;
