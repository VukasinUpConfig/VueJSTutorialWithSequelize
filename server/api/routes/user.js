const db = require('../../models/db');
const {User} = db;//require('../../models');//(db.sequelize, db.Sequelize)
const {Transaction} = db;//require('../../models');//(db.sequelize, db.Sequelize)


module.exports = function(router)
{
    router.get('/user/:id', (req, res) =>
    {
        User.findByPk(req.params.id,
            {
                include: [
                    {
                        model: Transaction, as: 'All_Transactions',
                    }
                    // },
                    // {
                    //     model: User, as: 'UserRef'
                    // }
                ]
            })
        .then(docs => 
            {
                res.status(200).json(docs);
            }
            )
        .catch(err => 
            {
                console.error(err);
                res.status(500).json(
                    {
                        message: 'erro user ' + req.params.id,
                        error: err
                    });
            }
               
        );
    });

    router.get('/user/email/:email', function(req, res)
    {
        User.findOne({ where: { email: req.params.email } })
        .then(docs => res.status(200).json(docs))
        .catch(err => res.status(500).json(
            {
                message: 'error finding user',
                error: err
            })
        );
    });

    router.post('/user', (req, res) =>
    {
        //let user = new User(req.params);
        let newUser = 
        {
            first: req.body.first,
            last: req.body.last,
            email: req.body.email,
            password: req.body.password
        }
        
        console.log(req.body);

        //User.create(user)
        User.create(
        {
            first: req.body.first,
            last: req.body.last,
            email: req.body.email,
            password: req.body.password
        })
        .then((user) =>
        {
            res.json(user);
        })
        .catch(error =>
        {
            console.error(error);
            res.status(404).send(error);
        });
       
    });

    router.put('/user/:id', (req, res) =>
    {
        // let qry = {id: req.param.id};
        // let doc = 
        // {
        //     // first: req.body.first,
        //     // last: req.body.last,
        //     // email: req.body.email,
        //     // password: req.body.password,
        //     isActive: req.body.isActive
        // }

        User.update(
        { 
            isActive: req.body.isActive 
        },
        { 
            where: 
            {
                id: req.params.id 
            } 
        })
        .then(user =>
            {
                res.json(user);
            })
            .catch(error =>
            {
                console.error(error);
                res.status(404).send(error);
            })
    })
}