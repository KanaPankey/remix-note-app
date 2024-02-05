import { Link } from '@remix-run/react';
import styles from '~/styles/note-details.css';

export default function NoteDetailsPage() {
  // const note = useLoaderData();
  return (
    <main id="note-details">
      {/* <Note note={note} /> */}
      <header>
        <nav>
          <Link to={"/notes"}>Back to all notes</Link>
        </nav>
        <h1>NOTE TITLE</h1>
      </header>
      <p id="note-details-content">NOTE CONTENT</p>
    </main>
  );
}

export function links() {
  return [{rel: 'stylesheet', href: styles}];
}