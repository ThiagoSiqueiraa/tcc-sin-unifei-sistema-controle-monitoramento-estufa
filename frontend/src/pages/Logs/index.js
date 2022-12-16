import moment from "moment";
import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import useHttp from "../../hooks/use-http";

const LABEL_EVENT_TYPE = {
    'SET_DEVICE_ON': 'Ligar dispositivo',
    'SET_DEVICE_OFF': 'Desligar dispositivo',
    'SET_BRIGTHNESS': 'Definir brilho'
}

const columns = [

    {
        name: 'Evento',
        selector: row => LABEL_EVENT_TYPE[row.event.type],
        sortable: true
    },
    {
        name: 'Dispositivo',
        selector: row => row.event.payload.device.name,
        sortable: true
    },

    {
        name: 'Executado com sucesso?',
        selector: row => row.confirmed ? 'Sim' : 'Não',
        sortable: true
    },
    {
        name: 'Executado em',
        selector: row => row.confirmed_at ? moment(row.confirmed_at).format('DD/MM/YYYY HH:mm:ss') : '00/00/0000',
        sortable: true
    },
    {
        name: 'Executado por',
        selector: row => row.event.source === 'system' ? 'sistema' : 'usuário',
        sortable: true
    },
]


const paginationComponentOptions = {
    rowsPerPageText: 'Registros por página',
    rangeSeparatorText: 'de',

};

const Logs = () => {

    const [logs, setLogs] = useState([]);
    const { sendRequest } = useHttp();

    const handleData = (res) => {
        setLogs(res.data);
    }
    useEffect(() => {
        sendRequest({ url: `${process.env.REACT_APP_API_URL}/devices/ack/history` }, handleData)
    }, []);

    return (
        <div className="main-container">
            <DataTable pagination noDataComponent="Não há histórico"  defaultSortAsc={false} paginationComponentOptions={paginationComponentOptions}  columns={columns} data={logs ? logs : []} />

        </div>
    );
}

export default Logs;