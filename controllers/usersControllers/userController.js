import User from "../../models/User.js"

export const getUserProfile = async (req, res) => {
    try {
        const user = await User.find({ username: req.username });
        if (!user) {
            res.status(404).json({
                message: 'user not found'
            });
        }

        res.status(200).json({
            message: 'Done',
            data: {
                user
            }
        })
    } catch (err) {
        logEvents(err.message, 'errorLog.txt');
        console.log(err.message);
        res.status(500).json({
            message: err.message
        });
    }
};