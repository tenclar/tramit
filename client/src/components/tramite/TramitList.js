import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { setorGet } from '../setor/SetorApi'
import { doctipoGet } from '../doctipo/DoctipoApi'
import { tramitGet, tramitGetFilter } from './TramitApi'


class TramitEntList extends Component {
    constructor(props){
        super(props)
        this.state = {
            args:{ arg:'', setorId:'%', tipodocId:'%' },
            msg:'',
            setorId:'',
            isLoad:false,
            setores:[],
            doctipos:[],
            tramitacoes:[]
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

        doctipoGet().then(doctipos => {
            this.setState({
                doctipos:doctipos
            })
        })

        tramitGet().then( tramitacoes => {
            this.setState({
                tramitacoes:tramitacoes
            })
        })
    }

    onChange(e){
        e.preventDefault()  
        let args = this.state.args
        args[e.target.name] = e.target.value
        this.setState({args})
        //this.setState({[e.target.name] :  e.target.value})
       
    }

    onSubmit(e){
        e.preventDefault()
        this.setState({  tramitacoes:[], msg:'', isLoad: true } )
    
        const args = this.state.args   

        tramitGetFilter(args).then(tramitacoes => {
          //  console.log(setores.length)
            this.setState({
                tramitacoes:tramitacoes,
                isLoad:false                      
             }) 
             if(tramitacoes.length === 0){ 
                this.setState({ msg: 'nenhum dado encontrado'}) 
             }       
        })  
    }


    render() {

        const { setores, doctipos, tramitacoes , msg } = this.state

        return (
           

            <main role="main" className="mt-3 flex-shrink-0">
                <div className="container">
                    <div>
                        <h1 className="page-header ">
                                <i className="fas fa-file-contract"></i> Lista Tramitação e Análise
                        </h1>
                        <hr className="bg-primary" />
                    </div>

                    <form noValidate onSubmit={this.onSubmit} className="row form mt-4 ">
                        
                        <div className=" form-group  col-md-2   mb-2">
                       <label htmlFor="setorId">Setor</label>
                        <select id="setorId"  required
                        className="custom-select  custom-select-lg" 
                        name="setorId"
                        value={this.state.args.setorId}
                        onChange={this.onChange}
                        >
                        <option value="%" >Todos</option>
                        {setores.map(setor => 
                           
                            <option key={setor.id} value={setor.id}>{setor.nome}</option>
                        )}
                        </select>     
                        </div>   <div className=" form-group  col-md-2   mb-2">
                        <label htmlFor="tipodocId">Tipo Doc.</label>
                        <select id="tipodocId"  required
                        className="custom-select  custom-select-lg" 
                        name="tipodocId"
                        value={this.state.args.tipodocId}
                        onChange={this.onChange}
                        >
                        <option value="%" >Todos</option>
                        {doctipos.map(tipodoc => 
                           
                            <option key={tipodoc.id} value={tipodoc.id}>{tipodoc.nome}</option>
                        )}
                        </select>     
                        </div>                   
                        <div className=" form-group  col-md-6   mb-2">
                        <label htmlFor="arg">Argumento </label>
                            <input 
                            type="text" 
                            id="arg"
                            name="arg" 
                            onChange={this.onChange}
                            value={this.state.args.arg} 
                            className="form-control form-control-lg" 
                             placeholder="Informe o nome documento" />
                        </div>
                       
                        <button type="submit" id="btarg" className="btn btn-primary col-md-1 mt-4 mb-2"><i className="fas fa-search"></i></button>
                       
                        </form>
                        {JSON.stringify(this.state.args)}
                        <div className="  alert-danger text-center rounded mb-3 " >{ msg }</div>
                        {this.state.isLoad && <img src="/img/loading.gif" alt='Carregando...' />  }
                    <hr className="bg-danger" />
                    <table className="table table-striped table-hover" >
                        <thead className="thead-dark">
                            <tr>
                                <th className="mx-auto" style={{width:'10%'}} ><a className="btn btn-primary" href="/tramite/entrada/novo"><i className="fas fa-asterisk"></i></a></th>
                                <th scope="col">#</th>
                                <th scope="col">Nome</th>
                                <th scope="col">Descrição</th>
                            </tr>
                        </thead>
                        <tbody className="mb-2">
                            {tramitacoes.map(tramit => 
                                    <tr key={tramit.id} >
                                        <th><Link className="btn btn-warning" to={"/tramite/entrada/editar/"+tramit.id} ><i className="far fa-edit"></i></Link></th>
                                        <th scope="row">{tramit.id}</th>
                                        <td>{tramit.acao}</td>
                                        <td>{tramit.movimento}</td>                                
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

export default TramitEntList