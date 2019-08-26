module.exports = (sequelize, Datatypes) =>
{
    const User = sequelize.define('User',
    {
        id: {
            type: Datatypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        first: Datatypes.STRING,
        last: Datatypes.STRING,
        email:
        {
            type: Datatypes.STRING,
            validate:
            {
                isEmail: true
            }
        },
        password:
        {
            type: Datatypes.STRING,
            validate:
            {
                isAlphanumeric: true
            }
        },
        isActive: 
        {
            type: Datatypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
        
    });

    User.associate = (models) =>
    {
        models.User.hasMany(models.Transaction, {as: 'All_Transactions'});
    };

    return User;
}