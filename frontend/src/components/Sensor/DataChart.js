import React, { useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import ChartStreaming from 'chartjs-plugin-streaming'
import 'chartjs-adapter-luxon'
import chartColors from './chartColors'

let savedData = {}

function DataTimeCheck(data) {
  if (Date.now() - data.timestamp >= 3000) {
    return data.sensorValue
  }
  return null
}

function onRefresh(chart) {
  savedData.forEach(function (data) {
    if (data.sensorType === 'umidade') {
      chart.config.data.datasets[1].data.push({
        x: data.timestamp || Date.now(),
        y: DataTimeCheck(data)
      })
    } else {
      chart.config.data.datasets[0].data.push({
        x: data.timestamp || Date.now(),
        y: DataTimeCheck(data)
      })
    }
  })
  // chart.config.data.datasets.forEach(function (dataset) {
  //   dataset.data.push({
  //     x: Date.now(),
  //     y: savedData.sensorValue
  //   })
  // })
}

const DataChart = ({ config, sensorData, sensorData2 }) => {
  useEffect(() => {
    savedData = [sensorData, sensorData2]
  }, [sensorData])
  return (
    <div className="data-chart">
      <Line
        data={{
          datasets: [
            {
              label: config.chartLabel,
              data: [],
              backgroundColor: 'rgba(54, 162, 235, 0.5)',
              borderColor: 'rgb(54, 162, 235)',
              cubicInterpolationMode: 'monotone',
              fill: true
            },
            {
              label: 'Umidade',
              data: [],
              backgroundColor: 'rgba(254, 162, 235, 0.5)',
              borderColor: 'rgb(254, 162, 235)',
              cubicInterpolationMode: 'monotone',
              fill: true
            }
          ]
        }}
        height={300}
        options={{
          maintainAspectRatio: false,
          responsive: true,
          scales: {
            xAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: config.xlabelString
                },
                type: 'realtime',
                realtime: {
                  duration: 30000,
                  refresh: 1000,
                  delay: 2000,
                  onRefresh: onRefresh
                }
              }
            ],
            yAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: config.ylabelString
                },
                ticks: {
                  autoSkip: true,
                  maxTicksLimit: 10,
                  beginAtZero: true
                }
              }
            ]
          },
          tooltips: {
            mode: 'nearest',
            intersect: false
          },
          hover: {
            mode: 'nearest',
            intersect: false
          }
        }}
      />
    </div>
  )
}

export default DataChart
