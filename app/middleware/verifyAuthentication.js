const JWT = require('jsonwebtoken');
require('dotenv').config();

const verifyAuthentication = {};

verifyAuthentication.verifyToken = (req, res, next) => {
    const token = req.headers['token'];

    if (!token) {
        return res.status(403).send({
            message: 'No hay token'
        });
    }

    JWT.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: 'Token invalido'
            });
        }

        req.userId = decoded.id;
        next();
    });
};

module.exports = verifyAuthentication;