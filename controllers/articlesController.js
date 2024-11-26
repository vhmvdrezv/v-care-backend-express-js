import { logEvents } from "../middlewares/logEvents.js";
import Article from "../models/Article.js";

export const getAllArticles = async (req, res, next) => {
    const count = req.query?.count;
    try {
        let articles;
        if (typeof count === "number" && !Number.isNaN(count)) {
            articles = await Article.find().limit(count);
            return res.status(200).json({
                message: "لیست مقالات",
                data: {
                    articles
                }
            });
        }

        articles = await Article.find();

        res.status(200).json({
            message: "لیست مقالات",
            data: {
                articles
            }
        });
    } catch (err) {
        logEvents(err.message, 'errorLog.txt');
        console.log(err.message);
        res.status(500).json({
            message: err.message
        });
    }
};  
