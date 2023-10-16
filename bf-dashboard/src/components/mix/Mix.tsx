import React, { useState } from 'react';
import Menu from '../menu/Menu'; // Import your Menu component
import Gallery from '../gallery/Gallery'; // Import your Gallery component

const App: React.FC = () => {
  const [selectedFolder, setSelectedFolder] = useState<string>('');

  return (
    <div>
      <Menu setSelectedFolder = {setSelectedFolder} />
      <Gallery selectedFolder = {selectedFolder} />
    </div>
  );
};

export default App;