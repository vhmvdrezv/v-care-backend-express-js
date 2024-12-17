import mongoose from "mongoose";
import connectDB from "../configs/dbConn.js";
import Service from "../models/Service.js";


const run = async () => {
    try {
        await connectDB();
        console.log('connected to database');

        const services = await Service.insertMany([
            { title: 'ویزیت پزشک عمومی', status: 'active' },
            { title: 'پرستار مقیم', status: 'active' },
            { title: 'تزریقات و سرم درمانی', status: 'active' },
            { title: 'پانسمان و بخیه', status: 'active' },
            { title: 'بازکردن گج', status: 'active' },
            { title: 'لاواژ/گاواژ/سونداژ', status: 'active' },
            { title: 'مراقبت از استوما', status: 'active' },
            { title: 'نوار قلب (ECG)', status: 'active' },
            { title: 'تست های آزمایشگاهی', status: 'active' },
            { title: 'آمبولانس خصوصی', status: 'active' },
            { title: 'اجاره تجهیزات', status: 'active' },
            { title: 'مشاوره تغذیه', status: 'active' },
            { title: 'توانبخشی', status: 'active' },
        ]);
        
        console.log(`Services added: ${services}`);


    } catch (err) {
        console.log(err);
    } finally {
        mongoose.connection.close();
    }
}

run();