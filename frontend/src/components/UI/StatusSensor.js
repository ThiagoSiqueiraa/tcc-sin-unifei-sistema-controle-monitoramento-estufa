import React from 'react'

function StatusSensor({ title, id, status }) {
  const classOnline = `status-circle ${status ? 'online' : ''}`
  console.log(classOnline)

  return (
    <React.Fragment>
      <div className={classOnline}></div>
    </React.Fragment>
  )
}

export default StatusSensor
