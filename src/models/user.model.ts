// import {mongoose} from 'mongoose';
import  mongoose = require('mongoose');


const user = process.env.DATABASEUSER;
const password = process.env.DATABASEPASS;
const database = process.env.DATABASENAME;
const server = process.env.DATABASESERVER;


mongoose.connect(`mongodb+srv://${user}:${password}@${server}/${database}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true });

const UserSchema = new mongoose.Schema({
    player1: {type: String, default: null},
    player2: {type: String, default: null},
    gameid: {type: Number, default: 0},
    FEN: { type: String, default: 'newGameString'},
    AIOn: { type: Boolean, default: false}
});
const UserModel = mongoose.model('User', UserSchema);

export default UserModel;