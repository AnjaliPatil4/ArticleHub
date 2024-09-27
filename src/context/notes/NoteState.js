import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";

  const [notes, setNotes] = useState([{}]);

  const getNotes = async (title, description, tag, visible) => {
    const url = `${host}/api/notes/fetchnotes`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    //console.log(json);
    setNotes(json);
    console.log("Notes are");
    console.log(json);
  };

  const addNote = async (title, description, tag, visible) => {
    const url = `${host}/api/notes/addnote`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",

        "auth-token": localStorage.getItem("token"),
      },

      body: JSON.stringify({ title, description, tag, visible }),
    });
    console.log(localStorage.getItem("token"));
    const note = await response.json();
    console.log(note);
    setNotes(notes.concat(note));
  };
  const deleteNote = async (id) => {
    const url = `${host}/api/notes/deletenote/${id}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    //console.log(json);

    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };
  const editNote = async (id, title, description, tag) => {
    const url = `${host}/api/notes/updatenote/${id}`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    let newNotes = JSON.parse(JSON.stringify(notes));
    //Logic to change in client
    for (let i = 0; i < newNotes.length; i++) {
      let note = newNotes[i];
      if (note._id === id) {
        note.title = title;
        note.description = description;
        note.tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };
  const changeVisible = async (id, currentVisibility) => {
    console.log(currentVisibility);
    console.log(!currentVisibility);
    const url = `${host}/api/notes/updatenote/${id}`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ visible: !currentVisibility }), // Toggle visibility
    });

    if (!response.ok) {
      console.error("Failed to update visibility");
      return;
    }

    const updatedNote = await response.json();
    console.log(updatedNote.note.visible);
    console.log(updatedNote);
    // Update the notes state
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note._id === id ? { ...note, visible: updatedNote.note.visible } : note
      )
    );
    console.log(notes);
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes, changeVisible }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
