import mongoose from 'mongoose';
import app from './app.js';
import connectDB from './config/dbConn.js';

const PORT = process.env.PORT || 3000;

connectDB();

mongoose.connection.once('open', () => {
    app.listen(
        PORT,
        () => { console.log(`Server is running on PORT ${PORT}`) }
    )
});