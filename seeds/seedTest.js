import mongoose from "mongoose";
import connectDB from '../config/dbConn.js';
import Service from "../models/Service.js";


const run = async () => {
    try {
        await connectDB();
        console.log('connected to database');

        const services = await Service.insertMany([
            { title: 'ویزیت پزشک عمومی', position: 1, status: 'active' },
            { title: 'پرستار مقیم', position: 2, status: 'active' },
            { title: 'تزریقات و سرم درمانی', position: 3, status: 'active' },
            { title: 'پانسمان و بخیه', position: 4, status: 'active' },
            { title: 'بازکردن گج', position: 5, status: 'active' },
            { title: 'لاواژ/گاواژ/سونداژ', position: 6, status: 'active' },
            { title: 'مراقبت از استوما', position: 7, status: 'active' },
            { title: 'نوار قلب (ECG)', position: 8, status: 'active' },
            { title: 'تست های آزمایشگاهی', position: 9, status: 'active' },
            { title: 'آمبولانس خصوصی', position: 10, status: 'active' },
            { title: 'اجاره تجهیزات', position: 11, status: 'active' },
            { title: 'مشاوره تغذیه', position: 12, status: 'active' },
            { title: 'توانبخشی', position: 13, status: 'active' },
        ]);
        
        console.log(`Services added: ${services}`);


    } catch (err) {
        console.log(err);
    } finally {
        mongoose.connection.close();
    }
}

run();