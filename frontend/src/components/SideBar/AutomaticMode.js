import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Switch from '../UI/Switch'

function AutomaticMode() {
  const [isToggled, setIsToggled] = useState(false)
  const [show, setShow] = useState(false)
  const handleShow = () => setShow(true)

  const setAutomaticMode = async () => {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/change-automatic`,
      {
        action: !isToggled ? 'ENABLE_AUTOMATIC_MODE' : 'DISABLE_AUTOMATIC_MODE'
      }
    )
  }

  // useEffect(() => {
  //   const fetchConfiguration = async () => {
  //     const { data } = await axios.post(
  //       `${process.env.REACT_APP_API_URL}/configurations/query`,
  //       {
  //         query: { key: 'automatic_mode' }
  //       }
  //     )
  //     const automaticMode = JSON.parse(data[0].value).isEnabled
  //     setIsToggled(automaticMode)
  //     console.log(automaticMode)
  //   }
  //   fetchConfiguration()
  // }, [])

  return (
    <div className="test-absolute automatic-title">
      MODO AUTOMÁTICO
      <Switch
        isToggled={isToggled}
        onChange={() => {
          handleShow()
          setAutomaticMode()
          setIsToggled(!isToggled)
        }}
      ></Switch>
    </div>
  )
}

export default AutomaticMode
