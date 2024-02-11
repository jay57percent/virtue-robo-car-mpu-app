const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

mongoose.connect('mongodb+srv://react2:12345@react2.affy6af.mongodb.net/mpu6050?retryWrites=true&w=majority');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Define schema and model for sensor data
const sensorDataSchema = new mongoose.Schema({
    accelerometer: { type: Object, required: true },
    gyroscope: { type: Object, required: true },
    temperature: { type: Number, required: true },
    timestamp: { type: Date, required: true },
});

const SensorData = mongoose.model('sensor_datas', sensorDataSchema);
app.use(cors());
// API endpoint to fetch sensor data
app.get('/api/sensor-data', async (req, res) => {
    try {
        const sensorData = await SensorData.find().sort({ timestamp: -1 }).limit(1);  // Change limit as per your requirement
        res.json(sensorData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
