import React from "react";
import { Card, CardContent, Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";

const NoteItem = (props) => {
  const { note, deleteNote, showAlert, updateNote, changeVisible } = props;

  const navigate = useNavigate(); // Hook for navigation

  const handleViewDetails = () => {
    navigate("/note-details", { state: { note } }); // Pass note details via state
  };

  // Limit description to 40 words
  const limitedDescription =
    note.description.split(" ").slice(0, 35).join(" ") +
    (note.description.split(" ").length > 35 ? "..." : "");

  return (
    <div className="col-md-3">
      <Card
        sx={{
          width: "18rem",
          height: "250px",
          overflow: "hidden",
          margin: "10px",
          display: "flex",
          flexDirection: "column",
          position: "relative", // Position for absolute positioning of the tag
        }}
      >
        <Typography
          variant="body2"
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
            color: "white", // Set text color to white
            backgroundColor: (theme) => theme.palette.secondary.main, // Set background to secondary color
            borderRadius: "5px",
            padding: "2px 4px",
          }}
        >
          {note.tag} {/* Assuming the note object has a tag property */}
        </Typography>
        <CardContent onClick={handleViewDetails} sx={{ flexGrow: 1 }}>
          <Typography variant="h5" component="div" marginBottom={1}>
            {note.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {limitedDescription}
          </Typography>
        </CardContent>
        <div
          style={{
            display: "flex",
            padding: "4px",
          }}
        >
          <IconButton
            onClick={() => {
              deleteNote(note._id);
              showAlert("Deleted Successfully", "success");
            }}
            style={{ marginRight: "5px" }} // Reduce gap between icons
          >
            <DeleteIcon color="secondary" />
          </IconButton>
          <IconButton
            onClick={() => {
              updateNote(note);
              showAlert("Update Successfully", "success");
            }}
            style={{ marginRight: "5px" }} // Reduce gap between icons
          >
            <EditIcon color="secondary" />
          </IconButton>
          <IconButton
            onClick={() => {
              changeVisible(note._id, note.visible);
              showAlert(
                note.visible
                  ? "Changed Visibility to Private Successfully"
                  : "Changed Visibility to Public Successfully",
                "success"
              );
            }}
          >
            {note.visible ? (
              <VisibilityIcon color="secondary" />
            ) : (
              <VisibilityOffIcon color="secondary" />
            )}
          </IconButton>
        </div>
      </Card>
    </div>
  );
};

export default NoteItem;
