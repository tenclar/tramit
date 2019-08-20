import React, {Component} from 'react'

import { doctipoNovo } from './DoctipoApi'


const initState = {
    fields:{nome: '', descricao:''},
    errors:{}
}

class DoctipoForm extends Component {

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

        if (!fields["nome"]) {
            formIsValid = false            
            errors["nome"] = "Por Favor, Informe nome. "
            
        }
        if (!fields["descricao"]) {
          formIsValid = false            
          errors["descricao"] = "Por Favor, Escreva uma descrição. "
          
        }

        this.setState({ errors: errors })
        return formIsValid

    }
    clearForm(){
        
        let fields = {}
        fields["nome"] = ''
        fields["descricao"] = ''
      
        this.setState({ fields:fields }) 
    }

    onChange(e){
        e.preventDefault()
        let fields = this.state.fields
        fields[e.target.name] = e.target.value.toUpperCase()
        this.setState({fields})
       
    }
    onCancel(e){
        e.preventDefault()
        this.clearForm()
       // this.props.history.push('/doctipos')
    }
    onSubmit(e) {
        e.preventDefault()

       
        if(this.validateForm()) {
            this.clearForm()
           
            doctipoNovo(this.state.fields).then(res => {
                if(res.error){
                    this.setState({msg:res.error})
                }else{
                    this.props.history.push('/doctipos')
                }
            })
        }
        
    }
    render() {

        const { msg, errors } = this.state
        return (
           

            <main role="main" className="mt-3 flex-shrink-0">
                <div className="container">
                    
                        <h1 className="page-header ">
                                <i className="far fa-list-alt"></i> Formulário de Cadastro de Tipo de Documento
                        </h1>
                        <hr className="bg-primary" />
                    
                    
                        <div className="  alert-danger text-center rounded mb-3 " >{ msg }</div>
                       <div className="card">
                       <div className="card-header ">
                            Dados Cadastrais
                       </div>
                       <div className="card-body">
                        <form noValidate onSubmit={this.onSubmit} >
                            
                        <div className={errors.nome !== undefined ?  "form-group has-error": "form-group"}>
                        <label  htmlFor="nome">Nome </label>
                        <input type="text" 
                        autoComplete="off"
                        className="form-control form-control-lg" 
                        name="nome" 
                        id="nome" 
                        placeholder=" memorando, processo , ata" 
                        value={this.state.fields.nome}
                        onChange={this.onChange}
                        />
                        <div className="help-block">{errors.nome}</div>
                    </div>
                    <div className={errors.descricao !== undefined ?  "form-group has-error": "form-group"}>
                        <label  htmlFor="descricao">Descrição</label>
                        <textarea type="text"
                         rows="5"
                          className="form-control form-control-lg"
                           id="descricao"
                            name="descricao"
                           placeholder="Texto descritivo do Doctipo"
                           value={this.state.fields.descricao}
                           onChange={this.onChange}
                           ></textarea>
                           <div className="help-block">{errors.descricao}</div>
                            </div>
                            <hr className="bg-default" />
                            <button type="submit" className="btn btn-primary mr-1">Salvar</button>
                            <a className="btn btn-danger" href="/doctipos" >Cancelar</a>
                            </form>
                            </div>
                            </div>
                        </div>
                                
            </main>
           
        )
    }
}

export default DoctipoForm