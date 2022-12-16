import React from 'react'

const SensorContext = React.createContext({
  dht22: {
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
  },
  setDHT22: data => {},
})

export default SensorContext
