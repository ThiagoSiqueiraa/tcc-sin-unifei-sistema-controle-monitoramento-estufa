import { Button } from "react-bootstrap"
import * as GiIcons from 'react-icons/gi'

function ConfigurationCard(){
    return (
        <div className="card-wrapper">
        <div className="card-icon"><GiIcons.GiComputerFan/></div>
        <div className="card-title">Ventilador</div>
        {/* <div className="card-rules">
          <div className='card-rule'><span class="card-rule-description">Se temperatura MAIOR QUE 32 °C então ligar</span></div>
          <div className='card-rule'><span class="card-rule-description">Se temperatura MAIOR QUE 32 °C então ligar</span></div>
          <div className='card-rule'><span class="card-rule-description">Se temperatura MAIOR QUE 32 °C então ligar</span></div>        
          <div className='card-rule'><span class="card-rule-description">Se temperatura MAIOR QUE 32 °C então ligar</span></div>
    
        </div> */}
        <div className="card-actions"><Button className='primary'>Ver detalhes</Button></div>
      </div>
    )
}

export {ConfigurationCard}