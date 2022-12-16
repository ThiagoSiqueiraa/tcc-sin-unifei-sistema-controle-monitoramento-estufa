// import React, { useEffect, useState } from 'react'
// import classes from './Condition.module.css'
// import { useDispatch } from 'react-redux'
// import { addConditional } from '../store/modules/conditionals/actions'
// function Condition(props) {
//   const classCreated = props.created ? classes.created : undefined
//   const dispatch = useDispatch()
//   const device = { id: props.id }
//   const [value, setValue] = useState(0)
//   const RenderConditionally = ({ options, selected, onChange }) =>
//     options.length > 0 ? (
//       <select onChange={onChange} defaultValue={selected}>
//         {options.map(item => (
//           <option key={item['_id']} value={item['_id']}>
//             {item.name}
//           </option>
//         ))}
//       </select>
//     ) : null


//   useEffect(() => {
//     setValue(props.value)

//     dispatch(
//       addConditional({
//         variable: props.variable,
//         conditional: props.conditional,
//         action: props.action,
//         device: props.device,
//         id: props.id,
//         created: props.created,
//         value: props.value
//       })
//     )
//   }, [])
//   return (
//     <div className={`${classes.box} ${classCreated ? classCreated : ''}`}>
//       <p>
//         se
//         <select
//           onChange={e => {
//             e.persist()

//             dispatch(
//               addConditional({ variable: e.target.value, id: device.id })
//             )
//           }}
//           defaultValue={props.variable}
//         >
//           <option value="temperature">TEMPERATURA</option>
//           <option value="humidity">UMIDADE</option>
//         </select>
//         <select
//           onChange={e => {
//             e.persist()

//             dispatch(
//               addConditional({ conditional: e.target.value, id: device.id })
//             )
//           }}
//           defaultValue={props.conditional}
//         >
//           <option value=">">MAIOR QUE</option>
//           <option value="<">MENOR QUE</option>
//           <option value=">=">MAIOR OU IGUAL QUE</option>
//           <option value="<=">MENOR OU IGUAL QUE</option>
//         </select>
//         <input
//           type="number"
//           value={value}
//           onChange={e => {
//             e.persist()
//             setValue(e.target.value)
//             dispatch(addConditional({ value: +e.target.value, id: device.id }))
//           }}
//         />
//         {/* <select
//           onChange={e => {
//             e.persist()

//             dispatch(addConditional({ value: +e.target.value, id: device.id }))
//           }}
//           defaultValue={props.value}
//         >
//           <option value={props.min}>{props.min}</option>
//           <option value={props.max}>{props.max}</option>
//         </select> */}
//         <select
//           onChange={e => {
//             e.persist()

//             dispatch(addConditional({ action: e.target.value, id: device.id }))
//           }}
//           defaultValue={props.action}
//         >
//           <option value="TURN_OFF">DESLIGAR</option>
//           <option value="TURN_ON">LIGAR</option>
//         </select>
//         {RenderConditionally({
//           options: props.devices,
//           selected: props.device,
//           onChange: e => {
//             e.persist()

//             dispatch(addConditional({ device: e.target.value, id: device.id }))
//           }
//         })}
//       </p>
//     </div>
//   )
// }

// export default Condition
