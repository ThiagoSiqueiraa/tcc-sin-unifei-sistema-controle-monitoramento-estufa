import { Paper, Slider, Typography } from "@mui/material"
import moment from "moment"
import { useState } from "react"
import { Button, Row } from "react-bootstrap"
import GraphTable from "../../components/Graph/GraphTable"
import Legend from "../../components/Graph/Legend"
import DateRangePickerUI from "../../components/UI/DateRangePickerUI"
import useHttp from "../../hooks/use-http"
import "./VPD.css"
import FullPageLoader from '../../components/UI/FullPageLoader'

function valuetext(value) {
    return `${value}°C`;
}


const marks = [
    {
        value: 0,
        label: '0',
    },
    {
        value: 1,
        label: '1',
    },
    {
        value: 2,
        label: '2',
    },

];

const VPD = () => {
    const { isLoading, sendRequest } = useHttp()
    const [data, setData] = useState()
    const [value, setValue] = useState([0.1, 1]);

    const handleChangeSlider = (
        event,
        newValue,
    ) => {


        setValue(newValue);

    };
    const [rangeDate, setRangeDate] = useState({
        start: moment().subtract(29, 'days'),
        end: moment()
    })
    const handleOnChange = (start, end) => {
        setRangeDate({ start, end })
    }


    const handleData = ({ data }) => {
        setData(data)
    }

    const handleDataMapper = (data, value) => {
        return data.map((vpd) => {
            return (<tr>
                <td className="vpd__date">{vpd.date.split("/")[0]}/{vpd.date.split("/")[1]}</td>

                {vpd.hours.map((hour) => {
                    const { average } = hour.vpd
                    if (average != null) {
                        let classes;
                        if (average >= value[0] && average <= value[1]) {
                            classes = 'vpd__propagation'
                        } else {
                            classes = 'vpd__dangerzone'
                        }
                        return <td className={classes}>{average}</td>

                    }
                    return <td className="vpd">--</td>

                })}
            </tr>)
        })
    }

    const filterHandle = () => {
        const initialDate = moment(rangeDate.start).format("YYYY-MM-DD")
        const endDate = moment(rangeDate.end).format("YYYY-MM-DD")
        sendRequest({ url: `${process.env.REACT_APP_API_URL}/sensors/vpd/average?initialDate=${initialDate}&endDate=${endDate}` }, handleData)
        
    }


    return (

        <div className="main-container">

            {isLoading && <FullPageLoader />}
            <Row>
                Período para consulta:
                <DateRangePickerUI
                    startDate="1/1/2014"
                    endDate="3/1/2014"
                    onChange={handleOnChange}
                ></DateRangePickerUI>
                <Button onClick={filterHandle}>PESQUISAR</Button>
            </Row>
            <Row style={{ position: 'relative' }}>
                <GraphTable data={data} value={value} header={["00:00",
                    "01:00",
                    "02:00",
                    "03:00",
                    "04:00",
                    "05:00",
                    "06:00",
                    "07:00",
                    "08:00",
                    "09:00",
                    "10:00",
                    "11:00",
                    "12:00",
                    "13:00",
                    "14:00",
                    "15:00",
                    "16:00",
                    "17:00",
                    "18:00",
                    "19:00",
                    "20:00",
                    "21:00",
                    "22:00",
                    "23:00"]} dataMapper={handleDataMapper} />
                <Legend />
            </Row>
            <Row className='ms-12' style={{ width: '300px', padding: "15px" }}>
                <div className="filter-container">

                    <Typography variant="overline" gutterBottom>
                        Faixa de valor
                    </Typography>
                    <Slider
                        aria-label="Always visible"
                        value={value}
                        marks={marks}
                        valueLabelDisplay="auto"
                        onChange={handleChangeSlider}
                        getAriaValueText={valuetext}
                        max={2}
                        step={0.1}
                        disableSwap
                    />
                </div>

            </Row>

            <p>
                Existem 2 maneiras de influenciar e controlar o déficit de pressão de vapor:
                <br />
                Temperatura:<br />
                Para aumentar o VPD: aumente a temperatura<br />
                Para diminuir o VPD: diminuir a temperatura<br />
                Umidade<br />
                Para aumentar o VPD: diminua a umidade (ligue o desumidificador)<br />
                Para diminuir o VPD: aumente a umidade (desligue o desumidificador)<br />
            </p>


        </div>)


}

export default VPD