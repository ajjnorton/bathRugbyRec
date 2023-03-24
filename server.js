const express = require('express');
const path = require('path');
const sslRedirect = require('heroku-ssl-redirect').default

const app = express();


app.use(sslRedirect(['production'], 301));

app.use(express.static('./dist/bath-rugby-rec'));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '/dist/bath-rugby-rec/index.html'))
});


const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);

})