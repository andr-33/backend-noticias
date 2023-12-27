const userModel = (connection, Sequelize) => {
    const User = connection.define('user', {
        username: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });

    return User;
}

module.exports = userModel;