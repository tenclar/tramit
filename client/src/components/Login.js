import React, { Component } from 'react'
import {login } from './usuario/UsuarioApi'
import './css/Login.css'

class Login extends Component {

    constructor(){
        super()
        this.state = {

            email: '',
            password: '',
            error:''
        };

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(e){
        this.setState({ [e.target.name]: e.target.value  })

    }
    onSubmit(e){
        e.preventDefault()
        this.setState({ error:'' });

        const user = {
            email:this.state.email,
            password:this.state.password
        }
        
      /*   login(user).then(
            res => {                 
                if(res){
                    this.props.history.push('/profile')
                }else this.setState({ error: res.data.error })
            }
            
        ) */
        
       
       login(user).then(
           (res) => this.props.history.push('/app'),
           (err) => this.setState({ error: err.response.data.error })
       )
    }


    render() {

       const {error } = this.state
         return (
            <div className="formLogin">

            <form onSubmit={this.onSubmit} className="form-signin">
            <div className="fa-w-20 fa-2x">
            <i className="fab fa-accusoft fa-2x "></i> Tramit .::. <span className="font-weight-bold" >DOC</span>
            </div>
                <hr/>
                <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                <div className="  alert-danger text-center rounded mb-3 " >erro{ error }</div>
                <label htmlFor="inputEmail" className="sr-only">Email address</label>
                <input 
                    type="email" 
                    id="inputEmail" 
                    name='email' 
                    value={this.state.email}  onChange={this.onChange} 
                    className="form-control" placeholder="Email address" required autoFocus />
                <label htmlFor="inputPassword" className="sr-only">Password</label>
                <input 
                    type="password" 
                    id="inputPassword" 
                    name="password" 
                    value={this.state.password} onChange={this.onChange} 
                    className="form-control" placeholder="Password" required />
                    <div className="checkbox mb-3">
                        <label>
                        <input type="checkbox" value="remember-me"/> Remember me
                        </label>
                    </div>
                <button className="btn btn-lg btn-primary btn-block" type="submit">Entrar</button>
                <p className="mt-5 mb-3 text-muted">&copy; 2019 -- 2022</p>
        </form>
        </div>
        )
    }
}

export default Login