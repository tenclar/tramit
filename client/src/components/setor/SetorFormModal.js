import React, {Component} from 'react'
import { setorNovo } from './SetorApi'


const initState = {
    fields:{nome: '', descricao:''},
    errors:{}
}

class SetorFormModal extends Component {
    constructor(props){
        super(props)
        this.state = initState
        this.onChange = this.onChange.bind(this)
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

    onChange(e){
        e.preventDefault()
        let fields = this.state.fields
        fields[e.target.name] = e.target.value
        this.setState({fields})
       
    }

    onSubmit(e) {
        e.preventDefault()

        let fields = {}
        if(this.validateForm()) {
            
            fields["nome"]=''
            fields["descricao"]=''
          
            this.setState({fields:fields}) 
           
            setorNovo(this.state.fields).then(res => {
                this.props.history.push('/setores')
            })
        }
        
    }

    render() {
        const {  errors } = this.state
        return (
            
          

            <div className="modal" tabIndex="-1" role="dialog" id="setorNovo">
                <div className="modal-dialog" role="document">
                <form noValidate onSubmit={this.onSubmit} >
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Cadastro de Setores</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                        

                         
                            
                        <div className={errors.nome !== undefined ?  "form-group has-error": "form-group"}>
                                <label  htmlFor="nome">Nome do Setor</label>
                                <input type="text" 
                                autoComplete="off"
                                className="form-control form-control-lg" 
                                name="nome" 
                                id="nome" 
                                placeholder="Departamento X" 
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
                                   id="descricao" name="descricao"
                                   placeholder="Texto descritivo do Setor"
                                   value={this.state.fields.descricao}
                                   onChange={this.onChange}
                                   ></textarea>
                                   <div className="help-block">{errors.descricao}</div>
                            </div>
                            



                        </div>
                      
                        <div className="modal-footer">
                            <button type="reset" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="submit" className="btn btn-primary" data-dismiss="modal" onClick={this.onSubmit} >Salvar</button>
                        </div>
                      
                    </div>
                    </form>
                </div>
            </div>

          
           
        )
    }
}

export default SetorFormModal