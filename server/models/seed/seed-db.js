const models = require('../db');
const fs = require('fs');
const _USERS = require('./users.json');
const _TRANSACTIONS = require('./transactions.json');

module.exports = 
{
    insert:() =>
    {
        return new Promise((resolve, reject) =>
        {
            models.User.bulkCreate(_USERS)
            .then(() =>
            {
                return models.Transaction.bulkCreate(_TRANSACTIONS);//return
                
            })
            .then(res =>
            {
                console.log('success adding users and transactions');
                resolve('success adding users and transactions');
            })
            .catch(error => 
            {
                console.log(error);
                reject(error);
            })


        });
    },
    filenesto: () =>
    {
        return new Promise((resolve, reject) => 
        {
            const data = new Uint8Array(Buffer.from('Hello Node.js'));
            fs.writeFile('message.txt', data, (err) => {
            if (err) reject(err);
            console.log('The file has been saved!');
            resolve('nesto iz resolve');
        });
       
    });
    }
}