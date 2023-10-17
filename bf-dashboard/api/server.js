import express from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';

const __dirname = path.resolve();
const app = express();
const port = 5174; // Choose a port for your server
const folderPath = path.join(__dirname, "images");

app.use(cors());

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

// Add a route to serve a single image from a specific folder
app.get('/api/images/:folderName/:imageName', (req, res) => {
  const folderName = req.params.folderName;
  const imageName = req.params.imageName;
  const imagePath = path.join(folderPath, folderName, imageName);

  fs.stat(imagePath, (err, stat) => {
    if (err || !stat.isFile()) {
      console.error('Error reading image:', err);
      res.status(404).send('Image Not Found');
    } else {
      // Set the appropriate content type based on the file extension
      const fileExtension = path.extname(imagePath).toLowerCase();
      const contentType = {
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.png': 'image/png',
      }[fileExtension] || 'application/octet-stream';

      res.setHeader('Content-Type', contentType);
      fs.createReadStream(imagePath).pipe(res);
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
