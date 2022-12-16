import React from 'react'

const StatusContext = React.createContext({
  statusFan: false,
  statusExaust: false,
  setStatusFan: status => {},
  setStatusExaust: status => {}
})

export default StatusContext
