
import express from 'express';
const app = express();
const port = 3000;

import https from 'https';
import bodyParser from 'body-parser';
import { validate, validateAndMakeMove } from 'chess_functions';


app.use(bodyParser.json());


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:' + port);
    next();
});

app.get('/ExistingGames', (req, res) => {
    const userid = req.body;
    // do data base query to get gameids for user\

    // res.json(// put array of game id objects here)
});

app.get('/ExistingGame', (req, res) => {
    const { userid, gameid } = req.body;
    // do data base query user using user id and game id

    // res.json(// put game id & FEN object)
});

app.put('/MakeMove', (req, res) => {
    const { userid, gameid, OLDFEN, NEWFEN, AI } = req.body;

    // check database if OLDFEN is equal to data base if not
    // res.status(500).json({message: "out of sync", updatedFEN: FENFROMDATABASE})

    // if not continue call validate
    // if (AI) {
    /*validateAndMakeMove(OLDFEN, NEWFEN).then((FEN) => {

    }).catch((err : String) => {
        console.error(err);
    });
    // }*/
    /*else {
        validate(OLDFEN, NEWFEN).then((result) => {
            res.json({FEN*: NEWFEN})
        }).catch((err: String)=> {
            res.status(400).json({FEN: OLDFEN})
        })
    }*/
    // update database

});


// implement like this
// https://hackernoon.com/set-up-ssl-in-nodejs-and-express-using-openssl-f2529eab5bb
// https.createServer(app).listen(port, () => console.log(`Listening on port ${port}!`));



app.listen(port, () => console.log(`Listening on port ${port}!`));


