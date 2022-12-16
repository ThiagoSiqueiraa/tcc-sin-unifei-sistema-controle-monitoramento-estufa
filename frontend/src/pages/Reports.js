import React, { useState } from 'react'
import SensorContainer from '../components/Graph/SensorContainer'
import 'react-datepicker/dist/react-datepicker.css'
import 'react-date-range/dist/styles.css' // main css file
import 'react-date-range/dist/theme/default.css' // theme css file
import { toast } from 'react-toastify'
import { Form, Button } from 'react-bootstrap'

import DateRangePickerUI from '../components/UI/DateRangePickerUI'
import moment from 'moment'
import 'moment/locale/pt-br'
import useHttp from '../hooks/use-http'
import FullPageLoader from '../components/UI/FullPageLoader'

moment.locale('pt-br')

toast.configure()

const Reports = () => {
  const { isLoading, error, sendRequest } = useHttp()
  const [chartData, setChartData] = useState(null)
  const [chartHumData, setChartHumData] = useState(null)
  const [chartSoilHumidityData, setChartSoilHumidityData] = useState({})
  const [rangeDate, setRangeDate] = useState({
    start: moment().subtract(29, 'days'),
    end: moment()
  })
  const [type, setType] = useState({})

  const fetchDataMinMax = async res => {
    let humMin = []
    let humMax = []

    let tempMin = []
    let tempMax = []

    let data = []

    for(let i = 0; i < res.data.length; i++) {
      humMin.push(res.data[i].humidity.minimum)
      humMax.push(res.data[i].humidity.maximum)

      tempMin.push(res.data[i].temperature.minimum)
      tempMax.push(res.data[i].temperature.maximum)

      data.push(res.data[i].date)
    }

    setChartHumData({
      datasets: [
        {
          label: 'Mínimo',
          data: humMin,
          fill: false,
          backgroundColor: 'rgba(155,252,0)',
          borderColor: 'rgb(144,238,144)'
        },
        {
          label: 'Máximo',
          data: humMax,
          fill: false,
          backgroundColor: 'rgba(178,34,34)',
          borderColor: 'rgb(178,34,34)'
        }
      ],
      labels: data,
      xLabelString: 'Data',
      yLabelString: 'Mínimo / Máximo'
    })
    setChartData({
      datasets: [
        {
          label: 'Mínimo',
          data: tempMin,
          fill: false,
          backgroundColor: 'rgba(155,252,0, 0.7)',
          borderColor: 'rgb(144,238,144)'
        },
        {
          label: 'Máximo',
          data: tempMax,
          fill: false,
          backgroundColor: 'rgba(178,34,34, 0.7)',
          borderColor: 'rgb(178,34,34)'
        }
      ],
      labels: data,
      xLabelString: 'Data',
      yLabelString: 'Mínimo / Máximo'
    })
  }

  const fetchSoilHumidityAverage = async res => {
    let datasets = []
    let data = []
    let plants = {}
    const SIZE_OF_DATES = Object.keys(res.data).length

    console.log(SIZE_OF_DATES)
    let count = 0;
    for (var key of Object.keys(res.data)) {
      for(let i = 0; i < res.data[key].plants.length; i++) {
        let plant = res.data[key].plants[i]
        if(plants[plant.plantId] === undefined) {
          plants[plant.plantId] = {
            id: plant.plantId,
            data: new Array(SIZE_OF_DATES).fill(0),
          }
          plants[plant.plantId].data[count] = plant.average
        }else{
          plants[plant.plantId].data[count] = plant.average
        }
 
      }

      data.push(key)
      count += 1
    }

    count = 1
    for(var key of Object.keys(plants)) {

      datasets.push({
        label: `Planta ${plants[key].id}`,
        data: plants[key].data,
        fill: false,
        backgroundColor: `rgba(54, 162, 235)`,
        borderColor: `rgba(54, 162, 235)`
      })
      count += 1
    }

    setChartSoilHumidityData({
      datasets: datasets,
      labels: data,
      xLabelString: 'Data',
      yLabelString: 'Média'
    })
  }
  const fetchDataAverage = async res => {
    let dht22Temp = []
    let dht22Data = []
    let dht22HumData = []
    let dht22Hum = []

    for (const dataObj of res.data.dataTemp.data) {
      dht22Temp.push(dataObj.avg.toFixed(2))
      dht22Data.push(dataObj._id)
    }
    for (const dataObj of res.data.dataHum.data) {
      dht22Hum.push(dataObj.avg.toFixed(2))
      dht22HumData.push(dataObj._id)
    }

    setChartData({
      labels: dht22Data,
      datasets: [
        {
          label: 'Temperatura do ar',
          data: dht22Temp,
          fill: false,
          backgroundColor: 'rgba(54, 162, 235)',
          borderColor: 'rgba(54, 162, 235)'
        }
      ],
      xLabelString: 'Data',
      yLabelString: 'Média'
    })
    setChartHumData({
      labels: dht22HumData,
      datasets: [
        {
          label: 'Umidade do ar',
          data: dht22Hum,
          fill: false,
          backgroundColor: 'rgba(54, 162, 235)',
          borderColor: 'rgb(54, 162, 235)'
        }
      ],
      xLabelString: 'Data',
      yLabelString: 'Média'
    })
  }

  const filterHandler = async () => {
    const fetchData = async () => {
      const initialDate = moment(rangeDate.start).format("YYYY-MM-DD")
      const endDate = moment(rangeDate.end).format("YYYY-MM-DD")
      let requestConfig = {
        method: 'get'
      }
      if (type === 'average') {
        requestConfig.url = `${process.env.REACT_APP_API_URL}/sensors/average?initialDate=${initialDate}&endDate=${endDate}`
        sendRequest(requestConfig, fetchDataAverage)

        //
        requestConfig.url = `${process.env.REACT_APP_API_URL}/sensors/soil/average?initialDate=${initialDate}&endDate=${endDate}`
        sendRequest(requestConfig, fetchSoilHumidityAverage)

      } else if (type == 'minmax') {
        requestConfig.url = `${process.env.REACT_APP_API_URL}/sensors/minimum-maximum?initialDate=${initialDate}&endDate=${endDate}`
        sendRequest(requestConfig, fetchDataMinMax)
      }
    }
    fetchData()
  }

  function handleOnChange(start, end) {
    setRangeDate({ start, end })
  }

  return (
    <div className="main-container reports">
      {isLoading && <FullPageLoader />}

      <div>
        Período para consulta:
        <DateRangePickerUI
          startDate="1/1/2014"
          endDate="3/1/2014"
          onChange={handleOnChange}
        ></DateRangePickerUI>
        <span>Filtrar por:</span>
        <Form.Select
          value={type}
          onChange={event => setType(event.target.value)}
          name="cars"
          id="cars"
        >
          <option value="">Selecione um filtro.</option>
          <option value="average">Média</option>
          <option value="minmax">Mínimo / Máximo</option>
        </Form.Select>
        <Button onClick={filterHandler} variant="primary">
          Filtrar
        </Button>
      </div>
      {chartData && (
        <SensorContainer
          title="Temperatura do ar"
          chartData={chartData}
          xLabelString={chartData.xLabelString}
          yLabelString={chartData.yLabelString}
        />
      )}
      {chartHumData && (
        <SensorContainer
          title="Umidade do ar"
          chartData={chartHumData}
          xLabelString={chartData.xLabelString}
          yLabelString={chartData.yLabelString}
        />
      )}


        <SensorContainer
          title="Umidade do solo"
          chartData={chartSoilHumidityData}
          xLabelString={chartSoilHumidityData.xLabelString}
          yLabelString={chartSoilHumidityData.yLabelString}
        />

    </div>
  )
}

export default Reports
