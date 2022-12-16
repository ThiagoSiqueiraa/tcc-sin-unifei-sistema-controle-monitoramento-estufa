import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import * as RiIcons from 'react-icons/ri'
import { SidebarData } from './SidebarData'
import './Sidebar.css'
import { AiOutlineLeft } from 'react-icons/ai'
import { useLocation } from 'react-router-dom'
import { rgb } from 'd3'
import Logo from '../../assets/img/logo.png'
import LogoMinified from '../../assets/img/logo_minified.png'
import * as ImIcons from 'react-icons/im'
import { Typography } from '@mui/material'
function Sidebar(props) {
  const [sidebarOpen, setSideBarOpen] = useState(true)
  const { pathname } = useLocation()

  return (
    <React.Fragment>
      <nav className={sidebarOpen ? 'nav-menu opened' : 'nav-menu'}>
        <div className={sidebarOpen ? 'topbar-left opened' : 'topbar-left'}>

          <button
            className={
              sidebarOpen ? 'nav-menu-collapse opened' : 'nav-menu-collapse'
            }
            onClick={() => {
              setSideBarOpen(p => {
                return !p
              })
              props.onClose(sidebarOpen)
            }
            }
          >
            <AiOutlineLeft />
          </button>
        </div>

        <ul className="nav-menu-items">
          {SidebarData.map((item, index) => {
            return (
              <div
                key={index}
                className="nav-menu-link-container"
                style={
                  pathname == item.path
                    ? {
                      background: rgb(28, 38, 56),
                      border: '1px solid rgb(39,53,82)',
                      color: 'rgb(211,218,235)',
                      opacity: 1,
                      borderRadius: '10px'
                    }
                    : {}
                }
              >
                <Link
                  to={item.path}
                  className={
                    pathname == item.path
                      ? 'nav-menu-link active'
                      : 'nav-menu-link'
                  }
                  style={!sidebarOpen ? { width: `fit-content` } : {}}
                >
                  <div className="nav-menu-icon">{item.icon}</div>
                  {sidebarOpen && (
                    <>
                      <span>{item.title}</span>
                      <RiIcons.RiArrowDropRightLine className="submenu-arrow" />
                    </>
                  )}
                </Link>
              </div>
            )
          })}
          <div
            key={'exit'}
            className="nav-menu-link-container"
          >
            <Link
              to="/logout"
              className='nav-menu-link'
              style={!sidebarOpen ? { width: `fit-content` } : {}}
            >
              <div className="nav-menu-icon"><ImIcons.ImExit/></div>
              {sidebarOpen && (
                <>
                  <span>Sair</span>
                  <RiIcons.RiArrowDropRightLine className="submenu-arrow" />
                </>
              )}
            </Link>
          </div>
        </ul>
      </nav>
    </React.Fragment>
  )
}

export default Sidebar
