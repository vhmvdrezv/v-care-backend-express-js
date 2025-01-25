import morgan from 'morgan';
import fs from 'fs';
import url from 'url';
import path from 'path';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create a write stream (in append mode)
const logStream = fs.createWriteStream(path.join(__dirname, '..', 'logs', 'reqLog.txt'), { flags: 'a' });

morgan.token('customDate', () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
});

const format = ':remote-addr :method :url :status :customDate';

// Create a morgan middleware that logs to both the console and the file
const logger = morgan(format, {
    stream: {
        write: (message) => {
            // Log to the file
            logStream.write(message);
            // Log to the console
            console.log(message.trim());
        }
    }
});

export default logger;
