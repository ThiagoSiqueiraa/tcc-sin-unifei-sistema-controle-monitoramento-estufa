import React, { useState, useEffect } from 'react'
import { Button, Form } from 'react-bootstrap'
import DataTable from 'react-data-table-component'
import { toast } from 'react-toastify'
import useHttp from '../hooks/use-http'
import SimpleLineIcon from 'react-simple-line-icons'
import { Link, Outlet } from 'react-router-dom'
import StatusSensor from '../components/UI/StatusSensor'
import FullPageLoader from '../components/UI/FullPageLoader'

toast.configure()
const UNDEFINED = 'Indeterminado'
const handleDelete = () => {}
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
    name: 'Tipo',
    selector: row => row.strainType
  },
  {
    name: 'Altura',
    selector: row => (row.height == -1 ? UNDEFINED : row.height)
  },
  {
    name: 'Tempo de floração (em dias)',
    selector: row => (row.floweringTime == -1 ? UNDEFINED : row.floweringTime)
  },
  {
    cell: record => {
      return (
        <React.Fragment>
          <Link className="link-edit" to={`/devices/edit/${record['_id']}`}>
            <SimpleLineIcon name="note" />
          </Link>

        </React.Fragment>
      )
    }
  }
]

function Genetics() {
  const { isLoading, error, sendRequest } = useHttp()
  const [data, setData] = useState(null)
  const [isToggled, setIsToggled] = useState(false)
  const [name, setName] = useState(null)
  const [strainType, setStrainType] = useState(null)
  const [yieldIndoor, setYieldIndoor] = useState(null)
  const [height, setHeight] = useState(null)
  const [floweringTime, setFloweringTime] = useState(null)

  const handleData = async res => {
    setData(res.data)
  }
  const handleSubmit = async event => {
    event.preventDefault()

    sendRequest(
      {
        url: `${process.env.REACT_APP_API_URL}/genetics`,
        body: {
          name,
          strainType,
          yieldIndoor,
          height,
          floweringTime
        },
        method: 'post'
      },
      res => {
        const { data } = res
        if (data.success) {
          window.location.reload()
        }
      }
    )
    if (error) {
      console.log(error)
    } else {
      console.log('sem erro')
    }
  }
  useEffect(() => {
    sendRequest({ url: `${process.env.REACT_APP_API_URL}/genetics` }, handleData)
  }, [])
  return (
    <React.Fragment>
      {isLoading && <FullPageLoader />}
      <div className={`addsidebar ${isToggled ? 'show' : ''}`}>
        <div className="add-wrapper">
          <h2 class="header-title">Nova Genética</h2>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>
                NOME <span class="text-danger">*</span>
              </Form.Label>
              <Form.Control
                value={name}
                onChange={e => setName(e.target.value)}
                type="text"
              />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPin">
              <Form.Label>Tipo</Form.Label>
              <Form.Control
                type="text"
                value={strainType}
                onChange={e => setStrainType(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicIcon">
              <Form.Label>Rendimento</Form.Label>
              <Form.Control
                type="text"
                value={yieldIndoor}
                onChange={e => setYieldIndoor(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicIcon">
              <Form.Label>Altura</Form.Label>
              <Form.Control
                type="text"
                value={height}
                onChange={e => setHeight(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicIcon">
              <Form.Label>Tempo de floração</Form.Label>
              <Form.Control
                type="text"
                value={floweringTime}
                onChange={e => setFloweringTime(e.target.value)}
              />
            </Form.Group>
            <Button type="submit" onClick={handleSubmit} variant="primary">
              Adicionar
            </Button>
          </Form>
        </div>
      </div>
      <div class="fixed-action-buttons">
        <div
          onClick={() => setIsToggled(!isToggled)}
          className={`addsidebar-button addsidebar-show-add btn-primary ${
            isToggled ? 'close-button-action' : ''
          }`}
        >
          <i className={`${isToggled ? 'fi-close' : 'fi-plus'}`}></i>
        </div>

        <div class="clearfix"></div>
      </div>
      <DataTable columns={columns} data={data ? data : []} />
    </React.Fragment>
  )
}

export default Genetics
