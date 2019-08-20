import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { setorGet, setorGetByNome } from './SetorApi'


class SetorList extends Component {
    constructor(props){
        super(props)
        this.state = {
            arg:'',
            msg:'',
            isLoad:false,
            setores:[]
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    componentDidMount(){
        setorGet().then(setores => {
            this.setState({
                setores:setores
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
        setorGetByNome(arg).then( setores => {
          //  console.log(setores.length)
            this.setState({
                setores:setores,
                isLoad:false                      
             }) 
             if(setores.length === 0){ 
                this.setState({ msg: 'nenhum dado encontrado'}) 
             }       
        })  
    }

    render() {

        const { setores, msg } = this.state

        return (
           

            <main role="main" className="mt-3 flex-shrink-0">
                <div className="container">
                    <div>
                        <h1 className="page-header ">
                                <i className="far fa-list-alt"></i> Lista de Setores
                        </h1>
                        <hr className="bg-primary" />
                    </div>

                    <form onSubmit={this.onSubmit} className="row form mt-4 ">
                        
                        <div className=" form-group  col-md-8   mb-2">
                            <input type="text" name="arg" onChange={this.onChange} value={this.state.arg} className="form-control form-control-lg" id="inputargumento" placeholder="Informe o nome do setor" />
                        </div>
                        <button type="submit" className="btn btn-primary col-md-1 mb-2"><i className="fas fa-search"></i></button>
                    </form>
                        <div className="  alert-danger text-center rounded mb-3 " >{ msg }</div>
                        {this.state.isLoadCidade && <img src="/img/loading.gif" alt='Carregando...' />  }
                    <hr className="bg-danger" />
                    <table className="table table-striped table-hover" >
                        <thead className="thead-dark">
                            <tr>
                                <th className="mx-auto" style={{width:'10%'}} ><a className="btn btn-primary" href="/setores/novo"><i className="fas fa-asterisk"></i></a></th>
                                <th scope="col">#</th>
                                <th scope="col">Nome</th>
                                <th scope="col">Descrição</th>
                            </tr>
                        </thead>
                        <tbody className="mb-2">
                            {setores.map(setor => 
                                    <tr key={setor.id} >
                                        <th><Link className="btn btn-warning" to={'/setores/editar/'+setor.id}><i className="far fa-edit"></i></Link></th>
                                        <th scope="row">{setor.id}</th>
                                        <td>{setor.nome}</td>
                                        <td>{setor.descricao}</td>                                
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

export default SetorList