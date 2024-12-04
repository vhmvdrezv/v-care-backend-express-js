import jwt from 'jsonwebtoken';

const optionalVerifyJWT = (req, res, next) => {
    const headerToken = req.headers.authorization;

    if (!headerToken || !headerToken.startsWith('Bearer ')) {
        return next();
    }

    const jwtToken = headerToken.split(' ')[1];

    jwt.verify(
        jwtToken,
        process.env.ACCESS_TOKEN_SECRET_KEY,
        (error, decoded) => {
            if (!error) {
                // Attach user info if token is valid
                req.username = decoded.username;
                req.role = decoded.role;
            } 
            next();
        }
    );
};

export default optionalVerifyJWT;