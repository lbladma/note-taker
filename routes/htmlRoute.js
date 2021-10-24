const html = require('express').Router();
const path = require('path');


// route to get homepage
html.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '../public/index.html'))
);

// route for notes page
html.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '../public/notes.html'))
);

module.exports = html;