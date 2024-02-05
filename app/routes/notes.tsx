import { ActionFunctionArgs, json } from '@remix-run/node';
import { redirect } from 'react-router';
import NoteList, { links as noteListLinks } from '~/components/NoteList';
import NewNote, { links as newNoteLinks } from '~/components/NewNote';
import { getStoredNotes, storeNotes } from '~/data/notes';
import { isRouteErrorResponse, useLoaderData, useRouteError } from '@remix-run/react';


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
  if (!notes || notes.length === 0) {
    throw new Response('No notes found', {status: 404});
  }
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

export function meta() {
  return [
    {title: 'All Notes'},
    {description: 'Manage your notes with ease.'},
  ];
}

export function ErrorBoundary() {
  const error = useRouteError();
    // TODO: Make this more readable by pulling out double ternary into a function
    return (
      <html lang="en">
        <head>
          <title>An error occurred!</title>
        </head>
        <body className='error'>
          <NewNote />
          <h1>An error occurred in notes!</h1>
          {isRouteErrorResponse(error) ? (
            <p>{error.data}</p>
          ) : error instanceof Error ? (
            <p>{error.message}</p>
          ) : (
            <p>Unknown error</p>
          )}
        </body>
      </html>
    );
}

function useCatch() {
  throw new Error('Function not implemented.');
}
