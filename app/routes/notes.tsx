import { ActionFunctionArgs } from '@remix-run/node';
import { redirect } from 'react-router';
import NewNote, { links as newNoteLinks } from '~/components/NewNote';
import { getStoredNotes, storeNotes } from '~/data/notes';


export default function NotesPage() {
  return (
    <main>
      <NewNote />
    </main>
  )
}

export async function action ({request}: ActionFunctionArgs) {
  const formData = await request.formData();
  const noteData = Object.fromEntries(formData);

  const existingNotes = await getStoredNotes();
  noteData.id = new Date().toISOString();
  
  const updatedNotes = existingNotes.concat(noteData);
  await storeNotes(updatedNotes);

  return redirect('/notes');
}

export function links() {
  return [...newNoteLinks()];
}