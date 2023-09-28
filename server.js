const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const admin = require('firebase-admin');
const serviceAccount = require('*****')//put your keys from firebase account

const app = express();
const port = 3000;

// Initialize Firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'gs://omar-******.appspot.com', //put your firebase storage bucket
});

const bucket = admin.storage().bucket();


const storage = multer.memoryStorage();
const upload = multer({ storage });

app.use(bodyParser.json());

// Define a route for handling image uploads
app.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const file = bucket.file(req.file.originalname);
  const blobStream = file.createWriteStream({
    metadata: {
      contentType: req.file.mimetype,
    },
  });

  blobStream.on('error', (err) => {
    console.error(err);
    res.status(500).send('Error uploading file to Firebase.');
  });

  blobStream.on('finish', () => {
    res.status(200).send('File uploaded to Firebase successfully.');
  });

  blobStream.end(req.file.buffer);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
