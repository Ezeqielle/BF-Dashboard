import React, { useEffect, useState } from 'react';

import Dashboard from '../../components/dashboard/Dashboard';

const Gallery: React.FC<{ selectedFolder: string }> = ({ selectedFolder }) => {
  const apiUrl = 'http://localhost:5174/api/images';
  const [images, setImages] = useState<string[]>([]);
  useEffect(() => {
      if (selectedFolder) {
        fetch(`${apiUrl}/${selectedFolder}`)
          .then((response) => response.json())
          .then((data) => {
            const fullImageUrls = data.map((imageName: string) => apiUrl + "/" + selectedFolder + "/" + imageName);
          setImages(fullImageUrls);
          })
          .catch((error) => {
            console.error('Error fetching images:', error);
          });
      }
  }, [selectedFolder]);
  return (
    <div>
      <Dashboard images={images} />
    </div>
  );
};

export default Gallery;
