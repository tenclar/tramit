import React from 'react'
//import logo from './logo.svg'
import './App.css'

import {BrowserRouter as Router, Switch, Route , Redirect} from 'react-router-dom'
import {isAuthenticated} from './components/auth'
import Content from './components/Content'

import Login from './components/Login'



function App() {

  const PrivateRoute = ({ component: Component, ...rest }) =>(
    <Route 
      {...rest} 
      render={ props => 
        isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect to={{pathname: '/', state: { from: props.location } }} />
        )
      } 
    />
  )
  
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Login} />  
    
        <PrivateRoute  path='/app' component={Content} />  
    </Switch>
  
    
    </Router>
  )
}

export default App
