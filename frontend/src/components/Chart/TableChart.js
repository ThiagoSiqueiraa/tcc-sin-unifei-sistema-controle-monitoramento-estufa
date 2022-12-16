import moment from "moment"
import GraphTable from "../Graph/GraphTable"

const TableChart = ({ data, variable }) => {
    const handleDataMapper = (data, value) => {
        return data.map((item) => {
            return (<tr>
                <td className="item__date">{item.date.split("/")[0]}/{item.date.split("/")[1]}</td>

                {item.hours.map((hour) => {
                    const { average } = hour[variable]
                    if (average != null) {
 
                        return <td style={{backgroundColor: '#e3e3e3'}} >{average}</td>

                    }
                    return <td className="vpd">-</td>

                })}
            </tr>)
        })
    }

    return (
        <GraphTable data={data} header={["00:00",
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
    )
}

export default TableChart