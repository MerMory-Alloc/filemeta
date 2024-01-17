const express = require('express');
const multer = require('multer');

const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

const storage = multer.memoryStorage();
const fileSizeLimit = 100 * 1024 * 1024; // 100 MB
const upload = multer({
  storage: storage,
  limits: {
    fileSize: fileSizeLimit,
    files: 1,
  },
});


// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Define route for the main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'views', 'index.html'));
});


app.post('/api/file-analyzer', upload.single('upfile'), (req, res) => {
    
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded!' });
  }

  const { originalname, mimetype, size } = req.file;

  res.json({
    name: originalname,
    type: mimetype,
    size: size,
  });


});
  

// Start the server
app.listen(port, () => {
  console.log(`Server is running`);
});
