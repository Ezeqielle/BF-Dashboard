import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function NewView() {
  const [images, setImages] = useState<File[]>([]);
  const [folderPath, setFolderPath] = useState<string>('');
  //const allowedExtensions = ['.jpg', '.jpeg', '.png'];

  const handleImageDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    const files = Array.from(e.dataTransfer.files);
    setImages(files);
  };

  const handleUpload = () => {
    if (images.length === 0) {
      alert('Please add some images first.');
      return;
    }

    // Create a folder with the current date on the server
    axios.post('http://localhost:5174/api/createFolder')
      .then((response) => {
        setFolderPath(response.data.folderPath);

        // Upload images to the server
        const formData = new FormData();
        images.forEach(file => {
          formData.append('images', file);
        });

        axios.post(`http://localhost:5174/api/uploadImages/${folderPath}`, formData)
          .then((response) => {
            console.log('Images uploaded:', response.data);
          })
          .catch((error) => {
            console.error('Error uploading images:', error);
          });
      })
      .catch((error) => {
        console.error('Error creating folder:', error);
      });
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div>
      <h1>Image Upload</h1>
      <Link to='/overview'>
        <button>Go back</button>
      </Link>
      <div
        onDrop={handleImageDrop}
        onDragOver={handleDragOver}
        style={{ border: '2px dashed #ccc', padding: '20px', textAlign: 'center' }}
      >
        <p>Drag and drop images here.</p>
        {images.length > 0 && (
          <div>
            <h2>Uploaded Images:</h2>
            <ul>
              {images.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          </div>
        )}
        <button onClick={handleUpload}>Upload Images</button>
      </div>
    </div>
  );
}

export default NewView;