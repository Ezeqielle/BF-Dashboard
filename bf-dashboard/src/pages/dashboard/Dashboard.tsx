import"./dashboard.scss"
import React, { useEffect, useState } from 'react';

const apiUrl = 'http://localhost:5174/api/images';

const Dashboard: React.FC = () => {
  const [selectedFolder, setSelectedFolder] = useState<string>('');
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

  const handleFolderSelect = (folder: string) => {
    setSelectedFolder(folder);
  };
  return (
    <div className="home">
      <div className="box box1">Box1</div>
      <div className="box box2">Box2</div>
      <div className="box box3">Box3</div>
      <div className="box box4">Box4</div>
    </div>
  )
}

export default Dashboard