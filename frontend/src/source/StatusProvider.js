import { useState } from 'react'

import StatusContext from './status-context'

const StatusProvider = props => {
  const [statusFan, setStatusFan] = useState(false)
  const [statusExaust, ] = useState(false)

  const setStatusFanHandler = status => {
    setStatusFan(status)
  }

  const setStatusExaustHandler = (status, id) => {
    const doc = document.getElementById(id)

    if (status) {
      doc.classList.add('online')
    } else {
      doc.classList.remove('online')
    }

    //setStatusExaust(status)
  }

  const statusContext = {
    statusFan: statusFan,
    statusExaust: statusExaust,
    setStatusExaust: setStatusExaustHandler,
    setStatusFan: setStatusFanHandler
  }

  return (
    <StatusContext.Provider value={statusContext}>
      {props.children}
    </StatusContext.Provider>
  )
}

export default StatusProvider
