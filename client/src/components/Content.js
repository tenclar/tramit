import React, {Component} from 'react'
import { Route} from 'react-router-dom'

import Header from './../components/Header'


import Home from './Home'
import SetorList from './setor/SetorList'
import SetorForm from './setor/SetorForm'
import SetorEdit from './setor/SetorEdit'

import UsuarioList from './usuario/UsuarioList'
import UsuarioForm from './usuario/UsuarioForm'
import UsuarioEdit from './usuario/UsuarioEdit'

import DocumentoList from './documento/DocList'
import DocumentoForm from './documento/DocForm'
import DocumentoEdit from './documento/DocEdit'

import DoctipoList from './doctipo/DoctipoList'
import DoctipoForm from './doctipo/DoctipoForm'
import DoctipoEdit from './doctipo/DoctipoEdit'

import TramitList from './tramite/TramitList'
import TramitEntNovo from './tramite/entrada/TramitEntNovo'


class Content extends Component {
    render() {
        return (
            <div>

            <Header />
              
            
            <Route exact path='/' component={Home} />
            <Route exact path='/setores/novo' component={SetorForm} />
            <Route exact path='/setores/editar/:id' component={SetorEdit} />
            <Route exact path='/setores' component={SetorList} />  

            <Route exact path='/usuarios/editar/:id' component={UsuarioEdit} />
            <Route exact path='/usuarios/novo' component={UsuarioForm} />
            <Route exact path='/usuarios' component={UsuarioList} /> 
            
            <Route exact path='/documentos' component={DocumentoList} /> 
            <Route exact path='/documentos/novo' component={DocumentoForm} /> 
            <Route exact path='/documentos/editar/:id' component={DocumentoEdit} /> 

            <Route exact path='/doctipos' component={DoctipoList} /> 
            <Route exact path='/doctipos/novo' component={DoctipoForm} /> 
            <Route exact path='/doctipos/editar/:id' component={DoctipoEdit} />
            
            <Route exact path='/tramite/novo' component={TramitEntNovo} />
            
            <Route exact path='/tramite/analisar' component={TramitList} />
           
            </div> 
        )
    }
}

export default Content