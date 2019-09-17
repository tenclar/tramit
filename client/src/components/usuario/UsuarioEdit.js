import React, {Component} from 'react'
import { setorGet } from '../setor/SetorApi'
 import { usuarioUpdate,  usuarioIdGet } from './UsuarioApi' 


const initState = {
    fields:{nome: '', email:'', password:''},
    errors:{},
    msg:'',
    setores:[]
}


class UsuarioEdit extends Component {
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
        if (!fields["email"]) {
          formIsValid = false            
          errors["email"] = "Por Favor, informe email corporativo. "          
        }
        
        if (typeof fields["email"] !== "undefined") {
            //regular expression for email validation
            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(fields["email"])) {
              formIsValid = false;
              errors["email"] = "*Por vavor, entre com e-mail válido. " ;
            }
          }

        if (!fields["password"]) {
            formIsValid = false            
            errors["password"] = "Por Favor, defina uma senha. "            
          }

         /*  if (typeof fields["password"] !== "undefined") {
            if (!fields["password"].match(/^[0-9]{6}$/)) {
                formIsValid = false;
                errors["password"] = "* mínimo 6 digitos.";
            }
        }
       
  
        if (typeof fields["password"] !== "undefined") {
            if (fields["password"].match(/\D/g,"")) {
                formIsValid = false;
                errors["password"] = "*Somente Números";
            }
        } */

          if (!fields["nivel"]) {
            formIsValid = false            
            errors["nivel"] = "Por Favor, escolha um nível. "            
          }
        

          if (!fields["setorId"]) {
            formIsValid = false            
            errors["setorId"] = "Por Favor, escolha um Setor. "            
          }

          
         
        this.setState({ errors: errors })
        return formIsValid

    }

    componentDidMount(){
        let id = this.props.match.params.id
        if(id){
            usuarioIdGet(id).then(usuario => {
                
                 this.setState({
                    fields:usuario                
                })
            })
        }
        setorGet().then(setores => {
            this.setState({
                setores:setores
            
            })
        })
    }


    onChange(e){
        e.preventDefault()
        let fields = this.state.fields
        //this.setState({[e.target.name] : e.target.type === 'number'? parseInt(e.target.value):  e.target.value})
        fields[e.target.name] = e.target.value
        this.setState({fields})
       
    }
    onCancel(e){
        e.preventDefault()
        this.props.history.push('/usuarios')
    }

    onSubmit(e) {
        e.preventDefault()
        this.setState({ msg:'' })
        
      
        if(this.validateForm()) {
            let fields = {}
            fields["nome"] = ''
            fields["email"] = ''
            fields["password"] = ''
            this.setState({ fields: fields })
            

        

          usuarioUpdate(this.state.fields).then(res => {
            if(res.error){
                this.setState({msg:res.error})
            }else{
                this.props.history.push('/usuarios')
            }              
            
        
            
            })
        }
        
    }

    render() {

        const { msg, setores, errors } = this.state
        return (
           

            <main role="main" className="mt-3 flex-shrink-0">
                <div className="container">
                    
                        <h1 className="page-header ">
                                <i className="far fa-list-alt"></i> Formulário de Cadastro de Usuários
                        </h1>
                        <hr className="bg-primary" />
                    
                        <div className="  alert-danger text-center rounded mb-3 " >{ msg }</div>
                       
                      
                   
                       <div className="card">
                       <div className="card-body">
                        <form  noValidate onSubmit={this.onSubmit} >
                            <div className={errors.nome !== undefined ?  "form-group was-validated  has-error": "form-group"}>
                            <label htmlFor="nome">Nome</label>
                            <input type="text" required
                                className="form-control"
                                id="nome" 
                                placeholder="Nome Completo" 
                                name="nome"
                                value={this.state.fields.nome}
                                onChange={this.onChange}
                                />
                                <div className="help-block invalid-feedback">{errors.nome}</div>
                            </div>
                            <div className="form-row">
                                
                                <div className={errors.email !== undefined ?  "form-group col-md-6 was-validated has-error": "form-group col-md-6"}>
                                <label htmlFor="email">Email</label>
                                <input type="email" required
                                     className="form-control"
                                     id="email" 
                                     placeholder="Email" 
                                     name="email"
                                     value={this.state.fields.email}
                                     onChange={this.onChange}
                                     />
                                     <div className="help-block invalid-feedback">{errors.email}</div>
                                </div>
                                <div className={errors.password !== undefined ?  "form-group col-md-6 was-validated  has-error": "form-group col-md-6"}>
                                <label htmlFor="password">Password</label>
                                <input type="password" required
                                 className="form-control "
                                  id="password"
                                   placeholder="Password"
                                   name="password"
                                   value={this.state.fields.password}
                                   onChange={this.onChange}
                                   />
                                   <div className="help-block invalid-feedback">{errors.password}</div>
                                </div>
                            </div>
                            <div className="form-row">
                            <div className={errors.nivel !== undefined ?  "form-group col-md-6 was-validated has-error": "form-group col-md-6"}>
                                    <label htmlFor="nivel">Nível</label>
                                    <select id="nivel"  className="custom-select" required
                                        name="nivel"
                                        value={this.state.fields.nivel}
                                        onChange={this.onChange}
                                    
                                    >
                                        <option value=""  >selecione</option>
                                        <option value="ADMIN">ADMIN</option>
                                        <option value="GERENTE">GERENTE</option>
                                        <option value="TECNICO">TÉCNICO</option>
                                    </select>    
                                    <div className="help-block invalid-feedback">{errors.nivel}</div>                            
                                </div>
                                <div className={errors.setorId !== undefined ?  "form-group col-md-6 was-validated  has-error": "form-group col-md-6"}>
                                    <label htmlFor="setorId">Setor</label>
                                    <select id="setorId"  required
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
                            
                        
                          <hr  className="bg-default" />
                            <button type="submit" className="btn btn-primary mx-3">Salvar</button>
                            <button type="reset" className="btn btn-danger" onClick={this.onCancel}>Cancelar</button>
                            </form>
                            </div>
                            </div>
                        </div>
                                
            </main>
           
        )
    }
}

export default UsuarioEdit