const express = require('express');
const path = require('path');

const app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// API calls

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});
  
  
const port = process.env.PORT || 5000;
app.listen(port, () => `Server running on port ${port}`);