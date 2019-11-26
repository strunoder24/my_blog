// Это чёрный список для компроментированных токенов
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');

const TokenBLSchema = new Schema({
    token: 'String',
    expiration_date: Date,
});

const TokenBL = mongoose.model('token_black_list', TokenBLSchema);

const checkForBlacklist = async (token) => {
    let status = {};
    
    await TokenBL.find({token}, (err) => {
        if (err) {
            status = {
                status: 'ERROR',
                msg: err
            }
        } else {
            status = {
                status: 'DENIED',
                msg: 'Current token is blacklisted'
            }
        }
    });
    
    if (Object.keys(status).length) return status;
    else return false
};

const addToBlacklist = async (token) => {
    const expiration_date = jwt.decode(token).exp * 1000;
    
    await TokenBL.create({
        token,
        expiration_date
    })
};

const cleanBlacklist = async () => {
    const currentDate = new Date();
    let idsForDelete = [];
    
    const list = await TokenBL.find({});
    
    for (let i = 0; i < list.length; i++) {
        if (list[i].expiration_date < currentDate) {
            idsForDelete.push(list[i]['_id'])
        }
    }
    
    await TokenBL.deleteMany({_id: idsForDelete}, err => {
        if (err) return err
    })
};

module.exports = {
    Schema: TokenBLSchema,
    TokenBL,
    
    addToBlacklist,
    checkForBlacklist,
    cleanBlacklist
};