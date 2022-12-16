import Badge from 'react-bootstrap/Badge'
import * as GiIcons from 'react-icons/gi'

import './plants.scss'

function Plant({name, description, image}) {
    return (
        <div className="card">
            <div className="card__header">
                <img
                    src="https://ciclovivo.com.br/wp-content/uploads/2020/06/mint-5229226_1280.jpg"
                    className="card__image"
                />
            </div>
            <div className="card__body">
                <div className="card__badge">
                    <Badge bg="success">
                        <GiIcons.GiPlantSeed /> Germinando
                    </Badge>
                </div>
                <h2 className="card__title">{name}</h2>
                <p className="card__description">{description}</p>
            </div>
            <button className="card__btn">Ver planta</button>
        </div>
    )
}

export default Plant