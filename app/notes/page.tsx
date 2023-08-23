"use client";

import Note from "./Note";
import PocketBase from 'pocketbase';
import CreateNote from "./CreateNote";
import { useState, useEffect } from 'react';

export const dynamic = 'auto',
    dynamicParams = true,
    revalidate = 0,
    fetchCache = 'auto',
    runtime = 'nodejs',
    preferrefRegion = 'auto'

async function getNotes(){
    const pb = new PocketBase('http://127.0.0.1:8090');
    const data = await pb.collection('posts').getList(1, 20);
    // const res = await fetch('http://127.0.0.1:8090/api/collections/posts/records?page=1&perPage=20');
    // const data = await res.json();
    // console.log(data);
    return data?.items as any[];
}

export interface Note {
    id: number;
    title: string;
    content: string;
    date: string;
  }
  
  interface CreateNoteProps {
    onNoteCreation: (newNote: Note) => void;
  }
  
  export default function NotesPage() {
    const [notes, setNotes] = useState<Note[]>([]);
  
    useEffect(() => {
      const fetchNotes = async () => {
        try {
          const data = await getNotes();
          setNotes(data);
        } catch (error) {
          console.error('Error fetching notes:', error);
        }
      };
  
      fetchNotes();
    }, []);
  
    const handleNoteCreation = (newNote: Note) => {
        setNotes((prevNotes) => [...prevNotes, newNote]);
      };
          
  
    return (
      <main>
        <h1 className="font-bold text-3xl text-gray-900 py-8 px-2 bg-gray-50">
          Notes
        </h1>
        <div className=" bg-gray-50">
          <div className="flex flex-wrap">
            {notes.map((note) => {
              return <Note key={note.id} note={note}></Note>;
            })}
          </div>
          <CreateNote onNoteCreation={handleNoteCreation} />
        </div>
      </main>
    );
  }
  
