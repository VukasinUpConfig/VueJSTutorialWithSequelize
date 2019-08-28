const express = require('express');
const app = express()
const api = require('./api');
//const morgan = require('morgan');
const bodyParser = require('body-parser');
const db = require('./models/db')
const port = 3000;
const seed = require('./models/seed/seed-db');
const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const cors = require('cors');

app.set('port', (process.env.PORT || 3000));//8081));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(cors());

app.use('/api', api);
app.use(express.static('static'));

app.use('/swagger', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

//app.use(morgan('dev'));

app.use(function(req, res, next)
{
    const err = new Error('Not found');
    err.status = 404;
    res.json(err);
});

//swaggerUI.setAppHandler(app);


db.sequelize.sync(
{
    //force: true
})
// .then(() =>
// {
//   return seed.insert();
// })
.then((res) =>
{
    //console.log(res);

    app.listen(port, () => 
    {
        
        console.log('running on server port' + port);
    })
})
// .then(() =>
// {
//     return seed.filenesto();
// })
// .then((res) =>
// {
//     console.log(res);
// })
// .catch((err) =>
// {
//     console.error(err);
// });
