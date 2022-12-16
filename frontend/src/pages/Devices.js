import React, { useState, useEffect } from 'react'
import { Button, Form } from 'react-bootstrap'
import DataTable from 'react-data-table-component'
import { toast } from 'react-toastify'
import useHttp from '../hooks/use-http'
import SimpleLineIcon from 'react-simple-line-icons'
import { Link, Outlet } from 'react-router-dom'
import StatusSensor from '../components/UI/StatusSensor'
import FullPageLoader from '../components/UI/FullPageLoader'
import SideActionButton from '../components/UI/SideActionButton'
import { IconPicker } from 'react-fa-icon-picker'

toast.configure()
const handleDelete = () => { }
const columns = [
  {
    name: 'ID',
    selector: row => row['_id'],
    omit: true
  },
  {
    name: 'Nome',
    selector: row => row.name
  },
  {
    name: 'Pino',
    selector: row => row.pin
  },
  {
    name: 'Status',
    selector: row => <StatusSensor status={row.status} />
  },
  {
    cell: record => {
      return (
        <React.Fragment>
          <Link className="link-edit" to={`/dispositivos/editar/${record['_id']}`}>
            <SimpleLineIcon name="note" />
          </Link>
          <Link className="link-edit" to={`/dispositivos/deletar/${record['_id']}`}>
            <SimpleLineIcon name="trash" />
          </Link>
        </React.Fragment>
      )
    }
  }
]

function Devices() {

  useEffect(() => {
    sendRequest({ url: `${process.env.REACT_APP_API_URL}/devices` }, handleData)
  }, [])

  const { isLoading, error, sendRequest } = useHttp()
  const [data, setData] = useState(null)
  const [isToggled, setIsToggled] = useState(false)
  const [name, setName] = useState(null)
  const [pin, setPin] = useState(null)
  const [icon, setIcon] = useState(null)
  const [iconLabel, setIconLabel] = useState('')

  const handleData = async res => {
    setData(res.data)
  }
  const handleSubmit = async event => {
    event.preventDefault()
    if (!name || !pin) {
      toast.warning('Campos obrigatórios faltando.', {
        position: toast.POSITION.TOP_RIGHT
      })
      return
    }
    sendRequest(
      {
        url: `${process.env.REACT_APP_API_URL}/devices`,
        body: {
          name,
          pin,
          icon
        },
        method: 'post'
      },
      res => {
        if (res.status === 200) {
          window.location.reload()
        }

      }
    )

  }


  return (
    <div className='main-container'> 
      {isLoading && <FullPageLoader />}
      <div className={`addsidebar ${isToggled ? 'show' : ''}`}>
        <div className="add-wrapper">
          <h2 className="header-title">Novo Dispositivo</h2>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>
                NOME <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                value={name}
                onChange={e => setName(e.target.value)}
                type="text"
              />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPin">
              <Form.Label>Pino <span className="text-danger">*</span></Form.Label>
              <Form.Control
                type="text"
                value={pin}
                onChange={e => setPin(e.target.value)}
              />
            </Form.Group>

            {/* <Form.Group className="mb-3" controlId="formBasicIcon">
              
              <Form.Label>Icone</Form.Label>
              <Form.Control
                type="text"
                value={icon}
                onChange={e => setIcon(e.target.value)}
              />
            </Form.Group> */}
            <Button type="submit" onClick={handleSubmit} variant="primary">
              Adicionar
            </Button>
          </Form>
        </div>
      </div>
      <SideActionButton icon={!isToggled ? 'fi-plus' : 'fi-close'} click={() => setIsToggled(!isToggled)} classes={`addsidebar-button addsidebar-show-add btn-primary ${isToggled ? 'close-button-action' : ''
        }`} />

      <DataTable noDataComponent="Nenhum dispositivo encontrado" columns={columns} data={data ? data : []} />
    </div>
  )
}

export default Devices
