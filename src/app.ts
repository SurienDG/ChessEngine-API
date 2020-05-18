
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
    const { user } = req.body;
    console.log(user);
    UserModel.findOne({userName: user}, (err, result) => {
        if (err) {
            res.status(500).json(err);
        }
        else if (!result) {
            res.send('nada');
        }
        else {
            res.send(result);
        }
    });
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

app.put('/', (req, res) => {
    res.send('PUT handler');
});

app.post('/newUser', (req, res) => {
    // TODO: validate the request before making a model here (like ensuring name isnt taken etc)
    const model = new UserModel({userName: req.query.name});
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


// set option new:true otherwise it spits out the old document (dunno how yet)
app.post('/newGame', (req, res) => {
    // find the game the user has going and change whatever gameState they had to a new game
    UserModel.findOneAndUpdate({userName: req.query.name}, {'FEN': 'A_NEW_FEN'},  (err, doc) => {
        if (err) {
            // handle it
        }
        else if (!doc) {
            // handle it
        }
        else {
            res.send(doc);
        }
    });
});


app.delete('/deleteUser', (req, res) => {
    UserModel.deleteOne({userName: req.query.name}, (err) =>{
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


