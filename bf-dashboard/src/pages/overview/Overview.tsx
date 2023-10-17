import"./overview.scss"

import { useState } from "react"

import Gallery from "../../components/gallery/Gallery";
import Dropdown from "../../components/dropdown/Dropdown";

const Overview = () => {
  const [selectedFolder, setSelectedFolder] = useState<string>('');
  return (
    <div className="home">
      <Dropdown setSelectedFolder={setSelectedFolder} />
      <div className="box box1">
        <Gallery selectedFolder={selectedFolder} />
      </div>
    </div>
  )
}

export default Overview