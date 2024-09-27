import React, { useContext, useState } from "react";
import NoteContext from "../context/notes/NoteContext";
import {
  Card,
  FormControlLabel,
  Switch,
  Box,
  Button,
  Typography,
} from "@mui/material";

const AddNote = (props) => {
  const context = useContext(NoteContext);
  const { addNote } = context;
  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
    visible: false, // Default to public
  });

  const handleClick = (e) => {
    e.preventDefault(); // Prevent page reload
    addNote(note.title, note.description, note.tag, note.visible); // Pass visibility
    setNote({
      title: "",
      description: "",
      tag: "",
      visible: true, // Reset visibility to default
    });
    props.showAlert("Note Added Successfully", "success");
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleVisibilityChange = (e) => {
    setNote({ ...note, visible: e.target.checked }); // Toggle visibility
  };

  return (
    <Card
      component="form"
      sx={{
        mt: 3,
        width: "80%",
        outline: "1px solid #ccc",
        padding: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h4" align="center" sx={{ mb: 3 }}>
        Add a Note
      </Typography>
      <div className="container my-5">
        <form className="my-4">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              aria-describedby="emailHelp"
              onChange={onChange}
              minLength={5}
              required
              value={note.title}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              onChange={onChange}
              minLength={5}
              required
              value={note.description}
              rows={3} // You can adjust the number of rows as needed
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              onChange={onChange}
              value={note.tag}
            />
          </div>
          <FormControlLabel
            control={
              <Switch
                checked={note.visible}
                onChange={handleVisibilityChange}
                name="visibility"
                color="primary"
              />
            }
            label={note.visible ? "Public" : "Private"}
          />
          <Box display="flex" justifyContent="center" mt={3}>
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              onClick={handleClick}
              disabled={note.title.length < 3 || note.description.length < 5}
            >
              Add Note
            </Button>
          </Box>
        </form>
      </div>
    </Card>
  );
};

export default AddNote;
