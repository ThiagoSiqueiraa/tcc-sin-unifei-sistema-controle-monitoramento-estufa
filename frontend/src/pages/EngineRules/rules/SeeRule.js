import { Accordion, AccordionDetails, AccordionSummary, Button, ButtonGroup, Chip, Divider, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Paper, Select, Stack, TextField, Typography } from "@mui/material";
import { Container, Modal, Row } from "react-bootstrap";
import { styled } from '@mui/material/styles';
import "./RulesContainer.css"
import { MdClose, MdExpandMore } from "react-icons/md";
import { useEffect, useState } from "react";
import useHttp from "../../../hooks/use-http";
import { Box } from "@mui/system";
import { v1 as uuidv1 } from 'uuid';
import { toast } from "react-toastify";
import { AiOutlinePlus } from 'react-icons/ai'


const SeeRule = () => {
    
    const [deviceId, setDeviceId] = useState(null)
    const { isLoading, sendRequest } = useHttp()
    const [devices, setDevices] = useState([])
    const [rule, setRule] = useState({
        rule: {
            name: "",
            conditions: {
                any: []
            },
            event: {
                type: '',
                params: {
                    trigger: []
                }
            }


        }
    })
    const [isEditing, setEditing] = useState(false)

    const deleteCondition = (id) => {
        console.log(rule)
        const device = devices.find(device => device._id === deviceId)
        const ruleWithConditionToRemove = device.rules.find(r => rule._id === r._id).rule
        const conditionToRemoveIndex = ruleWithConditionToRemove.conditions.any.findIndex(c => c.id === id)
        ruleWithConditionToRemove.conditions.any.splice(conditionToRemoveIndex, 1)
        setRule({ ...rule, rule: ruleWithConditionToRemove })





    }

    const handleResponse = async res => {
        const { data } = res
        if (data.success) {
            toast.success(
                'Regra salva com sucesso',
                {
                    position: toast.POSITION.TOP_RIGHT
                }
            )
        }
    }

    const alterRuleEditing = (isEditing) => {
        const raux = devices.find(device => device._id === rule.deviceId).rules.find(r => rule.id === r.id)
        raux.rule.isEditing = isEditing

    }

    const handleSubmit = (e) => {
        e.preventDefault()

        alterRuleEditing(false)

        sendRequest({ url: `${process.env.REACT_APP_API_URL}/devices/rules`, method: "POST", body: { conditions: rule.rule.conditions, events: rule.rule.event.params.trigger, id: deviceId, name: rule.rule.name, ruleId: rule._id } }, handleResponse)

    }

    const handleChange = (event, conditionId, key) => {

        
        alterRuleEditing(true)
        

        const { value } = event.target
        const { conditions } = rule.rule
        const { any } = conditions
        const condition = any.find(condition => condition.id === conditionId)
        condition[key] = value

        if (key === 'value') {

            condition[key] = +value
        }

        setRule((prevState) => {
            return {
                ...prevState,
                rule: {
                    ...prevState.rule,
                    conditions: {
                        ...prevState.rule.conditions,
                        any: any
                    }
                }
            }
        }
        )



    };

    const handleChangeEvent = (e, eventId) => {

        //set on rule object a attribute isEditing to true

                rule.rule.isEditing = true;
        const { value } = e.target
        const { event } = rule.rule

        event.params.trigger.find(trigger => trigger.id == eventId).event_type = value

        setRule((prevState) => ({ ...prevState, event: event }))

    };
    const newRule = (deviceId) => {
        const device = devices.find(device => device._id === deviceId)
        setDeviceId(deviceId)
        const ruleId = uuidv1()

        if (device.rules !== undefined && device.rules.length > 0) {
            device.rules.push({
                id: ruleId,
                deviceId: deviceId,
                rule: {
                    name: "Nova Regra",
                    conditions: {
                        any: []
                    },
                    event: {
                        params: {
                            trigger: []
                        }
                    },
                    created: true,
                    _id: ruleId

                },
            })
        } else {
            device.rules = [{
                id: ruleId,
                deviceId: deviceId,
                rule: {
                    name: "Nova Regra",
                    conditions: {
                        any: []
                    },
                    event: {
                        params: {
                            trigger: []
                        }
                    },
                    created: true,
                    _id: ruleId
                },
            }]
        }

        setRule(device.rules[device.rules.length - 1])

    }

    const handleData = async res => {
        const { data } = res
        const devicesMapped = data.map(device => {
            if (device.rules !== undefined && device.rules.length > 0) {
                device.rules.forEach(rule => {
                    rule.rule = JSON.parse(rule.rule)
                    rule.deviceId = device._id
                    rule.id = rule._id
                    rule.rule.conditions.any.forEach(condition => {
                        condition.id = uuidv1()
                    })
                    rule.rule.event.params.trigger.forEach(event => {
                        event.id = uuidv1()
                    })
                })
            } else {
                device.rules = []
            }

            return device
        })
        setDevices(devicesMapped)



    }

    const handleEditRule = (ruleId, deviceId) => {

        const rule = devices.find(device => device._id === deviceId).rules.find(rule => rule.id === ruleId)


        setRule(rule)
        setDeviceId(deviceId)
        setEditing(ruleId)


    }

    useEffect(() => {
        sendRequest({ url: `${process.env.REACT_APP_API_URL}/devices` }, handleData)
    }, [])

    return (
        <Grid style={{ minHeight: 'calc(100vh - 70px)' }} container columns={16}>
            <Grid className="rule__wrapper" item xs={3}>
                <div>
                    <div className="rule__stack">
                        {devices && devices.map((device) => {
                            return <div className="rule__device" key={device._id}>
                                <Accordion>

                                    <AccordionSummary
                                        expandIcon={<MdExpandMore />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <Typography>{device.name} #{device.pin}</Typography>

                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <ButtonGroup
                                            orientation="vertical"
                                            aria-label="vertical contained button group"
                                            fullWidth
                                            color="secondary"
                                            variant="contained">
                                            {device.rules && device.rules.map((item, index) => {
                                                
                                                return <Button style={{ display: 'block', backgroundColor: '#BDC0CE', marginBottom: '2px', border: 'none', color: 'black', width: "100%" }} onClick={() => {
                                                    handleEditRule(item.id, device._id)
                                                }}>{item.rule.isEditing && <span className="pending__save"></span>} {item.rule.name} </Button>
                                            })}
                                            <div style={{ marginBottom: "5px", marginTop: "5px" }}></div>
                                            <Button variant="outlined" color="success" onClick={() => {
                                                newRule(device._id)
                                                setEditing(true)
                                            }}><AiOutlinePlus /> Nova Regra</Button>

                                        </ButtonGroup>


                                    </AccordionDetails>



                                </Accordion>

                            </div>
                        })}


                    </div>


                </div>

            </Grid>
            <Grid className="rule__container" item xs={13}>
                {!isEditing && <div className="rule__empty">
                    <h5>Selecione uma regra para editar</h5>
                </div>}

                {isEditing &&
                    <Container>
                        <div className='rule__header'>
                            <Box
                                component="form"
                                sx={{
                                    '& > :not(style)': { m: 1, width: '25ch' },
                                }}
                                noValidate
                                autoComplete="off"
                            >
                                <TextField onChange={(e) => {

                                    const deviceRule = devices.find(device => device._id === deviceId).rules.find(r => r.id === rule.id)
                                    deviceRule.rule.name = e.target.value
                                
                                    //enable editing
                                    deviceRule.rule.isEditing = true

                                    setRule((prevState) => ({ ...prevState, rule: deviceRule.rule }))

                                }} value={rule && rule.rule.name} id="outlined-basic" label="Nome" variant="outlined" />

                            </Box>

                            <div className='fixed_wrapper'>

                                <div className="rule__actions" style={{ display: `${isEditing ? 'block' : 'none'}` }}>
                                    <Button className="m-r-5" variant="outlined" color="error">
                                        Deletar
                                    </Button>
                                    <Button onClick={handleSubmit} variant="outlined" color="success">
                                        Salvar
                                    </Button>
                                </div>
                            </div>


                        </div>
                        <Row>
                            <Typography>SE</Typography>
                            {rule && rule.rule.conditions.any.map((condition, index) => {
                                return <Row>
                                    <div className="rule__condition">
                                        <FormControl style={{ width: 300 }}>
                                            <InputLabel id="rule-variable-fact">Variável</InputLabel>
                                            <Select
                                                labelId="rule-variable-fact"
                                                id="demo-simple-select"
                                                value={condition.fact}
                                                label="Variável"
                                                onChange={(e) => {
                                                    handleChange(e, condition.id, 'fact')
                                                }}
                                            >
                                                <MenuItem value={'airHumidity'}>Umidade do ar</MenuItem>
                                                <MenuItem value={'airTemperature'}>Temperatura do ar</MenuItem>
                                            </Select>
                                        </FormControl>
                                        <FormControl style={{ width: 300 }}>
                                            <InputLabel id="rule-variable-condition">quando</InputLabel>

                                            <Select
                                                labelId="rule-variable-condition"
                                                value={condition.operator}
                                                onChange={(e) => {
                                                    handleChange(e, condition.id, 'operator')
                                                }}

                                            >

                                                <MenuItem value={'lessThan'}>Menor à</MenuItem>
                                                <MenuItem value={'lessThanInclusive'}>Menor ou igual à</MenuItem>
                                                <MenuItem value={'greaterThan'}>Maior à</MenuItem>
                                                <MenuItem value={'greaterThanInclusive'}>Maior ou igual à</MenuItem>
                                            </Select>
                                        </FormControl>


                                        <TextField
                                            id="filled-number"
                                            label="valor"
                                            type="number"
                                            value={condition.value}
                                            onChange={(e) => {
                                                handleChange(e, condition.id, 'value')
                                            }}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            variant="outlined"
                                        />
                                        <MdClose onClick={() => {
                                            deleteCondition(condition.id)
                                        }} style={{ marginLeft: 'auto' }} />
                                    </div>
                                    {index !== rule.rule.conditions.any.length - 1 && <span style={{textAlign: 'center'}}><Chip style={{backgroundColor: '#c3efc4'}}  label="OU" /></span>}
                                </Row>
                            })}

                            <Divider>
                                <Chip onClick={() => {
                                    const condition = {
                                        id: uuidv1(),
                                        operator: '',
                                        fact: '',
                                        value: 0
                                    }


                                    const deviceRule = devices.find((item) => {
                                        return item._id === rule.deviceId
                                    })

                                    const ruleIndex = deviceRule.rules.findIndex((item) => {
                                        return item._id === rule._id
                                    })

                                    deviceRule.rules[ruleIndex].rule.conditions.any.push(condition)
                                    setDevices((prevState) => { return [...prevState] })
                                    setRule(deviceRule.rules[ruleIndex])

                                }} label="Adicionar Condição" />

                                {/* <Chip variant="outlined" color="success" label="+ E" /> */}
                            </Divider>
                        </Row>
                        <Row>
                            <Typography>ENTÃO (ações quando a condição for <strong style={{ color: '#81c784' }}>VERDADEIRA</strong>)</Typography>
                            {rule && rule.rule.event.params.trigger.map((event, index) => {
                                return <Row>
                                    <div className="rule__condition">
                                        <FormControl style={{ width: 300 }}>
                                            <InputLabel id="rule-variable-fact">Ação</InputLabel>
                                            <Select
                                                labelId="rule-variable-fact"
                                                id="demo-simple-select"
                                                value={event.event_type}
                                                label="Variável"
                                                inputProps={{
                                                    name: 'MyName',

                                                    'data-id': event['id']
                                                }}
                                                onChange={(e) => {
                                                    handleChangeEvent(e, event['id'])
                                                }}
                                            >
                                                <MenuItem value={'SET_DEVICE_OFF'}>Desligar este dispositivo</MenuItem>
                                                <MenuItem value={'SET_DEVICE_ON'}>Ligar este dispositivo</MenuItem>
                                                <MenuItem value={'SET_BRIGHTNESS'}>Ajustar intensidade</MenuItem>
                                                <MenuItem value={'CALL_EVENT'}>Disparar evento</MenuItem>

                                            </Select>
                                        </FormControl>




                                        <MdClose style={{ marginLeft: 'auto' }} />
                                    </div>
                                </Row>
                            })}
                            <Divider>
                                <Chip onClick={() => {
                                    const event = {
                                        name: 'teste',
                                        id: uuidv1(),
                                        event_type: '',
                                    }

                                    const deviceRule = devices.find((item) => {
                                        return item._id === rule.deviceId
                                    })

                                    const ruleIndex = deviceRule.rules.findIndex((item) => {
                                        return item._id === rule._id
                                    })

                                    deviceRule.rules[ruleIndex].rule.event.params.trigger.push(event)
                                    setDevices((prevState) => { return [...prevState] })
                                    setRule(deviceRule.rules[ruleIndex])

                                }} variant="outlined" color="success" label="+ AÇÃO" />
                            </Divider>
                        </Row>
                    </Container>}
            </Grid>
        </Grid >
    );
}

export default SeeRule