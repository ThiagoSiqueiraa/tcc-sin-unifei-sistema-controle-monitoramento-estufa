import classesName from './Card.module.css'

const Card = props => {
  const classes = `${classesName.card} ${
    props.className ? props.className : ''
  }`
  return <div className={classes}>{props.children}</div>
}

export default Card
