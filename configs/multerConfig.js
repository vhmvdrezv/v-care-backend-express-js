import multer from "multer";
import fs from 'fs';
import fsPromises from 'fs/promises';
import url from 'url';
import path from 'path';
import { logEvents } from "../middlewares/logEvents.js";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadArticleImageBodyStorage = multer.diskStorage(
    {
        destination: async (req, file, cb) => {
            try {
                if (!fs.existsSync(path.join(__dirname, '..', 'media', 'articleImages', 'body'))) {
                    console.log('im here ')
                    fs.mkdirSync(path.join(__dirname, '..', 'media', 'articleImages', 'body'), { recursive: true });
                }
                cb(null, path.join(__dirname, '..', 'media', 'articleImages', 'body'));
            } catch (err) {
                logEvents(err.message, 'errorLog.txt');
                console.log(err.message);
                throw new Error(err.message);
            }
            
        }, 
        filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1000);
            cb(null,  uniqueSuffix + path.extname(file.originalname));
        }
    }
)

// File filter to accept only image files
const imageFileFilter = (req, file, cb) => {
    const allowedMimeTypes = ["image/jpeg", "image/png", "image/gif", "image/webp", 'image/jpg'];
    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true); // Accept the file
    } else {
        cb(new Error("Only image files are allowed!"), false); // Reject the file
    }
};

export const uploadArticleImageBody = multer({ 
    storage: uploadArticleImageBodyStorage,
    fileFilter: imageFileFilter
});

const uploadArticleImageStorage = multer.diskStorage(
    {
        destination: async (req, file, cb) => {
            try {
                if (!fs.existsSync(path.join(__dirname, '..', 'media', 'articleImages'))) {
                    console.log('im here ')
                    fs.mkdirSync(path.join(__dirname, '..', 'media', 'articleImages'), { recursive: true });
                }
                cb(null, path.join(__dirname, '..', 'media', 'articleImages'));
            } catch (err) {
                logEvents(err.message, 'errorLog.txt');
                console.log(err.message);
                throw new Error(err.message);
            }
            
        }, 
        filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1000);
            cb(null,  uniqueSuffix + path.extname(file.originalname));
        }
    }
)