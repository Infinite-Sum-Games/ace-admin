import { Component } from 'solid-js';

interface Subscriber {
  id: number;
  email: string;
  subscribedDate: string;
}

const SubscribersView: Component<{ subscribers: Subscriber[] }> = (props) => {
  return (
    <div>
      <h2>Subscribers</h2>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Subscribed Date</th>
          </tr>
        </thead>
        <tbody>
          {props.subscribers.map(subscriber => (
            <tr key={subscriber.id}>
              <td>{subscriber.email}</td>
              <td>{subscriber.subscribedDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SubscribersView;
