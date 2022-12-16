import React, { useContext, useEffect } from 'react'
import * as GiIcons from 'react-icons/gi'
import * as BsIcons from 'react-icons/bs'
import axios from 'axios'
import Card from '../UI/Card/Card'
import Switch from '../UI/Switch'
import { useState } from 'react'
import classes from './ReleInput.module.css'
import { toast } from 'react-toastify'
const ICONS = {
  'GiIcons.GiComputerFan': <GiIcons.GiComputerFan className="icon" />,
  BsLightbulb: <BsIcons.BsLightbulb className="icon" />
}
function RelayToggle({ title, events, device, id, status, icon }) {
  async function sendMQTT(isToggled, device) {
    const ACTION = isToggled ? 'SET_DEVICE_ON' : 'SET_DEVICE_OFF'



    const response = await axios.put(`${process.env.REACT_APP_API_URL}/devices/${id}/${ACTION}`)
    if (response.data.error) {
      toast.error(response.data.message, {
        position: toast.POSITION.TOP_RIGHT
      })
      setIsToggled(false)
      return
    }
    setIsToggled(isToggled)
  }

  useEffect(() => {
    setIsToggled(status)
  }, [status])
  const [isToggled, setIsToggled] = useState(false)
  const className = isToggled ? '' : ''
  return (
    <div>
      <div className={`wrapper-rele-input ${className}`}>
        {/* <span className={classes['icon-container']}>{ICONS[icon]}</span> */}
        <Switch
          isToggled={isToggled}
          onChange={() => {
            sendMQTT(!isToggled, device)
          }}
        />
        <span className={classes['device-title']}>{title}</span>


      </div>
    </div>
  )
}

export  {RelayToggle}
