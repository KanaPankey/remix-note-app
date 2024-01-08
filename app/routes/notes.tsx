import { ActionFunctionArgs } from '@remix-run/node';
import { redirect } from 'react-router';
import NoteList, { links as noteListLinks } from '~/components/NoteList';
import NewNote, { links as newNoteLinks } from '~/components/NewNote';
import { getStoredNotes, storeNotes } from '~/data/notes';
import { useLoaderData } from '@remix-run/react';


export default function NotesPage() {
  const notes = useLoaderData();

  return (
    <main>
      <NewNote />
      <NoteList notes={notes} />
    </main>
  );
}

export async function loader() {
  const notes = await getStoredNotes();
  return notes;
}

export async function action ({request}: ActionFunctionArgs) {
  const formData = await request.formData();
  const noteData = Object.fromEntries(formData);

  // TODO:  Find a better way to type narrow to string...some sort of parse?
  if (typeof noteData.title == 'string') {
    if (noteData.title.trim().length < 5) {
      return {message: 'Invalid title - must be at least 5 characters long.'};
    }
  }


  const existingNotes = await getStoredNotes();
  noteData.id = new Date().toISOString();
  
  const updatedNotes = existingNotes.concat(noteData);
  await storeNotes(updatedNotes);

  return redirect('/notes');
}

export function links() {
  return [...newNoteLinks(), ...noteListLinks()];
}