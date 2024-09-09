import React from "react";
import { useNavigate } from "react-router-dom";

const NoteItem = (props) => {
  const { note, deleteNote, showAlert, updateNote } = props;
  const navigate = useNavigate(); // Hook for navigation

  const handleViewDetails = () => {
    navigate("/note-details", { state: { note } }); // Pass note details via state
  };

  return (
    <div className="col-md-3">
      <div className="card my-3" style={{ width: "18rem" }}>
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
          <i
            className="fa-solid fa-trash"
            onClick={() => {
              deleteNote(note._id);
              showAlert("Deleted Successfully", "success");
            }}
          ></i>
          <i
            className="fa-solid fa-pen-to-square mx-3"
            onClick={() => {
              updateNote(note);
            }}
          ></i>
          <button
            className="btn btn-info mt-2"
            onClick={handleViewDetails} // Navigate and pass state
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
