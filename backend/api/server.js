import express from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import multer from 'multer';

const __dirname = path.resolve();
const app = express();
const port = 5174; // Choose a port for your server
const folderPath = path.join(__dirname, 'images');
const allowedExtensions = ['.jpg', '.jpeg', '.png']; // Add the extensions you want to allow

app.use(cors());

// Get a list of folders in the images directory
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

// Get a list of images in a specific folder
app.get('/api/images/:folderName', (req, res) => {
  const folderName = req.params.folderName;
  const images = [];

  fs.readdir(path.join(folderPath, folderName), (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      res.status(500).send('Server Error');
    } else {
      files.forEach(file => {
        // Extract the file extension
        const fileExtension = file.slice(((file.lastIndexOf('.') - 1) >>> 0) + 2);

        if (allowedExtensions.includes(`.${fileExtension.toLowerCase()}`)) {
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

// Add a route to create a folder with the current date
app.post('/api/createFolder', (req, res) => {
  const currentDate = new Date().toISOString().slice(0, 10); // Get the current date in 'YYYY-MM-DD' format
  const folderPath = path.join(__dirname, 'images', currentDate);

  try {
    fs.mkdirSync(folderPath, { recursive: true });
    res.json({ message: 'Folder created', folderPath });
  } catch (error) {
    console.error('Error creating folder:', error);
    res.status(500).json({ error: 'Server Error' });
  }
});

// Set up multer for handling image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Create a folder with the current date for each image upload
    const currentDate = new Date().toISOString().slice(0, 10); // Get the current date in 'YYYY-MM-DD' format
    const folderPath = path.join(__dirname, 'images', currentDate);

    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }
    
    cb(null, folderPath);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});


const fileFilter = (req, file, cb) => {
  const extension = path.extname(file.originalname).toLowerCase();
  if (allowedExtensions.includes(extension)) {
    return cb(null, true);
  }
  cb(new Error('Invalid file extension. Allowed extensions are .jpg, .jpeg, and .png'));
};

const upload = multer({ storage, fileFilter });

// Upload multiple images to the 'uploads' folder
app.post('/api/uploadImages', upload.array('images', 10), (req, res) => {
  if (req.fileValidationError) {
    return res.status(400).json({ error: req.fileValidationError.message });
  }

  const uploadedImages = req.files.map(file => file.originalname);
  res.json({ uploadedImages });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
