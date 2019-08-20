import React, {Component} from 'react'
import './css/Login.css'

class Login extends Component {
    render() {
        return (
            <div className="formLogin">

            <form className="form-signin">
            <div className="fa-w-20 fa-2x">
            <i className="fab fa-accusoft fa-2x "></i> Tramit .::. <span className="font-weight-bold" >DOC</span>
            </div>
                <hr/>
                <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                <label htmlFor="inputEmail" className="sr-only">Email address</label>
                <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required autoFocus />
                <label htmlFor="inputPassword" className="sr-only">Password</label>
                <input type="password" id="inputPassword" className="form-control" placeholder="Password" required />
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