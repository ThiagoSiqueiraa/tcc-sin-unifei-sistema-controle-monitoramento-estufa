import React, { useContext, useEffect } from 'react'
import SensorContext from './source/sensor-context'
import socketIOClient from 'socket.io-client'
import { useDispatch } from 'react-redux'
import { changeStatus } from './store/modules/devices/actions'

function Ws() {
  const ctx = useContext(SensorContext)
  const dispatch = useDispatch()
  useEffect(() => {
    let socket = null
    try {
      socket = socketIOClient(`${process.env.REACT_APP_SOCKET_URL}`, {
        rejectUnauthorized: false
      })
    } catch (e) {
      console.log(e)
    }

    socket.on('connection', () => {
      console.log('Connected to Server!')
    })

    socket.on('temperatureData', data => {
      ctx.setTemperature(data)
    })

    socket.on('SENSOR_DHT22', data => {
      ctx.setDHT22(data)
    })

    socket.on('init', data => {
      ctx.setDHT22(data)
    })  

    socket.on('changeStatus', ({ status, id, events }) => {
      dispatch(
        changeStatus({
          status,
          id
          // events
        })
      )
    })

    return () => socket.disconnect()
  }, [])
  return <React.Fragment></React.Fragment>
}

export default Ws
