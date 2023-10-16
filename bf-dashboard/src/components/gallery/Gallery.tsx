import React, { useEffect, useState } from 'react';

const apiUrl = 'http://localhost:5174/api/images'; // Update the URL for your server

const Gallery: React.FC<{ selectedFolder: string }> = ({ selectedFolder }) => {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    if (selectedFolder) {
      fetch(`${apiUrl}/${selectedFolder}`)
        .then((response) => response.json())
        .then((data) => {
          setImages(data);
        })
        .catch((error) => {
          console.error('Error fetching images:', error);
        });
    }
  }, [selectedFolder]);

  return (
    <div>
      <div>
        <h3>Images in the selected folder:</h3>
        <ul>
          {images.map((image, index) => (
            <li key={index}>
              <img src={image} alt={`Image ${index}`} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Gallery;
