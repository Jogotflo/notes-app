import { useState } from 'react';
import './App.css';

function Intro({ message }) {
  return <p>{message}</p>;
}

function Note({ id, title, description, completed, onToggleComplete, onDeleteNote }) {
  return (
    <li className={completed ? 'note completed' : 'note incompleted'}>
      <button className="delete-button" onClick={() => 
        onDeleteNote(id)}> 
        X
      </button> 
      <div className="note-controls">
      <input 
      type="checkbox" 
      checked={completed} /// controls whether checkbox looks checked or unchecked
      onChange={(event) => 
      onToggleComplete(id, event.target.checked)} /// id tells which is clicked, e.t.c gives checkbox new checked value
      />
      </div>
      
      <div className="note-text">
      <h3 className="note-title">{title}</h3>
      <p>{description}</p>
      </div>
    </li> /// /\calls delete function with that note's id
  );
}

function NoteList({notes, onToggleComplete, onDeleteNote}) {
  return (
    <ul>
      {notes.map((note) => ( /// turns notes into individual note components
        <Note
        key={note.id}
        title={note.title}
        description={note.description}
        id={note.id}
        completed={note.completed}
        onToggleComplete={onToggleComplete}
        onDeleteNote={onDeleteNote}
        />
      ))}
    </ul>
  );
}

function NoteForm({onAddNote}) { 
  function handleSubmit(event) {
    event.preventDefault();
    onAddNote(title, description);
    setTitle('');
    setDescription('');
  }
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
      <input 
      type="text" 
      name="title" 
      value={title}
      onChange={(event) => setTitle(event.target.value)}
      />
      </label>

      <label>
        Description:
      <input 
      type='text'
      name='description'
      value={description}
      onChange={(event) => setDescription(event.target.value)}
      />
      </label>
      <button className="add-note" type="submit">
        + Add note
      </button>
    </form>
  );
}

function App() {
  const [notes, setNotes] = useState([ /// stores the notes data
    { id : '1', title: 'Walk dogs', description: 'Walk around the block', completed: false },
    { id : '2', title: 'Lunch', description: 'Make a smoothie', completed: false},
    { id : '3', title: 'Yoga', description: 'Stretch for 30 minutes', completed: false},
  ]);

  function updateNoteCompletion(noteId, newStatus) { /// handles completion status of items
    setNotes((currentNotes) => 
    currentNotes.map((note) => {
      if (noteId === note.id) {
        return { ...note, completed: newStatus };
      }
      
      return note;

    })
    );
  }

  function deleteNote(noteId) {
    setNotes((currentNotes) => 
    currentNotes.filter((note) => note.id !== noteId))
  }

  function addNote(title, description) { /// handles adding items
    const newNote = {
      id: crypto.randomUUID(),
      title: title,
      description: description,
      completed: false,
    };
    setNotes((currentNotes) => [...currentNotes, newNote]); /// updates notes
    }

  return (
    <div className="App">
      <h1> My Notes</h1>
      <Intro message="Welcome to your personal notes app" />
      <section className="notes-box">
      <NoteList 
      notes={notes}
      onToggleComplete={updateNoteCompletion}
      onDeleteNote={deleteNote}
      />
      </section>
      <section className="form-box">
      <NoteForm onAddNote={addNote} />
      </section>
    </div>
  );
}

export default App;