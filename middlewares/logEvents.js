import {v4 as uuid} from 'uuid';
import {format} from 'date-fns';

import path from 'path';
import url from 'url';
import fs from 'fs';
import fsPromises from 'fs/promises';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logEvents = async (message, logFile) => {
    const dateFormat = format(Date(), 'yyyy-MM-dd\tHH:mm:ss');
    const logItem = `${dateFormat}\t${uuid()}\t${message}\n`;

    try {
        if (!fs.existsSync(path.join(__dirname, '..', 'logs'))){
            await fsPromises.mkdir(path.join(__dirname, '..', 'logs'));
        }
        await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logFile), logItem);
    } catch (err) {
        console.log(err);
    }
}


const logger = (req, res, next) => {
    console.log(`${req.method}\t${req.path}`);
    logEvents(`${req.method}\t${req.headers.origin}\t${req.path}`, 'reqLog.txt');
    next();
}

export { logEvents, logger };