import mongoose from 'mongoose';
import TimeSlot from '../models/TimeSlot.js';

const seedTimeSlots = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/vcare-backend', {
        });

        
        const timeSlots = [
            // تایم های علی رضایی
            {
                serviceProvider: '6771404222f61edd4aa814e1',
                date: new Date('2025-01-01'),
                startTime: '09:00',
                endTime: '9:30',
                status: 'available',
            },
            {
                serviceProvider: '6771404222f61edd4aa814e1',
                date: new Date('2025-01-01'),
                startTime: '10:00',
                endTime: '10:30',
                status: 'available',
            },
            {
                serviceProvider: '6771404222f61edd4aa814e1',
                date: new Date('2025-01-01'),
                startTime: '11:00',
                endTime: '11:30',
                status: 'available',
            },
            {
                serviceProvider: '6771404222f61edd4aa814e1',
                date: new Date('2025-01-02'),
                startTime: '09:00',
                endTime: '9:30',
                status: 'available',
            },
            {
                serviceProvider: '6771404222f61edd4aa814e1',
                date: new Date('2025-01-02'),
                startTime: '10:00',
                endTime: '10:30',
                status: 'available',
            },
            {
                serviceProvider: '6771404222f61edd4aa814e1',
                date: new Date('2025-01-02'),
                startTime: '11:00',
                endTime: '11:30',
                status: 'available',
            },
            // تایم های مژده صبور
            {
                serviceProvider: '6771404222f61edd4aa814e5',
                date: new Date('2025-01-01'),
                startTime: '08:00',
                endTime: '15:00',
                status: 'available',
            },
            {
                serviceProvider: '6771404222f61edd4aa814e5',
                date: new Date('2025-01-02'),
                startTime: '08:00',
                endTime: '15:00',
                status: 'available',
            },
            {
                serviceProvider: '6771404222f61edd4aa814e5',
                date: new Date('2025-01-03'),
                startTime: '08:00',
                endTime: '15:00',
                status: 'available',
            },
        ];

        await TimeSlot.insertMany(timeSlots);
        console.log('Seed data inserted successfully');
        mongoose.connection.close();
    } catch (error) {
        console.error('Error seeding data:', error);
        mongoose.connection.close();
    }
};

seedTimeSlots();