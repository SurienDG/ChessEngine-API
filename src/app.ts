
import * as fs from 'fs';
import dotenv from 'dotenv';
import  secureEnv  from 'secure-env';

const dev = false;

if (dev) {
    dotenv.config();
} else {
    const envPass = fs.readFileSync('secret.txt').toString();
    process.env = secureEnv({ secret: envPass });
}

// for error codes as names?
import express from 'express';
import https from 'https';
import bodyParser from 'body-parser';
import { validate, validateAndMakeMove } from 'chess_functions';
import UserModel from './models/user.model';


const app = express();



app.use(bodyParser.json());


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:' + process.env.PORT);
    next();
});

app.get('/', (req, res) => {
    res.send('hello. its a get request');
});

app.get('/ExistingGames', (req, res) => {
    const userid = req.body;
    // do data base query to get gameids for user\

    // res.json(// put array of game id objects here)
});

app.get('/ExistingGame', (req, res) => {
    const { userID, gameID } = req.body;
    // do data base query user using user id and game id
    const item = UserModel.findOne({userName: userID}, (err, result) => {
        if (err) {
            res.status(500).json(err);
        }
        if (!result) {
            res.send('nada');
        }
    }).select('FEN');
    res.status(201).json(item);
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

app.post('/newUser', (req, res) => {
    if (!req.body) {
        // body missing thing to do
    }
    // TODO: validate the request before making a model here
    const model = new UserModel(req.body);
    model.save()
        .then(doc => {
            if (!doc) {
                return res.status(500).send(doc);
            }
            res.status(201).send(doc);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

app.post('/newGame', (req, res) => {
    if (!req.body) {
        // no user/gameid entered error them out
    }
    // const model = new UserModel(req.body);
    const { userid, gameID } = req.body;
    const userInfo = {'userName': userid, 'gameid': gameID};
    console.log(userInfo);
    // find the game the user has going and change whatever gameState they had to a new game
    UserModel.findOneAndUpdate(userInfo, {'FEN': 'newGameFEN'});
    res.send('new game created!');
});

app.put('/', (req, res) => {
    res.send('PUT handler');
});

app.delete('/deleteUser', (req, res) => {
    const { user } = req.body;
    UserModel.deleteOne({userName: user}, (err) =>{
        if (err) {
            // handle it
        }
    });
    res.send('all done');
});

app.patch('/', (req, res) => {
    res.send('PATCH handler');
});

// implement like this
// https://hackernoon.com/set-up-ssl-in-nodejs-and-express-using-openssl-f2529eab5bb
// https.createServer(app).listen(port, () => console.log(`Listening on port ${port}!`));



app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}!`));


