import classes from './Rule.module.css'
import Select from 'react-select'
import { Col, Row } from 'react-bootstrap'

const options = [
    { value: 'temperature', label: 'Temperatura do ar' },
    { value: 'humidity', label: 'Umidade do ar' },
]

const optionsConditions = [
    { value: 'temperature', label: 'Menor à' },
    { value: 'humidity', label: 'Maior à' },
    { value: 'temperature', label: 'Menor ou igual à' },
    { value: 'humidity', label: 'Maior ou igual à' },
]

const OPTIONS_ACTIONS = [
    { value: 'TURN_OFF', label: "Ligar" },
    { value: 'TURN_OFF', label: "Desligar" },
]

const Rule = ({ devices }) => {
    return (
        <Row className='rule'>


            <Col className="mb-3">


                <Row>
                    <Select value={
                        options.filter(option =>
                            option.value === 'temperature')
                    } isDisabled={true} options={options} placeholder={'Escolha qual variável será utilizada'} />
                </Row>


            </Col>

            <Col className="mb-3">

                <Row>
                    <Select isDisabled={true} options={optionsConditions} placeholder={"Escolha a condição"} />

                </Row>


            </Col>

            <Col className="mb-3">


                <Row>
                    <input className={`${classes['value-condition']} ${classes['item-condition']}`} type={'number'} step={0.01}></input>
                </Row>


            </Col>

            <Col className="mb-3">

                <Row>
                    <Select isDisabled={true} options={OPTIONS_ACTIONS} placeholder={""} />

                </Row>
            </Col>

            <Col className="mb-3">


                <Row>
                    <Select isDisabled={true} placeholder={"Escolha o dispositivo"} options={devices.length > 0 && devices.map((device) => {
                        return {
                            value: device._id,
                            label: device.name
                        }
                    })} />
                </Row>



            </Col>

        </Row>


    )
}

export default Rule