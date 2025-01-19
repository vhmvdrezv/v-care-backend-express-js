import CustomError from "../utils/customError.js";

const verifyRoles = (...roles) => {
    return (req, res, next) => {
        if (roles.includes(req.role)) {
            next();
        } else {
            next(new CustomError('دسترسی غیر مجاز', 403));
        }
    }
}

export default verifyRoles;