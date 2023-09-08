import React, { useState, ChangeEvent } from "react";

interface FileUploadProps {
  onUpload: (file: File) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onUpload }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];

    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
      onUpload(file);
    } else {
      console.error("Invalid file format. Please select an image file.");
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {selectedFile && <p>Selected File: {selectedFile.name}</p>}
    </div>
  );
};

export default FileUpload;
