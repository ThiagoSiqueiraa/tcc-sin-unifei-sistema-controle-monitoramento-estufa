import React, { useState, useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import SensorContainer from '../Graph/SensorContainer'
import moment from 'moment'
import useHttp from '../../hooks/use-http'
import SimpleLineIcon from 'react-simple-line-icons'
import { Skeleton } from '@mui/material'
import BarChart from '../Chart/BarChart'


function DateGraph() {
  const now = moment()

  return (
    <div className="calendar-container">
      <SimpleLineIcon name="calendar"></SimpleLineIcon>
      <span> {now.format('L')}</span>
    </div>
  )
}
function Graphs() {
  const [chartHumidityData, setChartHumidityData] = useState(null)
  const [chartTemperatureData, setChartTemperatureData] = useState(null)

  const httpData = useHttp()

  const { isLoading, error, sendRequest: fetchData } = httpData
  useEffect(() => {

    const filterHandler = async res => {
      let dht22Temp = []
      let dht22Data = []
      let dht22HumData = []
      let dht22Hum = []

      for (const dataObj of res.data) {
        dht22Temp.push(dataObj.average.temperature.toFixed(2))
        dht22Data.push(dataObj.hour)
      }

      for (const dataObj of res.data) {
        dht22Hum.push(dataObj.average.humidity.toFixed(2))
        dht22HumData.push(dataObj.hour)
      }

      setChartTemperatureData({
        labels: dht22Data,
        datasets: [
          {
            label: 'Temperatura média',
            data: dht22Temp,
            fill: false,
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgb(54, 162, 235)'
          }
        ]
      })
      setChartHumidityData({
        labels: dht22HumData,
        datasets: [
          {
            label: 'Umidade média',
            data: dht22Hum,
            fill: false,
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgb(54, 162, 235)'
          }
        ]
      })
    }
    fetchData(
      {
        url: `${process.env.REACT_APP_API_URL}/sensors/average/hour?initialDate=${moment()
          .startOf('day')
          .format("YYYY-MM-DD HH:mm:ss")}&endDate=${moment().endOf('day').format("YYYY-MM-DD HH:mm:ss")}`,
        method: 'get'
      },
      filterHandler
    )
  }, [fetchData])

  return (
    <div>
      {isLoading && (<Row style={{ marginBottom: "25px" }}><Col><Skeleton animation="wave" style={{ borderRadius: "7px" }} variant="rounded" height={372} /></Col><Col><Skeleton style={{ borderRadius: "7px" }} variant="rounded" height={372} /></Col></Row>)}
      {!isLoading && (
        <div >
          <Row>
            <Col>
              <SensorContainer
                title="Umidade do solo"
                chartData={chartTemperatureData}
                xLabelString="Horário"
                yLabelString="Umidade do solo média"
              >
                <DateGraph />
              </SensorContainer>
            </Col>
          </Row>
          <Row>
            <Col>
              <SensorContainer
                title="Temperatura"
                chartData={chartTemperatureData}
                xLabelString="Horário"
                yLabelString="Temperatura do ar média"
              >
                <DateGraph />
              </SensorContainer>
            </Col>
            <Col>
              <SensorContainer
                title="Umidade"
                chartData={chartHumidityData}
                xLabelString="Horário"
                yLabelString="Umidade do ar média"
              >
                <DateGraph />
              </SensorContainer>
            </Col>

            

          </Row>
        </div>

      )}
    </div>
  )
}

export { Graphs }
