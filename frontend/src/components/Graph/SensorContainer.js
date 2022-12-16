import React, { useEffect, useState } from 'react'
import '../Sensor/Sensor.css'
import classNames from 'classnames'
import Graph from './Graph'

const SensorContainer = ({
  children,
  chartData,
  title,
  xLabelString,
  yLabelString
}) => {
  return (
    <div className="sensor-container">
      <div className="sensor-text"></div>
      <div className="sensor-chart">
        <div className="sensor-title">
          <h5>{title}</h5>
          {children}
        </div>

        <Graph
          title={title}
          chartData={chartData}
          xLabelString={xLabelString}
          yLabelString={yLabelString}
        />
      </div>
    </div>
  )
}

export default SensorContainer
