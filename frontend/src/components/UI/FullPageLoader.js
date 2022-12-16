import React from 'react'
import LoaderGif from '../../assets/img/loader.gif'
import classes from './FullPageLoader.module.css'
function FullPageLoader() {
  return (
    <div className={classes['loading']}>
      <div className={classes['loader-container']}>
        <div className={`${classes.dot} ${classes['dot-1']}`}></div>
        <div className={`${classes.dot} ${classes['dot-2']}`}></div>
        <div className={`${classes.dot} ${classes['dot-3']}`}></div>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
        <defs>
          <filter id="goo">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="10"
              result="blur"
            ></feGaussianBlur>
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 21 -7"
            ></feColorMatrix>
          </filter>
        </defs>
      </svg>
    </div>
  )
}

export default FullPageLoader
