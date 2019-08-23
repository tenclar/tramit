import React, { Component } from 'react'

import { setorGet } from '../../setor/SetorApi'
import { doctipoGet } from '../../doctipo/DoctipoApi'
import {  docGetFilter } from '../../documento/DocApi'

 let initState = {
    args: { arg: '', setorId: '', tipodocId: '' },
    msg: '',
    dialog:'',
    setorId: '',
    documento:{id:0, numero:'', nome:'', descricao:''},
    isLoad: false,
    setores: [],
    doctipos: [],
    docs: []
}

class DocLoc extends Component {
    constructor(props) {
        super(props)
        this.state = initState

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.onChangeSelect = this.onChangeSelect.bind(this)
        this.onSelect = this.onSelect.bind(this)
        this.onCancel = this.onCancel.bind(this)
    }

    componentDidMount() {
        setorGet().then(setores => {
            this.setState({
                setores: setores
            })
        })

        doctipoGet().then(doctipos => {
            this.setState({
                doctipos: doctipos
            })
        })

     
    }

    onCancel(e){
        this.setState(initState)
    }
    onChange(e) {
        e.preventDefault()
        let args = this.state.args
        args[e.target.name] = e.target.value
        this.setState({ args })
        //this.setState({[e.target.name] :  e.target.value})

    }

    onChangeSelect(e){
        
       const doc = JSON.parse(e.target.value)
       const documento = {
           id:doc.id,
           numero:doc.numero,
           nome: doc.nome,
           descricao: doc.descricao 
       }

       this.setState({documento: documento, dialog:'modal' })
       
        
       
        
      
        
    }
    onSelect(e){
        e.preventDefault()
        this.props.selectDocument(this.state.documento)
    }
   

    onSubmit(e) {
        e.preventDefault()
        this.setState({ docs: [], msg: '', isLoad: true })
        const args = this.state.args
        docGetFilter(args).then(docs => {

            this.setState({
                docs: docs,
                isLoad: false
            })
            if (docs.length === 0) {
                this.setState({ msg: 'nenhum dado encontrado' })
            }
        })
    }

    render() {

        const { setores, doctipos, docs, msg } = this.state

        return (
            <div className="modal  fade" id="documentoLocaliza" tabIndex="-1" role="dialog" aria-labelledby="modalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-scrollable modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="modalLabel">Localizar Documento</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">



                            <form noValidate onSubmit={this.onSubmit} className="row form mt-1 ">

                                <div className=" form-group  col-md-2   mb-2">
                                    <label htmlFor="setorId">Setor</label>
                                    <select id="setorId" required
                                        className="custom-select  "
                                        name="setorId"
                                        value={this.state.args.setorId}
                                        onChange={this.onChange}
                                    >
                                        <option value='' >Todos</option>
                                        {setores.map(setor =>

                                            <option key={setor.id} value={setor.id}>{setor.nome}</option>
                                        )}
                                    </select>
                                </div>   <div className=" form-group  col-md-2   mb-2">
                                    <label htmlFor="tipodocId">Tipo Doc.</label>
                                    <select id="tipodocId" required
                                        className="custom-select  "
                                        name="tipodocId"
                                        value={this.state.args.tipodocId}
                                        onChange={this.onChange}
                                    >
                                        <option value='' >Todos</option>
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
                                        className="form-control "
                                        placeholder="Informe o nome documento" />
                                </div>

                                <button type="submit" id="btarg" className="btn btn-primary col-md-1 mt-4 mb-3"><i className="fas fa-search"></i></button>

                            </form>
                            {JSON.stringify(this.state.args)}
                            <div className="  alert-danger text-center rounded mb-3 " >{msg}</div>
                            {this.state.isLoad && <img src="/img/loading.gif" alt='Carregando...' />}
                            <hr className="bg-danger" />
                            <table className="table table-striped table-hover" >
                                <thead className="thead-dark">
                                    <tr>
                                        <th className="mx-auto text-center"  >#</th>
                                        <th scope="col">Número</th>
                                        <th scope="col">nome</th>
                                        
                                    </tr>  

                                    
                                </thead>
                                <tbody className="mb-2">
                                    {docs.map(doc =>
                                        <tr key={doc.id} >
                                            <th>
                                                <input id="documentoId"   
                                                type="radio" 
                                                className="form-check mx-auto"
                                                name="documentoId" 
                                               
                                                onChange={this.onChangeSelect}
                                                
                                                value={JSON.stringify(doc)}   />
                                            </th>
                                            <th scope="row">{doc.numero}</th>
                                            <th>{doc.nome}</th>
                                            
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
                
                        
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={this.onCancel} data-dismiss="modal">Fechar</button>
                            <button type="button" className="btn btn-primary" onClick={this.onSelect}  data-dismiss={this.state.dialog} >Selecionar</button>
                        </div>
                    </div>
                </div>
            </div>



        )
    }
}

export default DocLoc