import React, {Component} from 'react'
import Moment from 'react-moment';
import { Link } from 'react-router-dom'
import { setorGet } from '../setor/SetorApi'
import { doctipoGet } from '../doctipo/DoctipoApi'
import { tramitGetFilter } from './TramitApi'



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

      /*   tramitGet().then( tramitacoes => {
            this.setState({
                tramitacoes:tramitacoes
            })
        }) */
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
                      
                        <div className="  alert-danger text-center rounded mb-3 " >{ msg }</div>
                        {this.state.isLoad && <img src="/img/loading.gif" alt='Carregando...' />  }
                    <hr className="bg-danger" />
                    <table className="table table-sm table-striped " >
                        <thead className="thead-dark">
                            <tr>
                                <th className="mx-auto text-center" 
                                    style={{width:'10%'}} >
                                    <a className="btn btn-sm btn-primary" 
                                        href="/tramite/novo" >
                                        <i className="fas fa-asterisk"></i>
                                    </a>
                                </th>
                                <th scope="col">#</th>
                                <th scope="col">Número</th>
                                <th scope="col">Documento</th>
                            </tr>
                        </thead>
                        {tramitacoes.map(tramit =>  
                        <tbody   key={tramit.id} >
                            
                               
                                    <tr >
                                        <th className="mx-auto text-center" style={{width:'10%'}} ><button type="button" 
                                            className="btn btn-sm  btn-warning"  
                                            data-toggle="collapse" data-target="#multiCollapse" aria-expanded="false" aria-controls="multiCollapse"
                                            ><i className="far fa-caret-square-down"></i></button></th>
                                        <th scope="row">{tramit.id}</th>
                                        <td>{tramit.numero}</td>
                                        <td>{tramit.nome}</td>                                
                                    </tr>
                                    <tr className="collapse multi-collapse" id="multiCollapse">
                                        <td colSpan="4"> 
                                            <table className="table table-sm table-striped table-hover" >
                                            <thead className="thead-light" >
                                                <tr>
                                                    <th scope="col" className="mx-auto text-center" >#</th>
                                                    <th scope="col">data</th>
                                                    <th scope="col">ação</th>
                                                    <th scope="col">movimento</th>
                                                </tr>
                                            </thead>
                                            <tbody className="mb-2">
                                            {tramit.tramitacoes.map(tmt => 
                                                <tr key={tmt.id}>
                                                    <td className="mx-auto text-center" ><Link className="btn btn-sm btn-info" to={"/tramite/entrada/view/"+tmt.id} ><i className="far fa-eye"></i></Link></td>
                                                    
                                                    <td><Moment format="DD/MM/YYYY">{tmt.datacad}</Moment></td>
                                                    <td>{tmt.acao}</td>
                                                    <td>{tmt.movimento}</td>                                
                                                </tr>
                                            )}
                                            </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                    
                            
                            
                           
                        </tbody>
                        )}

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