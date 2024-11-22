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
                return res.status(401).json({
                    message: "توکن خراب است یا منقضی شده است."
                })
            } else {
                req.username = decoded.username;
                req.role = decoded.role;
                next();
            }
        }
    )
};

export default verifyJWT;