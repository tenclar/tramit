import React, {Component} from 'react'

import { docNovo } from './DocApi'
import { setorGet } from '../setor/SetorApi'
import { doctipoGet } from '../doctipo/DoctipoApi'


const initState = {
    fields:{numero:'', nome: '', descricao:''},
    setores:[],
    doctipos:[],
    errors:{}
}

class DocForm extends Component {

    constructor(props){
        super(props)
        this.state = initState
        this.onChange = this.onChange.bind(this)
        this.onCancel = this.onCancel.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    
    validateForm(){
        let fields = this.state.fields
        let errors = {}

        let formIsValid = true


        
        if (!fields["numero"]) {
            formIsValid = false            
            errors["numero"] = "Por Favor, Informe numero . "
            
        }
        if (!fields["nome"]) {
            formIsValid = false            
            errors["nome"] = "Por Favor, Informe nome. "
            
        }
        if (!fields["descricao"]) {
          formIsValid = false            
          errors["descricao"] = "Por Favor, Escreva uma descrição. "
          
        }

        if (!fields["setorId"]) {
            formIsValid = false            
            errors["setorId"] = "Selecione Um setor "
            
          }
        
          if (!fields["tipodocId"]) {
            formIsValid = false            
            errors["tipodocId"] = "Por Favor,Selecione tipo de Documento "
            
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

        doctipoGet().then(doctipos => {
            this.setState({
                doctipos:doctipos
            
            })
        })
    }

    onChange(e){
        e.preventDefault()
        let fields = this.state.fields
        fields[e.target.name] = e.target.value.toUpperCase()
        this.setState({fields})
       
    }
    onCancel(e){
        e.preventDefault()
        this.props.history.push('/documentos')
    }
    onSubmit(e) {
        e.preventDefault()
        //let fields = {numero:'', nome:'',descricao:''}          
       
        if(this.validateForm()) {
             
           
            docNovo(this.state.fields).then(res => {
                this.setState= initState
                if(res.error){
                    this.setState({msg:res.error})
                }else{                  
                    this.props.history.push('/documentos')
                }              
                
                
            })
        }
        
    }
    render() {

        const {  errors, setores, doctipos } = this.state
        return (
           

            <main role="main" className="mt-3 flex-shrink-0">
                <div className="container">
                    
                        <h1 className="page-header ">
                                <i className="far fa-list-alt"></i> Formulário de Cadastro de Documentos
                        </h1>
                        <hr className="bg-primary" />
                    
                    
                        
                       <div className="card">
                       <div className="card-header ">
                            Dados Cadastrais
                       </div>
                       <div className="card-body">
                        <form noValidate onSubmit={this.onSubmit} >

                                    <div className={errors.tipodocId !== undefined ? "form-group col-md-6 was-validated  has-error" : "form-group col-md-6"}>
                                    <label htmlFor="tipodocId">Tipo de Documento</label>
                                    <select id="tipodocId" required
                                        className="custom-select  mb-3"
                                        name="tipodocId"
                                        value={this.state.fields.tipodocId}
                                        onChange={this.onChange}
                                    >
                                        <option value="" >selecione</option>
                                        {doctipos.map(doctipo =>
                
                                            <option key={doctipo.id} value={doctipo.id}>{doctipo.nome}</option>
                                        )}
                                    </select>
                                    <div className="help-block invalid-feedback">{errors.tipodocId}</div>
                                </div>
                                <div className={errors.numero !== undefined ?  "form-group was-validated": "form-group"}>
                                    <label  htmlFor="numero">Número</label>
                                    <input type="text" required
                                    autoComplete="off" 
                                    className="form-control form-control-lg" 
                                    name="numero" 
                                    id="numero" 
                                    placeholder="Número do documento" 
                                    value={this.state.fields.numero}
                                    onChange={this.onChange}
                                    />
                                    <div className="invalid-feedback">{errors.numero}</div>
                                </div>
                            
                                <div className={errors.nome !== undefined ?  "form-group was-validated": "form-group"}>
                                    <label  htmlFor="nome">Nome do Documento</label>
                                    <input type="text" required
                                    autoComplete="off"
                                    className="form-control form-control-lg" 
                                    name="nome" 
                                    id="nome" 
                                    placeholder="descrição resumida " 
                                    value={this.state.fields.nome}
                                    onChange={this.onChange}
                                    />
                                    <div className="invalid-feedback">{errors.nome}</div>
                                </div>
                                <div className={errors.descricao !== undefined ? "form-group was-validated " : "form-group"}>
                                    <label htmlFor="descricao">Descrição</label>
                                    <textarea type="text" required
                                        rows="5"
                                        className="form-control form-control-lg"
                                        id="descricao"
                                        name="descricao"
                                        placeholder="Texto descritivo do Documento"
                                        value={this.state.fields.descricao}
                                        onChange={this.onChange}
                                    ></textarea>
                                    <div className="invalid-feedback">{errors.descricao}</div>
                                </div>

                                <div className={errors.setorId !== undefined ? "form-group col-md-6 was-validated  has-error" : "form-group col-md-6"}>
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
                                {JSON.stringify(this.state.fields)}
                             
                                <hr className="bg-default" />
                                <button type="submit" className="btn btn-primary mr-1">Salvar</button>
                                <a className="btn btn-danger" href="/documentos"  >Cancelar</a>
                            </form>
                        </div>
                    </div>
                </div>
               
                                
            </main>
           
        )
    }
}

export default DocForm