import { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import useHttp from "../../hooks/use-http";
import BarChart from "../Chart/BarChart";
import SimpleLineIcon from 'react-simple-line-icons'
import moment from "moment";

import "./Chart.css"
import LineChart from "../Chart/LineChart";
import TableChart from "../Chart/TableChart";
import FullPageLoader from "../UI/FullPageLoader";



const DynamicCharts = ({ initialDate, endDate, trigger }) => {

    const [data, setData] = useState([]);
    const { sendRequest } = useHttp()
    const [isLoading, setIsLoading] = useState(false)
    const handleData = async (res) => {
        const { data } = res;

        const loadCharts = async () => {
            const charts = await Promise.all(data.map(async (chart) => {
                const { data } = await sendRequest({
                    url: `http://localhost:3001/charts/show/${chart._id}?initialDate=${initialDate}&endDate=${endDate}`,
                    method: 'GET',
                })
                return data
            }))

            return charts
        }

        const charts = await loadCharts()
        setData(charts)
        setIsLoading(false)
    }


    useEffect(() => {
        setIsLoading(true)
        setData([])
        sendRequest({
            url: `${process.env.REACT_APP_API_URL}/charts/list`,
        }, handleData)

    }, [trigger]);

    useEffect(() => {
        setIsLoading(true)
        setData([])
        sendRequest({
            url: `${process.env.REACT_APP_API_URL}/charts/list`,
        }, handleData)

    }, []);






    return (
        <div className="wrapper-container-chart">
            {isLoading && <FullPageLoader />}


            {data && data.map(chart => {

                const classname = chart.size === 'half' ? 'half-width' : 'full-width'


                return (<div key={chart._id} className={`sensor-container ${classname}`}>
                    <div className="sensor-text"></div>
                    <div className="sensor-chart">
                        <div className="sensor-title">
                            <h5>{chart.name}</h5>
                        </div>

                        <div>
                            {chart.type === 'bar' && <BarChart data={chart.data} label={chart.name} />}
                            {chart.type === 'line' && <LineChart data={chart.data} label={chart.name} />}
                            {chart.type === 'table' && <TableChart data={chart.data} label={chart.name} variable={chart.variable} />}
                        </div>



                    </div>
                </div>)


            })}

        </div>
    );
}

export default DynamicCharts