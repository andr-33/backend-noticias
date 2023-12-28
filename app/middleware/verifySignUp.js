const db = require('../models/index.models');
const { Op } = require('sequelize');
const User = db.user;

const verifySignUp = {};

verifySignUp.verifyDuplicateUsernameOrEmail = (req, res, next) => {
    User.findOne({
        where: {
            [Op.or]: [
                { email: req.body.email },
                { username: req.body.username }
            ]
        }
    }).then(user => {
        if (user) {
            return res.status(400).send({
                message: 'Ups! el nombre de usuario o el correo ya estan en uso'
            });
        }

        next();
    });
};

module.exports = verifySignUp;