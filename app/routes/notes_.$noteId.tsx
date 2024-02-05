import { Link, useLoaderData } from '@remix-run/react';
import { getStoredNotes } from '~/data/notes';
import styles from '~/styles/note-details.css';

export default function NoteDetailsPage() {
  const note: NoteType = useLoaderData();
  return (
    <main id="note-details">
      {/* <Note note={note} /> */}
      <header>
        <nav>
          <Link to={"/notes"}>Back to all notes</Link>
        </nav>
        <h1>{note.title}</h1>
      </header>
      <p id="note-details-content">{note.content}</p>
    </main>
  );
}

export async function loader(data: {params: {noteId: string}}) {
  const notes = await getStoredNotes();
  const selectedNote = notes.find((note: NoteType) => note.id === data.params.noteId);

  if (!selectedNote) {
    throw new Error('Note not found: ' + data.params.noteId);
  }

  return selectedNote;
}

export function links() {
  return [{rel: 'stylesheet', href: styles}];
}

export function meta(args: {data: NoteType}) {
  return [
    {title: args.data.title},
  ];
}

type NoteType = {id: string, title: string, content: string};