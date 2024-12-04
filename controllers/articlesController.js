import { logEvents } from "../middlewares/logEvents.js";
import Article from "../models/Article.js";
import createArticleValidator from "../validators/articleValidators/createArticleValidator.js";

export const getAllArticles = async (req, res, next) => {
    try {
        let { status, per_page, page } = req.query;

        //req.role = 'admin'
        let filter = { status: 'active' };
        if (req?.role === 'admin') {
            filter = ['active', 'inactive'].includes(status) ? { status } : { };
        }
        
        page = isNaN(page) || page < 1 ? 1 : parseInt(page);
        per_page = isNaN(per_page) || per_page < 2 ? 2 : parseInt(per_page);
    
        const articles = await Article.find(filter).skip((page - 1) * per_page).limit(per_page)
        
        const total = await Article.countDocuments(filter);
        const totalPages = Math.ceil(total / per_page);
    
        let fullPath = req?.role === 'admin' && status ? `${req.protocol}://${req.get('host')}${req.baseUrl}${req.path}?status=${status}&` : `${req.protocol}://${req.get('host')}${req.baseUrl}${req.path}?` 

        let nextPage = page < totalPages ? `${fullPath}page=${page + 1}&per_page=${per_page}` : null;
        let pervPage = page > 1 ? `${fullPath}page=${page - 1}&per_page=${per_page}` : null;
        
        const baseUrl =  `${req.protocol}://${req.get('host')}`;

        const formattedArticles = articles.map(i => ({
            ...i.toObject(),
            imageUrl: i.imageUrl ? `${baseUrl}${i.imageUrl}` : null
        }));

        res.status(200).json({
            message: "لیست مقاله ها: ",
            data: {
                articles: formattedArticles, 
                nextPage, 
                pervPage
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