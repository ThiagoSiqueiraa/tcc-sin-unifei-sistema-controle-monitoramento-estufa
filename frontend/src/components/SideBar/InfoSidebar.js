import React from 'react'
import { useContext } from 'react'
import SensorContext from '../../source/sensor-context'

import * as WiIcons from 'react-icons/wi'

function InfoSidebar() {
  const ctx = useContext(SensorContext)

  return (
    <div
      style={{
        position: 'absolute',
        right: '5%',
        fontWeight: 'bold'
      }}
    >
      <div className="sensor">
        <WiIcons.WiThermometer />
        {ctx.dht22.temperature.actual} °C
      </div>

      <div className="sensor">
        <WiIcons.WiHumidity />
        {ctx.dht22.humidity.actual} %
      </div>
    </div>
  )
}

export default InfoSidebar
