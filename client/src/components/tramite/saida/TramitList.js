import React, {Component} from 'react'
import { withRouter, Link } from 'react-router-dom'
import { setorGet } from '../setor/SetorApi'
import { doctipoGet } from '../doctipo/DoctipoApi'
import { docGet, docGetFilter } from './TramitApi'


class SetorList extends Component {
    constructor(props){
        super(props)
        this.state = {
            args:{arg:'', setorId:0, tipodocId:0},
            msg:'',
            setorId:'',
            isLoad:false,
            setores:[],
            doctipos:[],
            docs:[]
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

        docGet().then(docs => {
            this.setState({
                docs:docs
            })
        })
    }

    onChange(e){
        e.preventDefault()  
        let args = this.state.fields
        args[e.target.name] = e.target.value
        this.setState({args})
        //this.setState({[e.target.name] :  e.target.value})
       
    }

    onSubmit(e){
        e.preventDefault()
        this.setState({ setores:[], docs:[], msg:'', isLoad: true } )
        const args = this.state.args  
        docGetFilter(args).then( docs => {
          //  console.log(setores.length)
            this.setState({
                docs:docs,
                isLoad:false                      
             }) 
             if(docs.length === 0){ 
                this.setState({ msg: 'nenhum dado encontrado'}) 
             }       
        })  
    }

    render() {

        const { setores, doctipos, docs, msg } = this.state

        return (
           

            <main role="main" className="mt-3 flex-shrink-0">
                <div className="container">
                    <div>
                        <h1 className="page-header ">
                                <i className="far fa-list-alt"></i> Tramitação Entrada / Saída
                        </h1>
                        <hr className="bg-primary" />
                    </div>

                    <form onSubmit={this.onSubmit} className="row form mt-4 ">
                        
                        <div className=" form-group  col-md-2   mb-2">
                       <label htmlFor="setorId">Setor</label>
                        <select id="setorId"  required
                        className="custom-select  custom-select-lg" 
                        name="setorId"
                        value={this.state.args.setorId}
                        onChange={this.onChange}
                        >
                        <option value={0} >Todos</option>
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
                        <option value={0} >Todos</option>
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
                    <table className="table table-striped table-hover" >
                        <thead className="thead-dark">
                            <tr>
                                <th className="mx-auto" style={{width:'10%'}} ><a className="btn btn-primary" href="/documentos/novo"><i className="fas fa-asterisk"></i></a></th>
                                <th scope="col">#</th>
                                <th scope="col">Nome</th>
                                <th scope="col">Descrição</th>
                            </tr>
                        </thead>
                        <tbody className="mb-2">
                            {docs.map(doc => 
                                    <tr key={doc.id} >
                                        <th><Link className="btn btn-warning" to={"/documentos/editar/"+doc.id} ><i className="far fa-edit"></i></Link></th>
                                        <th scope="row">{doc.id}</th>
                                        <td>{doc.nome}</td>
                                        <td>{doc.descricao}</td>                                
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

export default withRouter(SetorList)