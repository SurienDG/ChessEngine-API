
import express from 'express';
const app = express();
const port = 3000;

import https from 'https';
import bodyParser from 'body-parser';
app.use(bodyParser.json());


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:' + port);
    next();
});

app.get('/', (req, res) => {
    res.json('tests');
});


// implement like this
// https://hackernoon.com/set-up-ssl-in-nodejs-and-express-using-openssl-f2529eab5bb
// https.createServer(app).listen(port, () => console.log(`Listening on port ${port}!`));



app.listen(port, () => console.log(`Listening on port ${port}!`));


