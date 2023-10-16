import "./menu.scss"
import React, { useEffect, useState } from 'react';

const apiUrl = 'http://localhost:5174/api/folders'; // Update the URL if needed

const Menu: React.FC = () => {
  const [folders, setFolders] = useState<string[]>([]);

  useEffect(() => {
    // Fetch folder names from the local server
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setFolders(data);
      })
      .catch((error) => {
        console.error('Error fetching folders:', error);
      });
  }, []);

  return (
    <select>
      {folders.map((folderName, index) => (
        <option key={index} value={folderName}>
          {folderName}
        </option>
      ))}
    </select>
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