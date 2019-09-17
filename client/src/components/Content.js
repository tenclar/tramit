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
import TramitNovo from './tramite/TramitNovo'
import TramitEdit from './tramite/TramitEdit'


class Content extends Component {
    

    render() {
        return (
            <div>

            <Header />
              
            
            <Route exact path={`${this.props.match.path}/`} component={Home} />
            <Route exact path={`${this.props.match.path}/setores/novo`} component={SetorForm} />
            <Route exact path={`${this.props.match.path}/setores/editar/:id`} component={SetorEdit} />
            <Route exact path={`${this.props.match.path}/setores`} component={SetorList} />  

            <Route exact path={`${this.props.match.path}/usuarios/editar/:id`} component={UsuarioEdit} />
            <Route exact path={`${this.props.match.path}/usuarios/novo`} component={UsuarioForm} />
            <Route exact path={`${this.props.match.path}/usuarios`} component={UsuarioList} /> 
            
            <Route  path={`${this.props.match.path}/documentos`} component={DocumentoList} /> 
            <Route exact path={`${this.props.match.path}/documentos/novo`} component={DocumentoForm} /> 
            <Route exact path={`${this.props.match.path}/documentos/editar/:id`} component={DocumentoEdit} /> 

            <Route exact path={`${this.props.match.path}/doctipos`} component={DoctipoList} /> 
            <Route exact path={`${this.props.match.path}/doctipos/novo`} component={DoctipoForm} /> 
            <Route exact path={`${this.props.match.path}/doctipos/editar/:id`} component={DoctipoEdit} />
            
            <Route exact path={`${this.props.match.path}/tramite/novo`} component={TramitNovo} />
            <Route exact path={`${this.props.match.path}/tramite/editar/:id`} component={TramitEdit} />
            
            <Route exact path={`${this.props.match.path}/tramite/analisar`} component={TramitList} />
           
            </div> 
        )
    }
}

export default Content