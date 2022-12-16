import React from 'react'
import './InfoSensor.css'
import * as AiIcons from 'react-icons/ai'
function InfoSensor({actual, minimum, maximum, title, icon, unit}) {
  return (
    <div className="container-test">
      <div className='sensor-icon'>{icon}</div>
      <div className="info-sensor">
        <span>{title} do ar</span>
        <span className="sensor-value">
          {actual} {unit}
        </span>
        <span className="sensor-value">
        <AiIcons.AiFillCaretUp style={{ color: 'green' }} />{' '} {maximum} {unit} <AiIcons.AiFillCaretDown style={{ color: 'red' }} /> {minimum} {unit}
        </span>
      </div>
      {/* <div className='sensor-pill'>
      </div> */}

    </div>
  )
}

export default InfoSensor
