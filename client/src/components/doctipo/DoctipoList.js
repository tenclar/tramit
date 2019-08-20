import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { doctipoGet, doctipoGetByNome } from './DoctipoApi'


class DoctipoList extends Component {
    constructor(props){
        super(props)
        this.state = {
            arg:'',
            msg:'',
            isLoad:false,
            doctipos:[]
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    componentDidMount(){
        doctipoGet().then(doctipos => {
            this.setState({
                doctipos:doctipos
            })
        })
    }

    onChange(e){
        e.preventDefault()  
   
        this.setState({[e.target.name] :  e.target.value})
       
    }

    onSubmit(e){
        e.preventDefault()
        this.setState({ soctipos:[], msg:'', isLoad: true } )
        const arg = this.state.arg  
        doctipoGetByNome(arg).then( doctipos => {
          
            this.setState({
                doctipos:doctipos,
                isLoad:false                      
             }) 
             if(doctipos.length === 0){ 
                this.setState({ msg: 'nenhum dado encontrado'}) 
             }       
        })  
    }

    render() {

        const { doctipos, msg } = this.state

        return (
           

            <main role="main" className="mt-3 flex-shrink-0">
                <div className="container">
                    <div>
                        <h1 className="page-header ">
                                <i className="far fa-list-alt"></i> Lista de Tipos de Documentos
                        </h1>
                        <hr className="bg-primary" />
                    </div>

                    <form onSubmit={this.onSubmit} className="row form mt-4 ">
                        
                        <div className=" form-group  col-md-8   mb-2">
                            <input type="text" name="arg" onChange={this.onChange} value={this.state.arg} className="form-control form-control-lg" id="inputargumento" placeholder="Informe o nome do tipo de documento" />
                        </div>
                        <button type="submit" className="btn btn-primary col-md-1 mb-2"><i className="fas fa-search"></i></button>
                    </form>
                        <div className="  alert-danger text-center rounded mb-3 " >{ msg }</div>
                        {this.state.isLoad && <img src="/img/loading.gif" alt='Carregando...' />  }
                    <hr className="bg-danger" />
                    <table className="table table-striped table-hover" >
                        <thead className="thead-dark">
                            <tr>
                                <th className="mx-auto" style={{width:'10%'}} ><a className="btn btn-primary" href="/doctipos/novo"><i className="fas fa-asterisk"></i></a></th>
                                <th scope="col">#</th>
                                <th scope="col">Nome</th>
                                <th scope="col">Descrição</th>
                            </tr>
                        </thead>
                        <tbody className="mb-2">
                            {doctipos.map(doctipo => 
                                    <tr key={doctipo.id} >
                                        <th><Link className="btn btn-warning" to={'/doctipos/editar/'+doctipo.id}><i className="far fa-edit"></i></Link></th>
                                        <th scope="row">{doctipo.id}</th>
                                        <td>{doctipo.nome}</td>
                                        <td>{doctipo.descricao}</td>                                
                                    </tr>
                                    
                                )
                            }
                            
                           
                        </tbody>
                       
                     {  /*  <tfoot className="thead-light ">
                       
                        <tr>
                            <th  ></th>
                            <th scope="col">#</th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                        </tr> 
                        
                        </tfoot>
                        */}
                    </table>
                    <hr className="bg-black" />





                </div>
               
            </main>
        )
    }
}

export default DoctipoList