const newsModel = (connection, Sequelize) => {
    const News = connection.define('news', {
        title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        date: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW
        },
        body: {
            type: Sequelize.STRING,
            allowNull: false
        },
        image: {
            type: Sequelize.BLOB
        }
    });

    return News;
}

module.exports = newsModel;