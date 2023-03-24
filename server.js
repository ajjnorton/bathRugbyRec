const express = require('express');
const path = require('path');

const app = express();

app.use(express.static('./dist/bath-rugby-rec'));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '/dist/bath-rugby-rec/index.html'))
});

app.listen(process.env.PORT || 8080)
