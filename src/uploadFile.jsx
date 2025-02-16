import { useState } from "react";
import { Card, CardContent, Typography, Button, List, ListItem, ListItemText, ListItemIcon, IconButton } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import DeleteIcon from "@mui/icons-material/Cancel";
import "./UploadTableForm.css";

export default function UploadTableForm() {
  const [files, setFiles] = useState([]);
  

  const handleFileChange = (event) => {
    const newFiles = Array.from(event.target.files);
    setFiles([...files, ...newFiles]);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const newFiles = Array.from(event.dataTransfer.files);
    setFiles([...files, ...newFiles]);
  };

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (files.length === 0) {
      alert("Please upload at least one file");
      return;
    }

    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Files uploaded successfully");
        setFiles([]);
      } else {
        alert("Error uploading files");
      }
    } catch (error) {
      alert("Network error");
    }
  };

  return (
    <div className="upload-container">
      <Card className="upload-card">
        <div
          className="upload-dropzone"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          <Typography variant="h4" className='head'>Upload or Drop file</Typography>
          <div className="filesUpload">
            <input type="file" multiple hidden id="fileInput" onChange={handleFileChange} />
            <label htmlFor="fileInput">
              <Button variant="n" component="div" color="primary" className="btn" fullWidth>
                <CloudUploadIcon className="upload-icon" />
              </Button>
            </label>
          </div>
        </div>
        <CardContent>
          {files.length > 0 && (
            <List>
              {files.map((file, index) => (
                <ListItem key={index} secondaryAction={
                  <IconButton edge="end" aria-label="delete" onClick={() => removeFile(index)}>
                    <DeleteIcon />
                  </IconButton>
                }>
                  <ListItemIcon>
                    <InsertDriveFileIcon />
                  </ListItemIcon>
                  <ListItemText primary={file.name} secondary={`${(file.size / 1024).toFixed(2)} KB`} />
                </ListItem>
              ))}
            </List>
          )}
        </CardContent>
        <Button onClick={handleSubmit} variant="contained" color="primary" fullWidth>
          Upload
        </Button>
      </Card>
    </div>
  );
}
