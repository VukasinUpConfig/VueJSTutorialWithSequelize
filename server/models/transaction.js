

module.exports = (sequelize, Datatypes) =>
{
    const Transaction = sequelize.define('Transaction',
    {
        id:
        {
            type: Datatypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        transactionDate:
        {
            type: Datatypes.DATE,
            allowNull: false,
            defaultValue: Datatypes.NOW
        },
        transactionType: 
        {
            type: Datatypes.STRING,
            allowNull: false,
            trim: true
        }, 
        description:
        {
            type: Datatypes.STRING,
            allowNull: false
        },
        charge:
        {
            type: Datatypes.NUMBER,
            defaultValue: 0
        },
        deposit:
        {
            type: Datatypes.NUMBER,
            defaultValue: 0
        },
        notes:
        {
            type: Datatypes.STRING,
            defaultValue: ''
        },

    });

    // Transaction.associate = (models) =>
    // {
    //     models.Transaction.belongsTo(models.User, {as: 'UserRef', foreignKey: 'UserId'});
    // };

    return Transaction;
}