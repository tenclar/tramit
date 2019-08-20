import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { usuarioGet,usuarioGetByNome } from './UsuarioApi'

class UsuarioList extends Component {
    constructor(props){
        super(props)
        this.state = {
            msg:'',
            arg:'',
            usuarios:[]
        }

    
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    componentDidMount(){
        usuarioGet().then(usuarios => {
            this.setState({
                usuarios:usuarios
            })
        })
    }

    onChange(e){
        e.preventDefault()  
   
        this.setState({[e.target.name] :  e.target.value})
       
    }

    onSubmit(e){
        e.preventDefault()
        this.setState({ setores:[], msg:'', isLoad: true } )
        const arg = this.state.arg  
        usuarioGetByNome(arg).then( usuarios => {
          //  console.log(setores.length)
            this.setState({
                usuarios:usuarios,
                isLoad:false                      
             }) 
             if(usuarios.length === 0){ 
                this.setState({ msg: 'nenhum dado encontrado'}) 
             }       
        })  
    }



    render() {

        
        const { usuarios , msg } = this.state
        return (
           

            <main role="main" className="mt-3 flex-shrink-0">
                <div className="container">
                    <div>
                        <h1 className="page-header ">
                                <i className="far fa-list-alt"></i> Lista de Usuários
                        </h1>
                        <hr className="bg-primary" />
                    </div>

                    <form onSubmit={this.onSubmit} className="row form mt-4 ">
                        
                        <div className=" form-group  col-md-8   mb-2">
                            <input type="text" name="arg"  onChange={this.onChange} value={this.state.arg}  className="form-control form-control-lg" id="inputargumento" placeholder="Informe o nome do Usuário" />
                        </div>
                        <button type="submit" className="btn btn-primary col-md-1 mb-2"><i className="fas fa-search"></i></button>
                    </form>
                    <div className="  alert-danger text-center rounded mb-3 " >{ msg }</div>
                        {this.state.isLoadCidade && <img src="/img/loading.gif" alt='Carregando...' />  }

                    <hr className="bg-danger" />
                    <table className="table table-striped table-hover" >
                        <thead className="thead-dark">
                            <tr >
                                <th className="mx-auto py-3" style={{width:'10%'}} ><a className="btn btn-primary" href="/usuarios/novo"><i className="fas fa-asterisk"></i></a></th>
                                <th className="mx-auto py-3" scope="col">#</th>
                                <th className="mx-auto py-3" scope="col">Nome</th>
                                <th className="mx-auto py-3" scope="col">e-mail</th>
                            </tr>
                        </thead>
                        <tbody>
                        {usuarios.map(usuario => 
                            <tr key={usuario.id} >
                                <th  ><Link className="btn btn-warning" to={'/usuarios/editar/'+usuario.id}><i className="far fa-edit"></i></Link></th>
                                <th scope="row">{usuario.id}</th>
                                <td>{usuario.nome}</td>
                                <td>{usuario.email}</td>                           
                            </tr>
                            )
                        }
                           
                        </tbody>
                      {  /* <tfoot className="thead-light ">
                             <tr>
                                <th  ><button className="btn btn-warning"></button></th>
                                <th scope="col">#</th>
                                <th scope="col">First</th>
                                <th scope="col">Last</th>
                            </tr>                        
                        </tfoot> */}
                    </table>






                </div>
            </main>
        )
    }
}

export default UsuarioList