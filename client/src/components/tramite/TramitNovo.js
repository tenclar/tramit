import React, {Component} from 'react'

import { tramitNovo } from './TramitApi'
import { setorGet } from '../setor/SetorApi'
import DocLoc from './DocLoc'




const initState = {
    documento:{ id:0, numero:'', nome:'',descricao:''},
    fields:{datacad:'',acao:'', movimento:'', setorId:0, despacho:'', observacao:''},
    setores:[],
    errors:{},
    msg:''
}

class TramitForm extends Component {

    constructor(props){  
        super(props)
        this.state = initState

        this.onChangeDoc = this.onChangeDoc.bind(this)
        this.onChange = this.onChange.bind(this)
        this.onCancel = this.onCancel.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.selectDocument = this.selectDocument.bind(this)
    }


    
    
    validateForm(){
        let fields = this.state.fields
        let documento = this.state.documento
        let errors = {}

        let formIsValid = true

        if (!fields["setorId"]) {
            formIsValid = false            
            errors["setorId"] = "Selecione Um setor "
            console.log('Setor '+formIsValid)
          }
        
      
        if (!documento["nome"]) {
            formIsValid = false            
            errors["documentoNome"] = "Por Favor, Selecione um Documento . "
            console.log('documento '+formIsValid)
        }
        if (!fields["datacad"]) {
            formIsValid = false            
            errors["datacad"] = "Por Favor, Informe a data. "
            console.log('data '+formIsValid)
        }
        if (!fields["acao"]) {
          formIsValid = false            
          errors["acao"] = "Por Favor,  Defina uma Ação "
          console.log('acao '+formIsValid)
        }

        if (!fields["movimento"]) {
            formIsValid = false            
            errors["movimento"] = "Por Favor,  Defina Origem ou Destino "
            console.log('movimento '+formIsValid)
          }

          
        if (!fields["despacho"]) {
            formIsValid = false            
            errors["despacho"] = "Por Favor,  Escreva o despacho  "
            console.log('despacho '+formIsValid)
          }
        

       
      

        this.setState({ errors: errors })
        return formIsValid

    }

    componentDidMount(){
        setorGet().then(setores => {
            this.setState({
                setores:setores
            
            })
        })

      
    }

    selectDocument(documento){
        let fields = this.state.fields
        fields.documentoId = documento.id
        this.setState({ documento:documento,fields  })
        
    }
    onChangeDoc(e){
        e.preventDefault()
        let documento = this.state.documento
        documento[e.target.name] = e.target.value
        this.setState({documento})
       
    }
    onChange(e){
        e.preventDefault()
        let fields = this.state.fields
        fields[e.target.name] = e.target.value
        this.setState({fields})
       
    }
    onCancel(e){
        e.preventDefault()
        this.props.history.push('/tramite/analisar')
    }
    onSubmit(e) {
        e.preventDefault()
        //let fields = {numero:'', nome:'',descricao:''}          
       
        if(this.validateForm()) {
             
           
            tramitNovo(this.state.fields).then(res => {
                
                if(res.error){
                    this.setState({msg:res.error})
                }else{                  
                    this.setState(initState)
                    this.props.history.push('/tramite/analisar')
                }              
                
                
            })
        }
        
    }
   

    render() {

        const {  msg, errors, setores} = this.state
        return (
           <div>

            <main role="main" className="mt-3 flex-shrink-0">
                <div className="container">

                    <h1 className="page-header ">
                        <i className="far fa-list-alt"></i> Formulário de Cadastro de Tramitação
                        </h1>
                    <hr className="bg-primary" />


                    <div className="  alert-danger text-center rounded mb-3 " >{ msg }</div>
                    <div className="card">
                        <div className="card-header font-weight-bold ">
                            Dados de Entrada de Documento
                       </div>
                        <div className="card-body">
                            <form noValidate onSubmit={this.onSubmit} >

                                <div className="form-row">

                                    <div className={errors.datacad !== undefined ? "form-group col-md-3 was-validated " : "form-group col-md-3"}>
                                        <label htmlFor="datacad">Data</label>
                                        <input type="date" required
                                            autoComplete="off"
                                            className="form-control  mb-3"
                                            name="datacad"
                                            id="datacad"
                                       
                                            value={this.state.fields.datacad}
                                            onChange={this.onChange}
                                        />
                                        <div className=" help-block invalid-feedback">{errors.datacad}</div>
                                    </div>
                                    <div className={errors.acao !== undefined ? "form-group col-md-3 was-validated  has-error" : "form-group col-md-3"}>
                                        <label htmlFor="acao">Ação</label>
                                        <select id="acao" required
                                            className="custom-select  mb-3"
                                            name="acao"
                                            value={this.state.fields.acao}
                                            onChange={this.onChange}
                                        >
                                            <option value="" >selecione</option>
                                            <option value='ENTRADA'>Entrada</option>
                                            <option value='SAIDA'>Saida</option>

                                        </select>
                                        <div className="help-block invalid-feedback">{errors.setorId}</div>
                                    </div>
                                    <div className={errors.movimento !== undefined ? "form-group col-md-3 was-validated  has-error" : "form-group col-md-3"}>
                                        <label htmlFor="movimento">Origem / Destino</label>
                                        <select id="movimento" required
                                            className="custom-select  mb-3"
                                            name="movimento"
                                            value={this.state.fields.movimento}
                                            onChange={this.onChange}
                                        >
                                            <option value="" >selecione</option>
                                            <option value='ORIGEM'>Origem</option>
                                            <option value='DESTINO'>Destino</option>

                                        </select>
                                        <div className="help-block invalid-feedback">{errors.movimento}</div>
                                    </div>
                                    <div className={errors.setorId !== undefined ? "form-group col-md-3 was-validated  has-error" : "form-group col-md-3"}>
                                        <label htmlFor="setorId">Setor</label>
                                        <select id="setorId" required
                                            className="custom-select  mb-3"
                                            name="setorId"
                                            value={this.state.fields.setorId}
                                            onChange={this.onChange}
                                        >
                                            <option value="" >selecione</option>
                                            {setores.map(setor =>

                                                <option key={setor.id} value={setor.id}>{setor.nome}</option>
                                            )}
                                        </select>
                                        <div className="help-block invalid-feedback">{errors.setorId}</div>
                                    </div>
                                </div>
                                 <div className="form-row">
                                 <div className="form-group col-md-2">
                                    <label htmlFor="documentoNumero">Número</label>
                                    <input type="text" required
                                        autoComplete="off" readOnly={true}
                                        className="form-control"
                                        name="documentoNumero"
                                        id="documentoNumero"
                                        
                                        value={this.state.documento.numero}
                                        
                                    />
                                </div>
                                <div className={errors.documentoNome !== undefined ? "form-group col-md-8 was-validated " : "form-group  col-md-8"}>
                                    <label htmlFor="nome">Documento</label>
                                    <input type="text" 
                                        autoComplete="off" 
                                        readOnly={true}
                                        className={errors.documentoNome !== undefined ? "form-control is-invalid": "form-control"}
                                        name="nome"
                                        id="nome"
                                        onChange={this.onChangeDoc}
                                        value={this.state.documento.nome}
                                        
                                    />
                                    
                                    <div className="is-invalid invalid-feedback">{errors.documentoNome}</div>
                                </div>
                                

                                <div className="col-md-2" >
                                 <div className="mb-2"></div>
                                    <button
                                     data-backdrop="static"
                                     data-toggle="modal"
                                     data-target="#documentoLocaliza"        
                                     type="button"
                                     id="btlocdocumentoNomealizar"
                                      title="Localizar Documento" 
                                     className="btn btn-primary  mt-4  "><i className="fas fa-search"></i> Localizar</button>
                                </div>
                                </div>
                               
                                <div className={errors.despacho !== undefined ? "form-group was-validated" : "form-group"}>
                                    <label htmlFor="despacho">Despacho</label>
                                    <textarea type="text" required
                                        autoComplete="off"
                                        className="form-control form-control-lg"
                                        name="despacho"
                                        id="despacho"
                                        placeholder="Texto para despacho"
                                        value={this.state.fields.despacho}
                                        onChange={this.onChange}
                                    ></textarea>
                                    <div className="invalid-feedback">{errors.despacho}</div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="observacao">Observação</label>
                                    <textarea
                                        autoComplete="off"
                                        className="form-control form-control-lg"
                                        name="observacao"
                                        id="observacao"

                                        value={this.state.fields.observacao}
                                        onChange={this.onChange}
                                    ></textarea>

                                </div>


                          

                                <hr className="bg-default" />
                                <button type="submit" className="btn btn-primary mr-1"  >Salvar</button>
                                <a className="btn btn-danger" href="/tramite/analisar"  >Cancelar</a>
                            </form>
                        </div>
                    </div>
                </div>

                                               
            </main>
            <DocLoc selectDocument={this.selectDocument} />
            </div>
           
        )
    }
}

export default TramitForm