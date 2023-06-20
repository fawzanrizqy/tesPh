
const jwt = require('jsonwebtoken');
const privateKey = 'tesphiraka'


function signToken(payload) {
    return jwt.sign(payload, privateKey);
}

function verifyToken(token) {
    return jwt.verify(token, privateKey);
}

module.exports = { signToken, verifyToken }