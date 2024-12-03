import { logEvents } from "../middlewares/logEvents.js";
import Article from "../models/Article.js";
import createArticleValidator from "../validators/articleValidators/createArticleValidator.js";

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

export const createArticleHandler = async (req, res) => {
    const { error } = createArticleValidator.validate(req.body);
    if (error) {
        return res.status(400).json({
            message: error.message
        });
    }

    try {

        let article;
        if (req.file) {
            article = await Article.create({
                title: req.body.title,
                imageUrl: `/media/articleImages/${req.file.filename}`,
                body: req.body.body,
                author: req.body.author,
                status: req.body.status
            });
        } else {
            article = await Article.create({
                title: req.body.title,
                imageUrl: null,
                body: req.body.body,
                author: req.body.author,
                status: req.body.status
            });
        }

        res.status(201).json({
            message: "مقاله آپلود شد.",
            data: {
                article
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