import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Sensor_data from './components/Sensor_data';
function App() {
    const [sensorData, setSensorData] = useState([]);

    useEffect(() => {
        const fetchData = () => {
            axios.get('http://localhost:5000/api/sensor-data')
                .then(response => {
                    console.log('API Response:', response.data);
                    setSensorData(response.data);
                })
                .catch(error => {
                    console.error('Error fetching sensor data:', error);
                });
        };
        fetchData();
        const intervalId = setInterval(fetchData, 1000);
        return () => clearInterval(intervalId);
    }, []);

    const formatValue = (value) => {
        return value.toFixed(3);
    };

    

    return (
        <div className="app-container">
          <h1 className='title'>Sensor Data</h1>
          {sensorData.map(data => (
            <li key={data.id} className="sensor-group">
              <div className="row">
                <Sensor_data title="Accelerometer X:" sensorData={formatValue(data.accelerometer.x)} />
                <Sensor_data title="Accelerometer Y:" sensorData={formatValue(data.accelerometer.y)} />
                <Sensor_data title="Accelerometer Z:" sensorData={formatValue(data.accelerometer.z)} />
              </div>
              <div className="row">
                <Sensor_data title="Gyroscope X:" sensorData={formatValue(data.gyroscope.x)} />
                <Sensor_data title="Gyroscope Y:" sensorData={formatValue(data.gyroscope.y)} />
                <Sensor_data title="Gyroscope Z:" sensorData={formatValue(data.gyroscope.z)} />
              </div>
              <div className="row">
                <Sensor_data title="Temperature:" sensorData={formatValue(data.temperature)} />
              </div>
            </li>
          ))}
          
        </div>
      );
}

export default App;
