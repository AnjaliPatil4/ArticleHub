import React, { useContext, useEffect, useRef, useState } from "react";
import NoteContext from "../context/notes/NoteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material"; // Import Material-UI Button

const Notes = (props) => {
  let history = useNavigate();
  const context = useContext(NoteContext);
  const { notes, getNotes, editNote, changeVisible, deleteNote } = context;

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getNotes();
    } else {
      history("/login");
    }
    // eslint-disable-next-line
  }, []);

  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  const handleClick = (e) => {
    e.preventDefault(); // Prevent page reload
    editNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
    // props.showAlert("Note Updated Successfully", "success");
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <AddNote showAlert={props.showAlert} />
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={ref}
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content" style={{ padding: "10px" }}>
            {" "}
            {/* Added padding */}
            <div className="modal-header">
              <h1 className="modal-etitle fs-3" id="exampleModalLabel">
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-1">
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    aria-describedby="emailHelp"
                    onChange={onChange}
                    value={note.etitle}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">
                    Description
                  </label>
                  <textarea
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    onChange={onChange}
                    value={note.edescription}
                    minLength={5}
                    required
                    rows="3" // Set the number of rows for the textarea
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    onChange={onChange}
                    value={note.etag}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <Button
                variant="outlined"
                color="secondary" // Changed to secondary
                onClick={() => refClose.current.click()} // Close modal
                ref={refClose}
                style={{ marginRight: "auto" }} // Align the close button to the left
              >
                Close
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleClick}
                disabled={
                  note.etitle.length < 5 || note.edescription.length < 5
                }
              >
                Update Note
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-5">
        <h2>Your Notes</h2>
        <div className="container">
          {notes.length === 0 && "No notes to display"}
        </div>

        {notes.map((note) => {
          return (
            <NoteItem
              key={note._id}
              updateNote={updateNote}
              note={note}
              showAlert={props.showAlert}
              changeVisible={changeVisible}
              deleteNote={deleteNote}
            />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
