import "./dropdown.scss"
import React, { useEffect, useState } from 'react';

const apiUrl = 'http://localhost:5174/api/folders'; // Update the URL if needed

const Dropdown: React.FC<{ setSelectedFolder: (folder: string) => void }> = ({ setSelectedFolder }) => {
  const [folders, setFolders] = useState<string[]>([]);

  useEffect(() => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setFolders(data);
      })
      .catch((error) => {
        console.error('Error fetching folders:', error);
      });
  }, []);

  const handleFolderSelect = (folder: string) => {
    setSelectedFolder(folder); // Call the function from the parent component
  };

  return (
    <div>
      <select onChange={(e) => handleFolderSelect(e.target.value)}>
        <option value="">Select a folder</option>
        {folders.map((folder, index) => (
          <option key={index} value={folder}>
            {folder}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;