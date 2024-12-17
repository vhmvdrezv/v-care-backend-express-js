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
                services: ['675d5dac076f19aa5a6c1ed9'],
                role: "پزشک",
                firstname: "علی",
                lastname: "رضایی",
                age: "34",
                gender: "male",
                city: '673cb735a8c70678158728b4',
                phone: '09191111111',
                status: "active"
            }
        ]);
        
        console.log(`Services added: ${serviceProviders}`);


    } catch (err) {
        console.log(err);
    } finally {
        mongoose.connection.close();
    }
}

run();