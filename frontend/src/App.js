import React from 'react'
import {
  Routes,
  Route,
  Outlet
} from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Reports from './pages/Reports'
import './index.css'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Devices from './pages/Devices'
import EditDevices from './pages/EditDevices'
import DeleteDevice from './pages/DeleteDevice'
import Login from './pages/Login'
import RequireAuth from './source/Auth/RequireAuth'
import { Helmet } from 'react-helmet'
import Signup from './pages/Signup'
import Logout from './pages/Logout'
import Configurations from './pages/EngineRules/Configurations'
import VPD from './pages/VPD'
import SeeRule from './pages/EngineRules/rules/SeeRule'
import Logs from './pages/Logs'

function App() {




  return (
    <React.Fragment>
      <Helmet>
        <title>Minha Estufa</title>
      </Helmet>

      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="logout" element={<Logout />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<RequireAuth><Dashboard /></RequireAuth>} />
        <Route path="relatorios" element={<RequireAuth><Reports /></RequireAuth>} />
        <Route path="vpd" element={<RequireAuth><VPD /></RequireAuth>} />
        <Route path="regras" element={<RequireAuth><SeeRule /></RequireAuth>} />

        <Route path="configuracoes" element={<RequireAuth><SeeRule /></RequireAuth>} />
        <Route path="historico" element={<RequireAuth><Logs /></RequireAuth>} />
        <Route path="dispositivos" element={<RequireAuth><Outlet /></RequireAuth>}>
          <Route index element={<Devices />} />
          <Route path="editar/:id" element={<EditDevices />} />
          <Route path="deletar/:id" element={<DeleteDevice />} />
        </Route>
      </Routes>

    </React.Fragment>
  )
}

export default App
