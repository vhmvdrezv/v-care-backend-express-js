import mongoose from "mongoose";
import connectDB from "../config/dbConn.js";
import Service from "../models/Service.js";
import ServiceProvider from "../models/ServiceProvider.js";


const run = async () => {
    try {
        await connectDB();
        console.log('connected to database');

        const serviceProviders = await ServiceProvider.insertMany([
            {
                services: ['67713f4c1a63549c1e2aefa8'],
                role: "پزشک",
                firstname: "علی",
                lastname: "رضایی",
                age: "34",
                gender: "male",
                city: '6771325018384b10eb897994',
                phone: '09191111111',
                status: "active"
            },
            {
                services: ['67713f4c1a63549c1e2aefa8'],
                role: "پزشک",
                firstname: "الناز",
                lastname: "محمدی",
                age: "29",
                gender: "female",
                city: '6771325018384b10eb897994',
                phone: '09192222222',
                status: "active"
            },
            {
                services: ['67713f4c1a63549c1e2aefa8'],
                role: "پزشک",
                firstname: "حامد",
                lastname: "منفرد",
                age: "41",
                gender: "male",
                city: '6771325018384b10eb897994',
                phone: '09193333333',
                status: "active"
            },
            {
                services: ['67713f4c1a63549c1e2aefa9'],
                role: "پرستار",
                firstname: "فاطمه",
                lastname: "حسنی",
                age: "35",
                gender: "female",
                city: '6771325bed6b4d14c5e2ccc9',
                phone: '09194444444',
                status: "active"
            },
            {
                services: ['67713f4c1a63549c1e2aefa9'],
                role: "پرستار",
                firstname: "مژده",
                lastname: "صبور",
                age: "28",
                gender: "female",
                city: '6771325bed6b4d14c5e2ccc9',
                phone: '09195555555',
                status: "active"
            },
        ]);
        
        
        console.log(`Services added: ${serviceProviders}`);


    } catch (err) {
        console.log(err);
    } finally {
        mongoose.connection.close();
    }
}

run();