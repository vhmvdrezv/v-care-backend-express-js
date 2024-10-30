import jwt from 'jsonwebtoken';

const verifyJWT = async (req, res, next) => {
    const headerToken = req.headers.authorization;
    if (!headerToken || !headerToken.startsWith('Bearer ')) {
        return res.status(401).json({
            error: 'توکن صحیح نیست.'
        });
    }

    const jwtToken = headerToken.split(' ')[1];

    jwt.verify(
        jwtToken,
        process.env.ACCESS_TOKEN_SECRET_KEY,
        (error, decoded) => {
            if (error) {
                console.log(error);
            } else {
                req.username = decoded.username;
                req.role = decoded.role;
                next();
            }
        }
    )
};

export default verifyJWT;