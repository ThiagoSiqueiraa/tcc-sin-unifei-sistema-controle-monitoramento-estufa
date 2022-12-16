import React, { memo, useState } from 'react'
import AddPlant from '../components/Plants/AddPlant'
import Plant from '../components/Plants/Plant'
import SideActionButton from '../components/UI/SideActionButton'


const Plants = () => {
  const [isToggled, setIsToggled] = useState(false)

  return (
    <div className="wrapper bootstrap">
      {isToggled && <AddPlant/>}
      <Plant name="teste"/>
      <Plant name="teste"/>
      <Plant name="teste"/>
      <Plant name="teste"/>
      <Plant name="teste"/>
      <Plant name="teste"/>
      <Plant name="teste"/>
      <Plant name="teste"/>


    <SideActionButton 
      icon={!isToggled ? 'fi-plus' : 'fi-close'} 
      click={() => setIsToggled(!isToggled)} 
      classes={`addsidebar-button addsidebar-show-add btn-primary 
          ${
            isToggled ? 'close-button-action' : ''
          }`} 
      />
      
    </div>
  )
}

export default Plants
