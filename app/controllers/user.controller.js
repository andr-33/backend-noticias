const db = require('../models/index.models');
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');
const { Op } = require('sequelize');
require('dotenv').config();
const User = db.user;

const userController = {};

userController.login = (req, res) => {
    User.findOne({
        where: {
            [Op.or]: [
                { email: req.body.email },
                { username: req.body.username }
            ]
        }
    }).then(user => {
        if (!user) {
            return res.status(404).send({
                message: 'Vaya! No hemos encontrado este usuario'
            });
        }

        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

        if (!passwordIsValid) {
            return res.status(401).send({
                message: 'Contraseña incorrecta'
            });
        }

        const token = JWT.sign(
            { id: user.id },
            process.env.JWT_SECRET,
            {
                algorithm: 'HS256',
                allowInsecureKeySizes: true,
                expiresIn: 86400
            }
        );

        res.status(200).send(token);

    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

userController.signup = (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    }).then(() => {
        res.status(200).send({
            message: 'Usuario creado :)'
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    })
};

module.exports = userController;