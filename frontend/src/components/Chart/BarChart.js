import { Bar } from 'react-chartjs-2'

const BarChart = ({ data, label }) => {

    const labels = []
    const dataAux = []

    data.forEach((item) => {
        labels.push(item.x)
        dataAux.push(item.y)
    })

    return (
        <Bar
            data={{
                labels,
                datasets: [
                    {
                        label: label,
                        data: dataAux,
                        fill: false,
                        backgroundColor: 'rgba(54, 162, 235, 0.5)',
                        borderColor: 'rgb(54, 162, 235)'
                    }
                ]
            }}
            height={300}
            options={{
                maintainAspectRatio: false,
                responsive: true,
                legend: {
                    display: false
                },
                scales: {
                    xAxes: [
                        {
                            scaleLabel: {
                                display: true,
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
                            }
                        }
                    ]
                }
            }}
        />
    )
}

export default BarChart