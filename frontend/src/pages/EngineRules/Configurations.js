import React, { useEffect, useState } from 'react'
import './NewConfigurations.css'

import { connect } from 'react-redux'
import useHttp from '../../hooks/use-http'
import NewEngineRuleForm from './forms/NewEngineRuleForm'
import RulesContainer from './rules/RulesContainer'
function Configurations() {

  const { isLoading, sendRequest } = useHttp()
  const [devices, setDevices] = useState([])
  const [isToggled, setIsToggled] = useState(false)

  const handleData = async res => {
    const { data } = res
    console.log(data)
    setDevices(data)
  }

  useEffect(() => {
    sendRequest({ url: `${process.env.REACT_APP_API_URL}/devices` }, handleData)
  }, [])

  return (
    <React.Fragment>
      <div className={`addsidebar ${isToggled ? 'show' : ''}`}>
        <div className="add-wrapper">
          <h2 class="header-title">Nova regra</h2>
          <NewEngineRuleForm devices={devices}/>
        </div>
      </div>

      <RulesContainer devices={devices} setIsToggled={setIsToggled} isToggled={isToggled}/>
    </React.Fragment>

  )
}



export default Configurations