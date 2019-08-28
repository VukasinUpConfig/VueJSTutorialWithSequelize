//const Transaction = require('../../models/transaction')
const db = require('../../models/db');
const {Transaction} = db;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


module.exports = (router) =>
{
    router.get('/transaction/:year/:month', (req, res) =>
    {
        const UserId = req.get('UserId');
        const month = req.params.month - 1;//JS months are zero-based
        const year = req.params.year;
        const startDt = new Date(Date.UTC(year, month, 1, 0, 0, 0))
        const endDt = new Date(Date.UTC(year, month + 1, 1, 0, 0, 0))

        Transaction.findAll(
        {
            where:
            {
                UserId: UserId,
                transactionDate:
                {
                    [Op.lte]: endDt,
                    [Op.gte]: startDt
                }
            }
        })
        //.sort({'transactionDate': 1})
        .then(docs => res.status(200).json(docs))
        .catch(err => res.status(500).json(
            {
                message: 'error finding transaction for user',
                error: err
            }
        ));
    });

    router.get('/transaction/balance/:year/:month', (req, res) =>
    {
        const UserId = req.get('UserId');
        const month = req.params.month - 1;//JS months are zero-based
        const year = req.params.year;
        const endDt = new Date(Date.UTC(year, month + 1, 1, 0, 0, 0))

        Transaction.findAll(
        {
            where:
            {
                UserId: UserId,
                transactionDate: 
                {
                    [Op.lte]: endDt
                }
            },
            attributes:
            [
                [db.sequelize.fn('sum', db.sequelize.col('charge')), 'charges'],
                [db.sequelize.fn('sum', db.sequelize.col('deposit')), 'deposits']
            ]
        })
        .then(docs => res.status(200).json(docs))
        .catch(err => res.status(500).json(
            {
                message: 'error finding transaction for user' + err,
                error: err
            }
        ));
    });

    router.post('/transaction', (req, res) =>
    {   
        const UserId = req.get('UserId');

        Transaction.create(
            {
                transactionType: req.body.transactionType,
                description: req.body.description,
                charge: req.body.charge,
                deposit: req.body.deposit,
                notes: req.body.notes,
                UserId: UserId
            })
            .then((transaction) =>
            {
                res.json(transaction);
            })
            .catch(error =>
            {
                console.error(error);
                res.status(404).send(error);
            });
    });

    
}