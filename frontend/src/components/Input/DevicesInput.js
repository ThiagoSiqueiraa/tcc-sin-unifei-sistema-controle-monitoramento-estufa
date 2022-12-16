import React, { useEffect } from 'react'
import useHttp from '../../hooks/use-http'
import { connect, useDispatch } from 'react-redux'
import { addDevice } from '../../store/modules/devices/actions'
import { RelayToggle } from './RelayToggle'
import { Skeleton } from '@mui/material'
import { Col, Row } from 'react-bootstrap'
function DevicesInput(props) {
  const dispatch = useDispatch()
  const RenderConditionally = ({ devices }) =>
    devices.length > 0
      ? devices.map(device => {
        return (
          <Col><RelayToggle
            key={device.id}
            title={device.name}
            device={device.pin}
            status={device.status}
            events={device.events}
            icon={device.icon}
            id={device.id}
          />
          </Col>
        )
      })
      : null

  const handleData = async res => {
    const { data } = res
    if (res.data.length > 0) {
      data.forEach(device => {
        console.log(device)
        dispatch(
          addDevice({
            name: device.name,
            pin: device.pin,
            status: device.status,
            icon: device.icon,
            id: device._id,
            events: device.events
          })
        )
      })
    }
  }
  const { isLoading, sendRequest } = useHttp()

  useEffect(() => {
    sendRequest({ url: `${process.env.REACT_APP_API_URL}/devices` }, handleData)
  }, [])
  return (
    <React.Fragment>
      {isLoading && <Skeleton width={250} height={200} variant='rounded'></Skeleton>}
      <Row>
        {!isLoading && RenderConditionally(props)}
      </Row>
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  const { devices } = state.devices
  return {
    devices
  }
}
export default connect(mapStateToProps, {})(DevicesInput)
