import { useState } from "react"

const OptionGraph = ({type, icon, customClass, onClick}) => {

    const title = {
        metric: 'Métricas',
        sensor: 'Sensores',
        line: 'Linha',
        table: 'Tabela',
        variable: 'Variáveis',
        events: 'Eventos',
        bar: 'Barras',
    }[type]


    return (
        <div onClick={onClick} className={`type-option chart-type ${customClass}`} option-value={type}>
            {icon}
            <span>{title}</span>
        </div>
    )
}

export default OptionGraph