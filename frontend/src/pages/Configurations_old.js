// import React, { useEffect, useState } from 'react'
// import store from '../store'
// import { useDispatch } from 'react-redux'
// import { addConditional } from '../store/modules/conditionals/actions'
// import classes from './Configurations.module.css'
// import * as AiIcons from 'react-icons/ai'
// import Condition from './Condition_old'
// import axios from 'axios'
// import * as FcIcons from 'react-icons/fc'
// import * as FaIcons from 'react-icons/fa'
// import { useSelector, connect } from 'react-redux'
// import { Button, Form, OverlayTrigger, Image, Tooltip } from 'react-bootstrap'
// import Configuration from '../components/Dashboard/Configuration'
// import useInput from '../hooks/use-input'
// import { isNumber } from 'lodash'

// function Configurations(props) {
//   const {
//     value: enteredName,
//     isValid: enteredNameIsValid,
//     hasError: nameInputHasError,
//     valueChangeHandler: nameChangeHandler,
//     inputBlurHandler: nameBlurHandler,
//     reset: resetNameInput
//   } = useInput(value => isNumber(+value))
//   let formIsValid = false
//   if (enteredNameIsValid) {
//     formIsValid = true
//   }
//   const [devices, setDevices] = useState({})
//   const [devicesDb, setDevicesDb] = useState({})

//   const RenderConditionally = configurations => {
//     if (configurations && configurations.length > 0) {
//       const configurationsComponent = configurations.map(configuration => {
//         return <Configuration />
//       })
//       return configurationsComponent
//     }
//     return null
//   }

//   const submitConditional = async () => {
//     const res = await axios.post(
//       `http://localhost:3001/conditionals/create`,
//       {
//         conditionals: props.conditionals
//       }
//     )
//     window.location.reload()
//   }
//   //const title = React.createElement('div', {}, [Condition])
//   async function saveConfigurationHandler() {
//     const res = await axios.post(`http://localhost:3001/save-configuration`, {
//       configuration: configuration
//     })
//   }
//   const [conditions, setConditions] = useState([])
//   const [configuration, setConfiguration] = useState({
//     key: '',
//     value: {
//       channels: 0
//     }
//   })

//   const configurationChangeHandler = event => {
//     console.log(configuration)
//     let newConfiguration = {
//       value: {
//         channels: event.target.value
//       },
//       key: event.target.dataset.variable
//     }
//     setConfiguration(prevState => {
//       return {
//         _id: prevState['_id'],
//         ...newConfiguration
//       }
//     })
//   }

//   useEffect(() => {
//     const fetchDevices = async () => {
//       const res = await axios.get(`http://localhost:3001/devices`)
//       const devices = res.data
//       setDevicesDb(devices)
//     }
//     fetchDevices()
//   }, [])

//   const getConfigurations = async () => {
//     const { data } = await axios.get('http://localhost:3001/configurations')
//     const mappedConfigurations = data.map(configuration => {
//       return {
//         ...configuration,
//         value: JSON.parse(configuration.value)
//       }
//     })
//     setConfiguration(mappedConfigurations[0])
//   }
//   useEffect(() => {
//     getConfigurations()
//   }, [])
//   useEffect(() => {
//     const fetchData = async () => {
//       const res = await axios.get(`http://localhost:3001/conditionals/list`)

//       setDevices(res.data)
//       if (res.data.length > 0) {
//         const mappedComponents = res.data.map((conditional, index) => {
//           return (
//             <Condition
//               action={conditional.action}
//               conditional={conditional.conditional}
//               device={
//                 conditional.device[0] ? conditional.device[0]['_id'] : null
//               }
//               devices={devicesDb}
//               variable={conditional.variable}
//               value={conditional.value}
//               id={conditional['_id']}
//               created={true}
//               key={conditional['_id']}
//             />
//           )
//         })
//         setConditions(mappedComponents)
//       } else {
//         setConditions([])
//       }
//     }
//     fetchData()
//   }, [devicesDb])
//   function appendChild() {
//     const id = new Date().getTime().toString()
//     setConditions(prevState => {
//       return [
//         ...prevState,
//         <Condition
//           variable="temperature"
//           conditional=">"
//           action="TURN_ON"
//           device={devicesDb[0]['_id']}
//           devices={devicesDb}
//           value={0}
//           created={false}
//           id={id}
//           key={id}
//         />
//       ]
//     })
//   }

//   function changeMinHandler(event) {
//     event.persist()
//     setConfiguration(prevState => {
//       //prevState[event.target.name] = event.target.value
//       let configurationObject = {}
//       configurationObject[event.target.dataset.type] = event.target.value
//       //prevState['variable'] = event.target.dataset.variable
//       prevState['key'] = event.target.dataset.variable
//       return {
//         ...prevState,
//         value: { ...prevState.value, ...configurationObject }
//       }
//     })
//   }

//   const handleRelayConfiguration = event => {
//     event.persist()
//     setConfiguration(prevState => {
//       //prevState[event.target.name] = event.target.value
//       let configurationObject = {}
//       configurationObject[event.target.dataset.type] = +event.target.value
//       //prevState['variable'] = event.target.dataset.variable
//       prevState['key'] = event.target.dataset.variable
//       return {
//         ...prevState,
//         value: { ...prevState.value, ...configurationObject }
//       }
//     })
//   }

//   return (
//     <div>
     
//       {RenderConditionally(configuration)}
//       <Form className="d-flex align-items-center">
//         <Form.Group className="mb-3" controlId="formBasicEmail">
//           <Form.Label>Módulo relé</Form.Label>
//           <Form.Control
//             type="number"
//             name="min"
//             step={1}
//             min={1}
//             value={configuration.value.channels}
//             onChange={configurationChangeHandler}
//             onBlur={nameBlurHandler}
//             data-variable="relay"
//             data-type="channels"
//           ></Form.Control>
//           <Form.Text className="text-muted">Quantidades de canais</Form.Text>
//           {nameInputHasError && <p>Este campo não pode ficar vazio.</p>}
//         </Form.Group>
//         <Form.Group>
//           <Button disabled={!formIsValid} onClick={saveConfigurationHandler}>
//             Salvar
//           </Button>
//         </Form.Group>
//       </Form>
//       <hr />
//       <div className={classes['conditions-wrapper']}>
//         <h3>
//           CONDIÇÕES{' '}
//           <OverlayTrigger
//             key={'test'}
//             placement={'right'}
//             overlay={
//               <Tooltip id={`tooltip-right`}>
//                 As condições define as regras para a automação do{' '}
//                 <strong>acionamento de cargas</strong> quando o{' '}
//                 <strong>modo automático estiver ligado</strong>.
//               </Tooltip>
//             }
//           >
//             <span>
//               <AiIcons.AiOutlineInfoCircle />
//             </span>
//           </OverlayTrigger>
//         </h3>

//         <div style={{ width: '15%' }}>
//           <Button onClick={appendChild} variant="primary" size="sm">
//             <AiIcons.AiFillPlusSquare></AiIcons.AiFillPlusSquare>
//             Nova condição
//           </Button>
//         </div>
//         <div id="conditions" className={classes.conditions}>
//           {conditions ? conditions : ''}
//           <Form.Group>
//             <Button type="submit" onClick={submitConditional}>
//               Salvar condições
//             </Button>
//           </Form.Group>
//         </div>
//       </div>
//     </div>
//   )
// }

// const mapStateToProps = state => {
//   const { conditionals } = state.conditionals
//   return {
//     conditionals
//   }
// }
// export default connect(mapStateToProps, {})(Configurations)
