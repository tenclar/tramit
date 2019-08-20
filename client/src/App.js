import React from 'react'
//import logo from './logo.svg'
import './App.css'

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Content from './components/Content'

import Login from './components/Login'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/login' component={Login} />  
    
        <Route exact path='/*' component={Content} />  
    </Switch>
   { /* <Route exact path='/setores' component={Content} /> 
    <Route exact path='/setores/novo' component={Content} /> 
    <Route exact path='/setores/editar/:id' component={Content} /> 

    <Route exact path='/usuarios' component={Content} /> 
    <Route exact path='/usuarios/novo' component={Content} /> 
    <Route exact path='/usuarios/editar/:id' component={Content} /> 
    
    <Route exact path='/documentos' component={Content} /> 
    <Route exact path='/documentos/novo' component={Content} />
    <Route exact path='/documentos/editar/:id' component={Content} />

    <Route exact path='/doctipos' component={Content} /> 
    <Route exact path='/doctipos/novo' component={Content} />
    <Route exact path='/doctipos/editar/:id' component={Content} /> */}

    
    </Router>
  )
}

export default App
