import { useState } from 'react'

import SensorContext from './sensor-context'



const SensorProvider = props => {
  const [dht22Data, setDht22Data] = useState({
    temperature: {
      actual: 0,
      minimum: 0,
      maximum: 0
    },
    humidity: {
      actual: 0,
      minimum: 0,
      maximum: 0
    },
    timestamp: null
  })

  const setDht22Handler = data => {
    console.log(data)
    setDht22Data(data)
  }
  const sensorContext = {
    dht22: dht22Data,
    setDHT22: setDht22Handler
  }

  return (
    <SensorContext.Provider value={sensorContext}>
      {props.children}
    </SensorContext.Provider>
  )
}

export default SensorProvider
