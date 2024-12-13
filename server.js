const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// In-memory storage for simplicity
const templates = [];

// API to upload a template
app.post('/api/upload-template', (req, res) => {
  const { name, description, link } = req.body;
  if (!name || !description || !link) {
    return res.status(400).json({ success: false, message: 'All fields are required.' });
  }
  templates.push({ name, description, link });
  res.json({ success: true, message: 'Template uploaded successfully!' });
});

// API to get all templates
app.get('/api/get-templates', (req, res) => {
  res.json(templates);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
