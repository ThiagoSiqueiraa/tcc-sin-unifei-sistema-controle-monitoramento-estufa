import React, { useState, useEffect } from 'react'
import { Bar, Line } from 'react-chartjs-2'
import axios from 'axios'

const Graph = ({ chartData, title, xLabelString, yLabelString }) => {
  return (
    <div className="App">
      <div>
        {chartData && (
          <Bar
            data={chartData}
            height={300}
            options={{
              maintainAspectRatio: false,
              responsive: true,
              scales: {
                xAxes: [
                  {
                    scaleLabel: {
                      display: true,
                      labelString: xLabelString
                    }
                  }
                ],
                yAxes: [
                  {
                    ticks: {
                      beginAtZero: true,
                      min: 0
                    },
                    scaleLabel: {
                      display: true,
                      labelString: yLabelString
                    }
                  }
                ]
              }
            }}
          />
        )}
      </div>
    </div>
  )
}

export default Graph
