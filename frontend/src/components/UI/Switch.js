import React from 'react'
import './Switch.css'
function Switch({ onChange, isToggled, className }) {
  const classes = `switch ${className ? className : ''}`
  return (
    <label className={classes}>
      <input type="checkbox" checked={isToggled} onChange={onChange} />
      <span className="slider" />
    </label>
  )
}

export default Switch
