import React from 'react'

const Sensor_data = ({title, sensorData}) => {
    return (
      <div className="sensor-data-container">
        <div className='loader'></div>
            <div className="sensor-data-text">
                <h2>{title}</h2>
                <h3>{sensorData}</h3>
            </div>
      </div>
    )
  }
  

export default Sensor_data
