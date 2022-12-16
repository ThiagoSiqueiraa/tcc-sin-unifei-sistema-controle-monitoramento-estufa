import { useContext, useState } from 'react'
import './Dashboard.css'
import InfoSensor from '../InfoSensor/InfoSensor'
import * as FaIcons from 'react-icons/fa'
import * as WiIcons from 'react-icons/wi'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import SensorContext from '../../source/sensor-context'
import DevicesInput from '../Input/DevicesInput'
import { Button, Container } from 'react-bootstrap'
import Placeholder from '../UI/Placeholder'
import Modal from 'react-bootstrap/Modal';
import './Modal.css'
import { SvgIcon, TextField, Typography } from '@mui/material'
import moment from 'moment'
import OptionGraph from './OptionGraph'
import DynamicCharts from './DynamicCharts'
import useHttp from '../../hooks/use-http'
import { ReactComponent as MyImageSvg } from "./bar-chart.svg";
import DateRangePickerUI from '../UI/DateRangePickerUI'
toast.configure()

const DashboardComponent = ({ history }) => {

  const filterDashboard = () => {

    setTrigger(!trigger)

  }

  const ctx = useContext(SensorContext)

  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(false);
  const [dataOptionActive, setDataOptionActive] = useState(false)
  const [variableType, setVariableType] = useState(null)
  const [widthChart, setWidthChart] = useState()
  const [name, setName] = useState('')
  const [trigger, setTrigger] = useState(false)
  const [rangeDate, setRangeDate] = useState({
    start: moment().toISOString(),
    end: moment().toISOString()
  })

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { isLoading, error, sendRequest } = useHttp()

  function handleOnChange(start, end) {
    setRangeDate({ start: moment(start).toISOString(), end: moment(end).toISOString() })
  }


  const handleSave = () => {

    sendRequest({
      url: `${process.env.REACT_APP_API_URL}/charts/create`,
      method: 'POST',
      body: {
        title: name,
        type: active,
        source: dataOptionActive,
        variable: variableType,
        size: widthChart,
      }
    }, (res) => {
      console.log(res)
      handleClose()
    }
    )

  }
  const onChangeValue = (event) => {
    console.log(event.target.value);
  }

  return (
    <div className='main-container'>
      <div className="info-sensor-container">
        <InfoSensor
          actual={ctx.dht22.temperature.actual}
          minimum={ctx.dht22.temperature.minimum}
          maximum={ctx.dht22.temperature.maximum}
          title="Temperatura"
          icon={<FaIcons.FaTemperatureHigh size={30} color={"black"} />}
          unit="°C"
        ></InfoSensor>
        <InfoSensor
          actual={ctx.dht22.humidity.actual}
          minimum={ctx.dht22.humidity.minimum}
          maximum={ctx.dht22.humidity.maximum}
          title="Umidade"
          icon={<WiIcons.WiHumidity size={50} color={"black"} />}
          unit="%"
        ></InfoSensor>
        <div className='devices-input'>
          <DevicesInput />

        </div>
        <span style={{position: 'absolute', bottom: 0,  right: "2%"}}><Typography variant="subtitle2">Ultima atualização em: {moment(ctx.dht22.timestamp).format("DD/MM/YYYY HH:mm")}</Typography></span>

      </div>


      <div className="dashboard-filter">
        <div className="dashboard-filter-date" style={{ display: 'flex', marginTop: '20px' }}>
          <DateRangePickerUI
            width='300px'
            onChange={handleOnChange}
            startDate="23/10/2022"
            endDate="23/10/2022" />


          <Button onClick={filterDashboard} style={{ width: '200px', marginLeft: '2%' }}>PESQUISAR</Button>
        </div>
      </div>

      <div className="data">
        <Container>

          <DynamicCharts initialDate={rangeDate.start} endDate={rangeDate.end} trigger={trigger} />

          <Modal
            show={open}
            onHide={handleClose}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                <label className='modal-label label-title'>Novo gráfico</label>

              </Modal.Title>
            </Modal.Header>
            <Modal.Body className='modal-body-flex'>
              <div className='mb-left custom-scrollbar'>
                <div className='modal-input'>
                  <TextField onChange={(event) => {
                    setName(event.target.value)
                  }} value={name} fullWidth className='chart-title' id="standard-basic" label="Título do gráfico" variant="standard" />

                </div>
                <div className="type-select">
                  <OptionGraph onClick={() => {
                    setActive('metric')
                  }} customClass={active === 'metric' ? 'active' : ''} type={'metric'} icon={<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="20px" viewBox="0 0 24 24" width="20px" fill="#000000"><g><rect fill="none" height="24" width="24"></rect></g><g><g><g><path d="M3,3v8h8V3H3z M9,9H5V5h4V9z M3,13v8h8v-8H3z M9,19H5v-4h4V19z M13,3v8h8V3H13z M19,9h-4V5h4V9z M13,13v8h8v-8H13z M19,19h-4v-4h4V19z"></path></g></g></g></svg>} />
                  <OptionGraph onClick={() => {
                    setActive('line')
                  }} customClass={active === 'line' ? 'active' : ''} type={'line'} icon={<svg height="384pt" viewBox="0 0 384 384" width="384pt" xmlns="http://www.w3.org/2000/svg"><path d="m48 384h320c8.832031 0 16-7.167969 16-16s-7.167969-16-16-16h-320c-8.824219 0-16-7.175781-16-16v-320c0-8.832031-7.167969-16-16-16s-16 7.167969-16 16v320c0 26.472656 21.527344 48 48 48zm0 0"></path><path d="m120 256c30.878906 0 56-25.121094 56-56 0-11.441406-3.464844-22.078125-9.375-30.953125l51.320312-61.589844c6.773438 2.910157 14.222657 4.542969 22.054688 4.542969 2.640625 0 5.214844-.246094 7.761719-.601562l43.390625 94.539062c-11.710938 10.269531-19.152344 25.292969-19.152344 42.0625 0 30.878906 25.128906 56 56 56s56-25.121094 56-56-25.128906-56-56-56c-2.640625 0-5.214844.246094-7.761719.601562l-43.390625-94.539062c11.710938-10.269531 19.152344-25.292969 19.152344-42.0625 0-30.878906-25.128906-56-56-56s-56 25.121094-56 56c0 11.441406 3.464844 22.078125 9.375 30.960938l-51.320312 61.582031c-6.773438-2.917969-14.222657-4.542969-22.054688-4.542969-30.878906 0-56 25.121094-56 56s25.121094 56 56 56zm232-8c0 13.230469-10.769531 24-24 24s-24-10.769531-24-24 10.769531-24 24-24 24 10.769531 24 24zm-112-216c13.230469 0 24 10.769531 24 24s-10.769531 24-24 24-24-10.769531-24-24 10.769531-24 24-24zm-120 144c13.230469 0 24 10.769531 24 24s-10.769531 24-24 24-24-10.769531-24-24 10.769531-24 24-24zm0 0"></path></svg>} />
                  <OptionGraph onClick={() => {
                    setActive('table')
                  }} type={'table'} customClass={active === 'table' ? 'active' : ''} icon={<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"></path><path d="M20 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 2v3H5V5h15zm-5 14h-5v-9h5v9zM5 10h3v9H5v-9zm12 9v-9h3v9h-3z"></path></svg>} />
                  <OptionGraph onClick={() => {
                    setActive('bar')
                  }} type={'bar'} customClass={active === 'bar' ? 'active' : ''} icon={<SvgIcon component={MyImageSvg} viewBow="0 0 384 384" />} />
                </div>

                <div>
                  <div className="div-flex">
                    <input onChange={() => {
                      setWidthChart('half')
                    }} type="radio" value="half" name="width" />
                    <label for="half"> 50%</label>
                  </div>

                  <div className="div-flex">
                    <input onChange={() => {
                      setWidthChart('full')
                    }} type="radio" value="full" name="width" />
                    <label for="full"> 100%</label>
                  </div>

                </div>

              </div>
              <div className="mb-right">
                <label className="search-area-title" for="chart_event">Selecione a <strong>origem dos dados</strong></label>
                <div className="type-select div-flex">
                  <OptionGraph onClick={() => {
                    setDataOptionActive('variable')
                  }} type={'variable'} customClass={dataOptionActive === 'variable' ? 'active' : ''} icon={<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="20px" viewBox="0 0 24 24" width="20px" fill="#000000">
                    <g>
                      <rect fill="none" height="24" width="24"></rect>
                    </g>
                    <g>
                      <g>
                        <g>
                          <path d="M3,3v8h8V3H3z M9,9H5V5h4V9z M3,13v8h8v-8H3z M9,19H5v-4h4V19z M13,3v8h8V3H13z M19,9h-4V5h4V9z M13,13v8h8v-8H13z M19,19h-4v-4h4V19z"></path>
                        </g>
                      </g>
                    </g>
                  </svg>} />

                  <OptionGraph onClick={() => {
                    setDataOptionActive('events')
                  }} type={'events'} customClass={dataOptionActive === 'events' ? 'active' : ''}
                    icon={<svg height="384pt" viewBox="0 0 384 384" width="384pt" xmlns="http://www.w3.org/2000/svg">
                      <path d="m48 384h320c8.832031 0 16-7.167969 16-16s-7.167969-16-16-16h-320c-8.824219 0-16-7.175781-16-16v-320c0-8.832031-7.167969-16-16-16s-16 7.167969-16 16v320c0 26.472656 21.527344 48 48 48zm0 0"></path>
                      <path d="m120 256c30.878906 0 56-25.121094 56-56 0-11.441406-3.464844-22.078125-9.375-30.953125l51.320312-61.589844c6.773438 2.910157 14.222657 4.542969 22.054688 4.542969 2.640625 0 5.214844-.246094 7.761719-.601562l43.390625 94.539062c-11.710938 10.269531-19.152344 25.292969-19.152344 42.0625 0 30.878906 25.128906 56 56 56s56-25.121094 56-56-25.128906-56-56-56c-2.640625 0-5.214844.246094-7.761719.601562l-43.390625-94.539062c11.710938-10.269531 19.152344-25.292969 19.152344-42.0625 0-30.878906-25.128906-56-56-56s-56 25.121094-56 56c0 11.441406 3.464844 22.078125 9.375 30.960938l-51.320312 61.582031c-6.773438-2.917969-14.222657-4.542969-22.054688-4.542969-30.878906 0-56 25.121094-56 56s25.121094 56 56 56zm232-8c0 13.230469-10.769531 24-24 24s-24-10.769531-24-24 10.769531-24 24-24 24 10.769531 24 24zm-112-216c13.230469 0 24 10.769531 24 24s-10.769531 24-24 24-24-10.769531-24-24 10.769531-24 24-24zm-120 144c13.230469 0 24 10.769531 24 24s-10.769531 24-24 24-24-10.769531-24-24 10.769531-24 24-24zm0 0"></path>
                    </svg>} />




                </div>
                {dataOptionActive === 'variable' &&
                  <div>
                    <label className="search-area-title" for="chart_event">Selecione a <strong>variável</strong></label>
                    <ul onChange={onChangeValue}>
                      <li>
                        <div className="div-flex">
                          <input onChange={() => {
                            setVariableType('temperature')
                          }} type="radio" value="temperature" name="variable" />
                          <label for="temperature"> Temperatura do ar</label>
                        </div>

                      </li>
                      <li>
                        <div className="div-flex">
                          <input onChange={() => {
                            setVariableType('humidity')
                          }} type="radio" value="humidity" name="variable" />
                          <label for="humidity"> Umidade do ar</label>
                        </div>

                      </li>
                    </ul>

                  </div>
                }

              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Fechar
              </Button>
              <Button variant="primary" onClick={handleSave}>
                Salvar
              </Button>
            </Modal.Footer>
          </Modal>
          <Placeholder onClick={handleOpen} content={"Adicionar novo gráfico"} />




        </Container>
      </div>
    </div>
  )
}

export default DashboardComponent
