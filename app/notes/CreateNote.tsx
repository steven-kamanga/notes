"use client";
import { useState } from 'react';
import { Note } from './page';

interface CreateNoteProps {
    onNoteCreation: (newNote: Note) => void;
  }
  

export default function CreateNote({ onNoteCreation }: CreateNoteProps) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [titleError, setTitleError] = useState('');
    const [contentError, setContentError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
  
    const create = async () => {
      setTitleError('');
      setContentError('');
  
      if (!title) {
        setTitleError('Title is required.');
        return;
      }
  
      if (!content) {
        setContentError('Content is required.');
        return;
      }
  
      setIsSubmitting(true);
  
      const currentDate = new Date().toISOString();
      try {
        const response = await fetch('http://127.0.0.1:8090/api/collections/posts/records', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title,
            content,
            date: currentDate,
          }),
        });
  
        const newNote: Note = await response.json();
        setContent('');
        setTitle('');
        onNoteCreation(newNote);
      } catch (error) {
        console.error('Error creating note:', error);
      } finally {
        setIsSubmitting(false);
      }
    };
  
    return (
      <form className="py-10 w-1/2 pl-2">
        <h3 className="text-xl font-semibold mb-4">Create a new note</h3>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={`border p-2 mb-2 w-full ${
            titleError ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {titleError && <p className="text-red-500 mb-2">{titleError}</p>}
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className={`border p-2 mb-2 w-full ${
            contentError ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {contentError && <p className="text-red-500 mb-2">{contentError}</p>}
        <button
          onClick={create}
          type="button"
          disabled={isSubmitting}
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          {isSubmitting ? 'Creating...' : 'Create Note'}
        </button>
      </form>
    );
  }
