import React, { useState } from "react"
import useHttp from "../../../hooks/use-http"

const { Form, Button } = require("react-bootstrap")

const NewEngineRuleForm = ({ devices }) => {

    const handleData = (response) => {
        if(response.data.success){
            
 


        }
    }
    const { isLoading, sendRequest } = useHttp()
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(fact)
        console.log(operator)
        console.log(value)
        console.log(device)
        console.log(action)
        sendRequest({ url: `${process.env.REACT_APP_API_URL}/devices/rules`, method: "POST", body: { fact, operator, value, id: device, action } }, handleData)

        
    }

    const [fact, setFact] = useState("")
    const [operator, setOperator] = useState()
    const [value, setValue] = useState()
    const [device, setDevice] = useState()
    const [action, setAction] = useState()

    return (
        <React.Fragment>        
            {isLoading && <h1>Loading...</h1>}

        <Form>


            <Form.Group className="mb-3" controlId="formBasicPin">
                <Form.Label>QUANDO</Form.Label>
                <Form.Select onChange={(e) => {setFact(e.target.value)}} aria-label="Default select example">
                    <option value="temperature">Temperatura do ar</option>
                    <option value="humidity">Umidade do ar</option>
                </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicIcon">
                <Form.Label>FOR</Form.Label>
                <Form.Select onChange={(e) => {setOperator(e.target.value)}} aria-label="Default select example">
                    <option value="lessThan">Menor à</option>
                    <option value="greaterThan">Maior à</option>
                    <option value="lessThanInclusive">Menor ou igual à</option>
                    <option value="greaterThanInclusive">Maior ou igual à</option>
                </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicIcon">
                <Form.Label>VALOR</Form.Label>
                <Form.Control onChange={(e) => {setValue(e.target.value)}} type="number" step={0.1} />

            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicIcon">
                <Form.Label>ENTÃO</Form.Label>
                <Form.Select onChange={(e) => {setAction(e.target.value)}} aria-label="Default select example">
                    <option value="turnON">Desligar o dispositivo</option>
                    <option value="turnOFF">Ligar o dispositivo</option>
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>
                    DISPOSITIVO <span class="text-danger">*</span>
                </Form.Label>
                <Form.Select onChange={(e) => {setDevice(e.target.value)}} aria-label="Default select example">
                    {devices.length > 0 && devices.map((device) => {
                        return <option key={device._id} value={device._id}>{device.name}</option>
                    })}
                </Form.Select>
                <Form.Text className="text-muted"></Form.Text>
            </Form.Group>
            <Button onClick={handleSubmit} type="submit" variant="primary">
                Adicionar
            </Button>
        </Form>
        </React.Fragment>)
}


export default NewEngineRuleForm