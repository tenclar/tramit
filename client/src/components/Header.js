import React, {Component} from 'react'
import { withRouter, Link } from 'react-router-dom'

class Header extends Component {
    render() {
        return (
                        
            <header>
               
            <nav className="navbar navbar-expand-md navbar-dark  bg-dark">
                <Link className="navbar-brand" to="/"><i className="fab fa-accusoft"></i> Tramit .::. <span className="font-weight-bold" >DOC</span></Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item ">
                        <Link className="nav-link" to="/">Painel <span className="sr-only">(current)</span></Link>
                        </li>
                       
                        
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="@" id="dropdown05" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Trâmite</a>
                            <div className="dropdown-menu" aria-labelledby="dropdown05">
                                <a className="dropdown-item" href="documentos"><i className="fas fa-file-invoice"></i> Documento</a>
                                <a className="dropdown-item" href="/tramite/novo"><i className="fas fa-angle-double-left"></i>  <i className="fas fa-angle-double-right"></i> Entrada - Saida</a>
                                <a className="dropdown-item" href="/tramite/analisar"><i className="fas fa-file-contract" ></i> Analisar</a>
                                
                            </div>
                        </li>
                        {/* 
                             <li className="nav-item">
                                <Link className="nav-link" to="/tramitacao">Tramitação</Link>
                            </li>
                            
                            <li className="nav-item">
                                <a className="nav-link disabled" href="##" tabIndex="-1" aria-disabled="true">Disabled</a>
                             </li> 
                        */}
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="@" id="dropdown05" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Cadastros</a>
                            <div className="dropdown-menu" aria-labelledby="dropdown05">
                            <Link className="dropdown-item" to="/doctipos"><i className="fas fa-paste"></i> Tipo Doc</Link>
                            <a className="dropdown-item" href="/usuarios"><i className="fas fa-users"></i> Usuários</a>
                            <Link className="dropdown-item" to="/setores"><i className="fas fa-landmark"></i> Setores</Link>
                            
                            </div>
                        </li>
                    </ul>
                   { /* <form className="form-inline mt-2 mt-md-0">
                        <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </form> */}
                    <ul className="navbar-nav mt-2 mt-md-0">
                        <li className="nav-item dropdown">
                            <button type="button" className="dropdown-toggle btn btn-outline-success "   id="dropdown05" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="fas fa-user-circle"></i> </button>
                            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdown05">
                            <Link className="dropdown-item" to="/perfil"><i className="fas fa-id-card"></i> Perfil</Link>
                            <div className="dropdown-divider"></div>
                             <Link className="dropdown-item" to="/login"><i className="fas fa-door-open"></i> Sair</Link>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
            <div className="clearfix"></div>
            </header>
            
            
        )
    }
}
export default withRouter(Header)