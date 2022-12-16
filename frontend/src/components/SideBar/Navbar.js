import React, { useContext } from 'react'
import InfoSidebar from './InfoSidebar'
import StatusContext from '../../source/status-context'
import { useLocation } from 'react-router-dom'
import AutomaticMode from './AutomaticMode'

function Navbar() {
  const ctx = useContext(StatusContext)

  const NAVBAR_TEXTS = [
    { page: '/', text: 'Dashboard' },
    { page: '/relatorios', text: 'Relatórios' },
    { page: '/plants', text: 'Plantas' },
    { page: '/configuracoes', text: 'Configurações' },
    { page: '/dispositivos', text: 'Dispositivos' },
    { page: '/vpd', text: 'VPD' },

    {
      page: '/dispositivos/editar',
      text: 'Dispositivos',
      subtext: 'Dispositivos > Editar'
    },
    {
      page: '/genetics',
      text: 'Genéticas'
    }
  ]

  // const handleContinue = async () => {
  //   await axios.post('http://localhost:3001/mqtt')

  //   setShow(false)
  // }
  // const handleClose = () => setShow(false)

  // const cancel = () => {
  //   setShow(false)
  //   setIsToggled(false)
  // }

  const location = useLocation()

  const textToShow = NAVBAR_TEXTS.find(
    el => el.page === location.pathname
  )?.text

  const subTextToShow = NAVBAR_TEXTS.find(el =>
    location.pathname.includes(el.page)
  )?.subtext

  return (
    <div className="main-bar">
      <div className="page-title">
        <h4>{textToShow}</h4>
        <ol className="breadcrumb">
          <li className="breadcrumb-item active">
            <a href="/dashboard">
              {subTextToShow ? subTextToShow : textToShow}
            </a>
          </li>
        </ol>
      </div>
      <div className="section-title"></div>

      <InfoSidebar />
      <div className="absolute-div">
        <div>
          <AutomaticMode />
          <div className="icon-containerr">
            {ctx.statusFan}

            {/* <div
              className={`status-circle ${ctx.statusExaust ? 'online' : ''}`}
            ></div>
            <div className="device-title">Exaustor</div> */}
          </div>
        </div>

        {/* {show && isToggled && (
          <ModalUI
            show={show}
            handleContinue={handleContinue}
            handleClose={handleClose}
            cancel={cancel}
          />
        )} */}
      </div>
    </div>
  )
}

export default Navbar
