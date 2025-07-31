import React, { useEffect, useState } from 'react';
import api from '../api';
import Notes from '../components/Notes';
import "../styles/Home.css";


const Home = () => {
    // ✅ State variables to store fetched notes and new note data
    const [notes, setNotes] = useState([]);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");

    // ✅ Fetch notes when the component first loads
    useEffect(() => {
        getnotes();
    }, []);

    // 🔹 Function to fetch all notes from the backend API
    const getnotes = () => {
        api
            .get("api/notes/") // GET request
            .then((res) => res.data)
            .then((data) => {
                setNotes(data); // Store fetched notes in state
                console.log(data); // Debugging
            })
            .catch((err) => alert(err)); // Handle errors
    };

    // 🔹 Function to delete a note
    const deleteNote = (id) => {
        api
            .delete(`api/notes/delete/${id}/`) // DELETE request
            .then((res) => {
                if (res.status === 204) alert("Note Deleted!");
                else alert("Failed to delete note!");
            })
            .catch((err) => alert(err));
        getnotes(); // Refresh notes after deletion
    };

    // 🔹 Function to create a new note
    const createNote = (e) => {
        e.preventDefault(); // Prevent page reload
        api
            .post("/api/notes/", { content, title }) // POST request
            .then((res) => {
                if (res.status === 201) alert("Note Created!");
                else alert("Failed to make note.");
            })
            .catch((err) => alert(err));
        getnotes(); // Refresh notes after creating
    };

    return (
        <div className="home-container">
            {/* 🔹 Notes List */}
            <div className="notes-wrapper">
                <h2>Notes</h2>
                {/* Map through notes and display each */}
               <div className="notes-container">
             {notes.map((note) => (
             <Notes note={note} ondelete={deleteNote} key={note.id} />
              ))}
          </div>
              
            </div>

            {/* 🔹 Create Note Form */}
            <div className="create-note-section">
                <h2>Create Note</h2>
            <form className="create-note-form" onSubmit={createNote}>
                <label htmlFor="title">Title</label>
                <br />
                <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />
                <br />

                <label htmlFor="content">Content:</label>
                <br />
                <textarea
                    id="content"
                    name="content"
                    required
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <br />

                <input type="submit" value="Submit" />
            </form>
            </div>
            
        </div>
    );
};

export default Home;
