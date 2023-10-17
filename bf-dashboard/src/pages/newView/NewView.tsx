import"./newView.scss"

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

const NewView = () => {
  const onDrop = useCallback((acceptedFiles: Array<File>) => {
    const file = new FileReader();
    file.onload = () => {
      setPreview(file.result)
    }
    file.readAsDataURL(acceptedFiles[0])
  }
  , [])

  const { acceptedFiles, getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null)

  async function handleOnSubmit(e: React.SyntheticEvent) {
    e.preventDefault()
    if ( typeof acceptedFiles[0] === "undefined") return
    const formData = new FormData()

    formData.append("file", acceptedFiles[0])

    const results = await fetch("http://localhost:3000/api/upload", {
      method: "POST",
      body: formData
    }).then(res => res.json())

    console.log(results)
  }

  return (
    <form onSubmit={handleOnSubmit}>
      <button>Submit</button>
      <div className="home">
        <div className="box box1" {...getRootProps()}>
          Box11
          <input {...getInputProps()} />
          {
            isDragActive ?
              <p>Drop the files here ...</p> :
              <p>Drag 'n' drop some files here, or click to select files</p>
          }
          {preview && 
            <p className="imagesDrag">
              <img src={preview.toString()} alt="preview" />
            </p>
          }
        </div>
        <div className="box box2"{...getRootProps()}>
          Box12
          <input {...getInputProps()} />
          {
            isDragActive ?
              <p>Drop the files here ...</p> :
              <p>Drag 'n' drop some files here, or click to select files</p>
          }
          {preview && 
            <p className="imagesDrag">
              <img src={preview.toString()} alt="preview" />
            </p>
          }
        </div>
        <div className="box box3"{...getRootProps()}>
          Box13
          <input {...getInputProps()} />
          {
            isDragActive ?
              <p>Drop the files here ...</p> :
              <p>Drag 'n' drop some files here, or click to select files</p>
          }
          {preview && 
            <p className="imagesDrag">
              <img src={preview.toString()} alt="preview" />
            </p>
          }
        </div>
        <div className="box box4" {...getRootProps()}>
          Box14
          <input {...getInputProps()} />
          {
            isDragActive ?
              <p>Drop the files here ...</p> :
              <p>Drag 'n' drop some files here, or click to select files</p>
          }
          {preview && 
            <p className="imagesDrag">
              <img src={preview.toString()} alt="preview" />
            </p>
          }
        </div>
      </div>
    </form>
  )
}

export default NewView