import mongoose from "mongoose";
import connectDB from "../configs/dbConn.js";
import Service from "../models/Service.js";
import ServiceProvider from "../models/ServiceProvider.js";


const run = async () => {
    try {
        await connectDB();
        console.log('connected to database');

        const serviceProviders = await ServiceProvider.insertMany([
            {
                services: ['67659b61f1e8923f0c073c06'],
                role: "پزشک",
                firstname: "علی",
                lastname: "رضایی",
                age: "34",
                gender: "male",
                city: '6765a3bfac5fd8a2104b27d4',
                phone: '09191111111',
                status: "active"
            },
            {
                services: ['67659b61f1e8923f0c073c06'],
                role: "پزشک",
                firstname: "الناز",
                lastname: "محمدی",
                age: "29",
                gender: "female",
                city: '6765a3bfac5fd8a2104b27d4',
                phone: '09192222222',
                status: "active"
            },
            {
                services: ['67659b61f1e8923f0c073c06'],
                role: "پزشک",
                firstname: "حامد",
                lastname: "منفرد",
                age: "41",
                gender: "male",
                city: '6765a3bfac5fd8a2104b27d4',
                phone: '09193333333',
                status: "active"
            },
            {
                services: ['67659b61f1e8923f0c073c07'],
                role: "پزشک",
                firstname: "فاطمه",
                lastname: "حسنی",
                age: "35",
                gender: "female",
                city: '6765a3c6ac5fd8a2104b27d7',
                phone: '09194444444',
                status: "active"
            },
            {
                services: ['67659b61f1e8923f0c073c07'],
                role: "پزشک",
                firstname: "مژده",
                lastname: "صبور",
                age: "28",
                gender: "female",
                city: '6765a3c6ac5fd8a2104b27d7',
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