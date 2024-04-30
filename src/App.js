import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ title: '', content: '' });

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/notes`);
    setNotes(data);
  };

  const addNote = async () => {
    const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/notes`, newNote);
    setNotes([...notes, data]);
    setNewNote({ title: '', content: '' });
  };

  return (
    <div>
      <div>
        <input
          value={newNote.title}
          onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
          placeholder="Note title"
        />
        <textarea
          value={newNote.content}
          onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
          placeholder="Note content"
        />
        <button onClick={addNote}>Add Note</button>
      </div>
      {notes.map(note => (
        <div key={note._id}>
          <h3>{note.title}</h3>
          <p>{note.content}</p>
        </div>
      ))}
    </div>
  );
}

export default App;