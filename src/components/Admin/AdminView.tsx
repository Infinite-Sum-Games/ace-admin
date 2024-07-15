import { Component } from 'solid-js';
import '../style/BGstyles.css'

interface Admin {
  id: number;
  firstName: string;
  lastName: string;
  rollNumber: string;
  email: string;
}

const AdminView: Component<{ admins: Admin[] }> = (props) => {
  return (
    <div>
      <h2 class="admins-title">Admins</h2>
      <table class="admins-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Roll Number</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {props.admins.map(admin => (
            <tr key={admin.id}>
              <td>{admin.firstName} {admin.lastName}</td>
              <td>{admin.rollNumber}</td>
              <td>{admin.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminView;