import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from "@mui/material"
import React, { useState } from "react"
import { Col, Row } from "react-bootstrap"
import SideActionButton from "../../../components/UI/SideActionButton"
import Rule from "./Rule"
import "./RulesContainer.css"

const constructRule = (rule) => {
    const json = JSON.parse(rule.rule)
    const DE_PARA_OPERADORES = {
        'greaterThanInclusive': 'maior ou igual à',
        'greaterThan': 'maior que'
    }

    const DE_PARA_ACTION = {
        'turnONN': 'ligar',
        'turnOFF': 'desligar'
    }

    const DE_PARA_VARIAVEL = {
        'temperature': 'temperatura',
        'humidity': 'umidade'
    }

    return (
        <Typography align="center" variant="overline" display="block" >
        Quando {DE_PARA_VARIAVEL[json.conditions.all[0].fact]} for {DE_PARA_OPERADORES[json.conditions.all[0].operator]} {json.conditions.all[0].value} então {DE_PARA_ACTION[json.event.params.action]} {json.event.params.value}
        </Typography>
        
    )
}

const constructDeviceRulesCard = (rules) => {
    let regras = []
    for(let i = 0; i < 4; i++) {
        let rule = rules[i]
        if(rule !== undefined)
            regras.push(constructRule(rule))

    }

    return regras
}

const RulesContainer = ({ devices, setIsToggled, isToggled }) => {

    return (
        <React.Fragment>
            <div className='rules__container'>
                <Grid container rowSpacing={2} columnSpacing={{ xs: 4, sm: 4, md: 4 }}>
                    {devices && devices.map((device) => {
                        return (
                            <Grid item xs={4}>
                                <Card  className="rule__card">

                                    <CardContent>
                                    <Typography variant="h6" gutterBottom align="center">
                                    <Typography variant="h6" align="left">{device.name}</Typography> <Typography align="right">Pino: {device.pin}</Typography>
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                           {device.rules && constructDeviceRulesCard(device.rules)}
                                        </Typography>
                                    </CardContent>
                                    <CardActions disableSpacing position="fixed">
                                        <Button size="small">Ver regras</Button>
                                        
                                    </CardActions>
                                </Card>
                            </Grid>
                        )
                    })}
                </Grid>
            </div>


            <SideActionButton icon={!isToggled ? 'fi-plus' : 'fi-close'} click={() => setIsToggled(!isToggled)} classes={`addsidebar-button addsidebar-show-add btn-primary ${isToggled ? 'close-button-action' : ''
                }`} />
        </React.Fragment>)
}

export default RulesContainer