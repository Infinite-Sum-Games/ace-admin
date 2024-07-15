import { Component } from 'solid-js';

interface Newsletter {
  id: number;
  title: string;
  subscriberCount: number;
}

const NewsletterView: Component<{ newsletters: Newsletter[] }> = (props) => {
  return (
    <div>
      <h2>Newsletters</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Subscriber Count</th>
          </tr>
        </thead>
        <tbody>
          {props.newsletters.map(newsletter => (
            <tr key={newsletter.id}>
              <td>{newsletter.title}</td>
              <td>{newsletter.subscriberCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NewsletterView;
