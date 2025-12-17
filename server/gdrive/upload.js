const { google } = require('googleapis');
const credentials = require('./credentials.json');

const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ['https://www.googleapis.com/auth/drive'],
});

const drive = google.drive({
  version: 'v3',
  auth,
});
async function uploadFile(fileName, mimeType, filePath) {
    try {
      const res = await drive.files.create({
        requestBody: {
          name: fileName,
          mimeType: mimeType,
        },
        media: {
          mimeType: mimeType,
          body: fs.createReadStream(filePath),
        },
      });
      console.log('File uploaded:', res.data);
    } catch (error) {
      console.error('Error uploading file:', error.message);
    }
  }
  
  const fileName = 'example.jpg';
  const mimeType = 'image/jpeg';
  const filePath = 'path/to/your/file.jpg';
  
  uploadFile(fileName, mimeType, filePath);
  