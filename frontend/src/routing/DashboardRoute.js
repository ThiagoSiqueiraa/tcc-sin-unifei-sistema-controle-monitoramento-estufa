import { Redirect, Route } from 'react-router-dom'

const DashboardRoute = ({ component: Dashboard, ...rest }) => {
  return (
    <Route
      {...rest}
      render={routeProps =>
        localStorage.getItem('authToken') ? (
          <Dashboard {...routeProps} />
        ) : (
          <Dashboard {...routeProps} />
        )
      }
    />
  )
}

export default DashboardRoute
