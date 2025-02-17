import { useState } from "react";
import { Card, CardContent, Typography, Button, TextField, List, ListItem, ListItemText, ListItemIcon, IconButton } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import DeleteIcon from "@mui/icons-material/Cancel";
import "./UploadTableForm.css";

export default function UploadTableForm() {
  const [files, setFiles] = useState([]);
  const [tableName, setTableName] = useState("");
  const [tableSchema, setTableSchema] = useState("");

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
  
    if (!tableName || !tableSchema) {
      alert("Please fill in both Table Name and Table Schema");
      return;
    }
  
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });
    formData.append("tableName", tableName);
    formData.append("tableSchema", tableSchema);
  
    // Log the form data for debugging (converting files to readable structure)
    console.log("API Request Data:");
    console.log({
      tableName,
      tableSchema,
      files: files.map((file) => file.name)
    });
  
    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
  
      if (response.ok) {
        alert("Files uploaded successfully");
        setFiles([]);
        setTableName("");
        setTableSchema("");
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
          <Typography variant="h4" className="head">Upload or Drop file</Typography>
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
          <TextField
            label="Table Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={tableName}
            onChange={(e) => setTableName(e.target.value)}
          />
          <TextField
            label="Table Schema"
            variant="outlined"
            fullWidth
            margin="normal"
            value={tableSchema}
            onChange={(e) => setTableSchema(e.target.value)}
          />
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
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Upload
        </Button>
      </Card>
    </div>
  );
}
