import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { Outlet, useParams, useNavigate } from 'react-router-dom'
import FullPageLoader from '../components/UI/FullPageLoader'
import useHttp from '../hooks/use-http'
import './EditDevices.css'

function EditDevices() {
  const { isLoading, error, sendRequest } = useHttp()
  const navigate = useNavigate()

  const { id } = useParams()


  const [device, setDevice] = useState({
    name: '',
    pin: ''

  })

  const setPin = (value) => {
    
    setDevice((prevState) => {
      return {
        ...prevState,
        pin: value
      }
    })

  }

  const setName = (value) => {
    
    setDevice((prevState) => {
      return {
        ...prevState,
        name: value
      }
    })
  }

  const handleUpdate = e => {
    e.preventDefault()
    sendRequest(
      {
        url: `${process.env.REACT_APP_API_URL}/devices/edit/${id}`,
        method: 'put',
        body: {
          name: device.name,
          pin: device.pin
        }
      },
      () => {}
    )
    navigate('/dispositivos')
  }
  const handleData = res => {
    const { name, pin } = res.data
    console.log(res.data)
    setDevice(res.data)

  }
  useEffect(() => {
    sendRequest({ url: `${process.env.REACT_APP_API_URL}/devices/${id}` }, handleData)
  }, [id, sendRequest])
  return (
    <div className='main-container'>
      {isLoading && <FullPageLoader />}

      <h2 className="header-title-edit">Editando  {device.name}</h2>
      <Form>
        <Form.Group className="mb-3" controlId="formDevice">
          <Form.Label>
            NOME <span class="text-danger">*</span>
          </Form.Label>
          <Form.Control
            type="text"
            value={device.name}
            onChange={e => setName(e.target.value)}
          />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>

        {/* <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>CATEGORIA <span class="text-danger">*</span></Form.Label>
          <Form.Control
            type="text"
            value={device.pin}
            onChange={e => setPin(e.target.value)}
          />
        </Form.Group> */}

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>PINO <span class="text-danger">*</span></Form.Label>
          <Form.Control
            type="text"
            value={device.pin}
            onChange={e => setPin(e.target.value)}
          />
        </Form.Group>
        <Button onClick={handleUpdate} type="submit" variant="warning">
          Salvar
        </Button>
      </Form>
    </div>
  )
}

export default EditDevices
