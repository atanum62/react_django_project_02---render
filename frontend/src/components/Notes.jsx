import React from 'react'
import "../styles/Notes.css"
// ✅ Notes Component - Displays a single note with delete option
const Notes = ({ note, ondelete }) => {
    // 🔹 Format created date into a readable format (Indian locale)
    const formattedData = new Date(note.created_at).toLocaleDateString("en-IN");

    return (
        <div className='note-container'>
            {/* 🔹 Display note title */}
            <p className='note-title'>{note.title}</p>

            {/* 🔹 Display note content */}
            <p className='note-content'>{note.content}</p>

            {/* 🔹 Display formatted date */}
            {/* ⚠️ FIX: Using 'formattedData' variable instead of note.formattedData */}
            <p className='note-date'>{formattedData}</p>

            {/* 🔹 Delete button - calls ondelete function with note ID */}
            <button 
                className='delete-button' 
                onClick={() => ondelete(note.id)}
            >
                Delete
            </button>
        </div>
    );
}

export default Notes;
