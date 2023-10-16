import "./menu.scss"
import React, { useEffect, useState } from 'react';

const apiUrl = 'http://localhost:5174/api/folders'; // Update the URL if needed

const Menu: React.FC<{ setSelectedFolder: (folder: string) => void }> = ({ setSelectedFolder }) => {
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

export default Menu;


{/*
<div className="menu">
  {menu.map((item) => (
    <div className="item" key={item.id}>
      <span className="title">{item.title}</span>
      {item.listItems.map((listItem) => (
        <Link to={listItem.url} className="listItem" key={listItem.id}>
          <img src={listItem.icon} alt="" />
          <span className="listItemTitle">{listItem.title}</span>
        </Link>
      ))}
    </div>
  ))}
</div>
*/}