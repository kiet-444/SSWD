const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    verifyToken: (req, res, next) => {
        //  Check for the presence of the Authorization header
        if (!req.headers.authorization) {
            return res.status(401).send({ message: 'Unauthorized: Token not provided' });
        }
        const token = req.headers.authorization.slice(7, req.headers.authorization.length);
        if (!token) {
            res.status(401).send({ message: 'Unauthorized: Token not provided' });
        }

        // Verify the JWT token
        jwt.verify(token, 'ManDan', (err, decoded) => {
            if (err) {
                return res.status(401).send({ message: 'Unauthorized: Invalid token' });
            }

            req.decoded = decoded;
            next();
        });
    },
    hashPassword: async (plainPassword) => {
        try {
            const saltRounds = 13;
            const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
            // console.log("hashedPassword", await bcrypt.hash("123456", saltRounds));
            return hashedPassword;
        } catch (error) {
            throw error;
        }
    }
}