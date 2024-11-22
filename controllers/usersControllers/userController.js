import mongoose from "mongoose";
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

export const updateUserProfile = async (req, res) => {
    const { error } = req.body;
    if (error) {
        res.status(400).json({
            message: error.message
        });
    }

    if (req.body.city) {
        if (!mongoose.isValidObjectId(req.body.city)) {
            return res.status(400).json({
                message: 'آیدی شهر اشتباه است.'
            });
        }
    }

    try {
        const user = await User.findOne({ username: req.username });
        if (!user) {
            return res.status(404).json({
                message: "کاربر یافت نشد"
            });
        }

        const updatedUser = await User.findOneAndUpdate({
            username: req.username
        },{
            firstname: req.body.firstname,
            lasttname: req.body.lastname,
            age: req.body.age,
            gender: req.body.gender,
            city: req.body.city
        })

        return res.status(200).json({
            message: "کاربر با موقفیت ویرایش شد.",
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
    
}