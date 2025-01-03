import jwt from 'jsonwebtoken';
import CustomError from '../utils/customError.js';

const verifyJWT = async (req, res, next) => {
    const headerToken = req.headers.authorization;
    if (!headerToken || !headerToken.startsWith('Bearer ')) {
        const error = new CustomError('توکن را وارد نکردید یا توکن اشتباه است.', 401);
        return next(error);
    }

    const jwtToken = headerToken.split(' ')[1];

    jwt.verify(
        jwtToken,
        process.env.ACCESS_TOKEN_SECRET_KEY,
        (error, decoded) => {
            if (error) {
                const error = new CustomError('توکن منقضی شده است یا اشتباه است.', 401);
                return next(error);
            } else {
                req.userId = decoded.sub;
                req.role = decoded.role;
                next();
            }
        }
    )
};

export default verifyJWT;