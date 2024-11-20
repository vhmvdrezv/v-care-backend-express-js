import jwt from 'jsonwebtoken';

export const createAccessToken = (payload) => {
    const accessToken = jwt.sign(
        payload,
        process.env.ACCESS_TOKEN_SECRET_KEY,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRATION
        }
    );
    return accessToken;
}

export const createRefreshToken = (payload) => {
    const refreshToken = jwt.sign(
        payload,
        process.env.REFRESH_TOKEN_SECRET_KEY,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRATION
        }
    );
    return refreshToken;
}


