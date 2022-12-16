import React, { useEffect, useState } from 'react'
import DataChart from './DataChart'
import './Sensor.css'
import classNames from 'classnames'

const Sensor = ({ sensorConfig, sensorData, sensorData2, idSensor }) => {
  const [deviceStatus, setDeviceStatus] = useState('Offline')
  const [indicatorClass, setIndicatorClass] = useState(
    classNames('indicator', 'offline')
  )
  const [sensorStatus, setSensorStatus] = useState('Not Available')
  const [sensorLastUpdated, setSensorLastUpdated] = useState('Not Available')

  useEffect(() => {
    if (
      sensorData.sensorType &&
      sensorData.sensorType.toLowerCase() === sensorConfig.name.toLowerCase()
    ) {
      setDeviceStatus('Online')
      setIndicatorClass(classNames('indicator', 'online'))
      if (sensorData.sensorStatus) {
        setSensorStatus(sensorData.sensorStatus)
      }
      if (sensorData.timestamp) {
        setSensorLastUpdated(
          `${new Date(sensorData.timestamp).toLocaleDateString(
            'pt-br'
          )} em ${new Date(sensorData.timestamp).toLocaleTimeString('pt-br')}`
        )
      }
    } else {
      setDeviceStatus('Offline')
      setIndicatorClass(classNames('indicator', 'offline'))
      setSensorStatus('Not Available')
      setSensorLastUpdated('Not Available')
    }
    var DataTimeCheck = setInterval(() => {
      if (Date.now() - sensorData.timestamp > 2000) {
        //setDeviceStatus('Offline')
        //setIndicatorClass(classNames('indicator', 'offline'))
        //setSensorStatus('Not Available')
      }
    }, 1000)

    return () => {
      clearInterval(DataTimeCheck)
    }
  }, [sensorData, sensorConfig])

  return (
    <div className="sensor-container">
      <div className="sensor-text">
        <div className="sensor-text-heading">
          <h2>{sensorConfig.name}</h2>
        </div>
        <div className="sensor-text-content">
          <p>
            Status do dispositivo: {deviceStatus}
            <span className={indicatorClass}></span>
          </p>
          <p>Sensor Status: {sensorStatus}</p>
          <p>Ultima atualização: {sensorLastUpdated}</p>
        </div>
      </div>
      <div className="sensor-chart">
        <DataChart
          config={sensorConfig.chart}
          sensorData={sensorData}
          sensorData2={sensorData2}
          idSensor={idSensor}
        />
      </div>
    </div>
  )
}

export default Sensor
