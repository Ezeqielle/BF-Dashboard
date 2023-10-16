import express from 'express'
import fs from 'fs';
import path from 'path';
import cors from 'cors';

const __dirname = path.resolve();
const app = express();
const port = 5174; // Choose a port for your server
const folderPath = path.join(__dirname, "upload");

app.use(cors(
  {
    origin: 'http://localhost:5173'
  }
));

app.get('/api/folders', (req, res) => {
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      res.status(500).send('Server Error');
    } else {
      res.json(files);
    }
  });
});

app.get('/api/images/:folderName', (req, res) => {
  const folderName = req.params.folderName;
  const validExtensions = ['.jpg', '.jpeg', '.png']; // Add the extensions you want to allow
  const images = [];

  fs.readdir(path.join(folderPath, folderName), (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      res.status(500).send('Server Error');
    } else {
      files.forEach(file => {
        // Extract the file extension
        const fileExtension = file.slice(((file.lastIndexOf(".") - 1) >>> 0) + 2);

        if (validExtensions.includes(`.${fileExtension.toLowerCase()}`)) {
          images.push(file);
        }
      });
      res.json(images);
    }
  });
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});