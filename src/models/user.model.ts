// import {mongoose} from 'mongoose';
import  mongoose = require('mongoose');

const user = 'dbAdmin';
const password = 'Ps5@BTqPHBqb';
const database = 'usersdb';
const server = 'cluster0-mjmqj.azure.mongodb.net';


mongoose.connect(`mongodb+srv://${user}:${password}@${server}/${database}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true });

const UserSchema = new mongoose.Schema({
    userName: String,
    gameid: Number,
    FEN: { type: String, default: 'newGameString'},
    AIOn: { type: Boolean, default: false}
});
const UserModel = mongoose.model('User', UserSchema);

export default UserModel;