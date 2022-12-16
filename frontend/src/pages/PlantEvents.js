import React from 'react'
import classes from './PlantEvents.module.css'
function PlantEvents() {
  return (
    <div className={classes['plant-wrapper']}>
      <div className={classes['plant-info']}>
        <div className="plant-name">
          <h2>Morgana</h2>
        </div>
        <div className={classes['plant-image']}>
          <img
            src="https://www.seed-city.com/components/com_virtuemart/shop_image/product/Gorilla_Glue_Aut_5c06911b2c8b5.jpg"
            alt=""
          />
        </div>
        <div className="plant-genetic-wrapper">
          <div className={classes['plant-genetic-title']}>
            Preenseeds do Coala
          </div>
          <div className={classes['plant-genetic-info']}>
            <p>Tipo: Regular</p>
            <p>Altura: Regular</p>
            <p>Tempo de floração: Regular</p>
          </div>
        </div>
      </div>
      <div className={classes['plant-events']}>
        <h4>Eventos</h4>
      </div>
    </div>
  )
}

export default PlantEvents
