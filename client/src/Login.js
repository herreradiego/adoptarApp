import React,{Fragment, Component} from 'react'
import {Link} from 'react-router-dom'
import { FacebookLoginButton, GoogleLoginButton, GithubLoginButton, TwitterLoginButton, InstagramLoginButton } from "react-social-login-buttons";
import { SocialIcon } from 'react-social-icons';
import { slide as Menu } from 'react-burger-menu'
import logoImg from './adoptarApp_logo.png'
import {Navbar, NavItem, Button, Icon } from 'react-materialize';
import 'materialize-css/dist/css/materialize.min.css';
import ('./Login.css')



class Login extends Component{
    
    constructor(props){
        super(props)
   
    this.manageLogin = this.manageLogin.bind(this)
    }

    manageLogin(){

    }
onClick(){
    alert("CLICKED")
}

handleClick() {
    this.setState({
        open: !this.state.open
    });
}


   

render(){
 
    return(
        
        <Fragment className="main-contanier">
    
            <Navbar className="navbar" edge="right" centerLogo brand={<a><img src={logoImg}/>AdoptarApp</a>} alignLinks="right">
            <Button node="a">
                Buscar Mascota
            </Button>
            <Button node="a">
            Donar
            </Button>
            <Button node="a">
            Acerca de AdoptApp
            </Button>
            

            </Navbar>
            <div className="social">
                <h6 className="social-title">Por favor, regístrese o ingrese para continuar</h6>
                <div className="login-container">
                    <p>Seleccione su red social favorita</p>
                    <button className="facebook-btn">Facebook</button>
                    <button className="gootle-btn">Google</button>
                    <button className="twitter-btn">Twitter</button>

                </div>
            </div>
        </Fragment>
        
        
  );
        
        
}
}




  export default Login;
