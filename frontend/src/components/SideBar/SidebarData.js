import React from 'react'
import * as AiIcons from 'react-icons/ai'
import * as IoIcons from 'react-icons/io'
import * as BsIcons from 'react-icons/bs'

import * as MdIcons from 'react-icons/md'

export const SidebarData = [
  {
    title: 'Dashboard',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cname: 'nav-text'
  },
  {
    title: 'Relatórios',
    path: '/relatorios',
    icon: <IoIcons.IoIosPaper />,
    cname: 'nav-text'
  },
  {
    title: 'Déficit de pressão de vapor',
    path: '/vpd',
    icon: <IoIcons.IoIosPaper />,
    cname: 'nav-text'
  },

  {
    title: 'Dispositivos',
    path: '/dispositivos',
    icon: <MdIcons.MdLightbulb />,
    cname: 'nav-text'
  },
  // {
  //   title: 'Plantas',
  //   path: '/plantas',
  //   icon: <RiIcons.RiPlantFill />,
  //   cname: 'nav-text'
  // },
  // {
  //   title: 'Genéticas',
  //   path: '/geneticas',
  //   icon: <GiIcons.GiDna2 />,
  //   cname: 'nav-text'
  // },
  {
    title: 'Motor de regras',
    path: '/configuracoes',
    icon: <BsIcons.BsGearFill />,
    cname: 'nav-text'
  },
  {
    title: 'Histórico',
    path: '/historico',
    icon: <BsIcons.BsGearFill />,
    cname: 'nav-text'
  }
]
