import React from 'react';
import { factigisLogin } from '../services/login-service';
import cookieHandler from 'cookie-handler';
import Input from 'react-toolbox/lib/input';
import {Button, IconButton} from 'react-toolbox/lib/button';
import env from '../services/factigis_services/config';
import {Snackbar} from 'react-toolbox';

/*Class for Login Access*/
class LoginApp extends React.Component {
  constructor(){
    super();
    /* handles the message in the snackbar. Also user and password provided*/
    this.state = {
      errorTextLabel: 'Este campo es requerido',
      snackbarMessage: '',
      active: false,
      username: '',
      password: ''

    }
  }
  /* Handles the snackbar to become active when user clicks login button */
  handleClick = () => {
   this.setState({active: true})
  };
  /* Handles the login in for users vialactea and w/o vialactea*/ 
  onClick(){
    var userValue = this.state.username;
    var passValue =  this.state.password;
    //If they dont put any username or password
    if (userValue=="" || passValue==""){
      this.setState({snackbarMessage: 'Login Incorrecto. Ingrese usuario y password', snackbaropen: true});
      this.handleClick();
      
      return;
    }
    //For domain users
    if (userValue.includes('vialactea\\')){
      console.log("Trying to access" + env.SAVEAPPLICATIONNAME+ "_DASHBOARD");
      factigisLogin(userValue, passValue,(cb)=>{
        if( !cb[0] && !cb[1] ) {
          this.setState({snackbarMessage: cb[2], snackbaropen: true});
          this.handleClick();
          return;
        }
        if( cb[0] && !cb[1] ){
          this.setState({snackbarMessage: cb[2], snackbaropen: true});
          this.handleClick();
          return;
        }

        if( cb[0] && cb[1] ){
          this.setState({snackbarMessage: cb[2], snackbaropen: true});
          this.handleClick();
        window.location.href = cb[3];
        }

      });
      return;
    //For users who doesnt put the domain  
    }else {
      console.log("Trying to access" + env.SAVEAPPLICATIONNAME+ "_DASHBOARD");
      userValue =  'vialactea\\'+this.state.username;
      //Handles the login and return values for snackbar and if the login was successful
      factigisLogin(userValue, passValue, (cb)=>{
        if( !cb[0] && !cb[1] ) {
          this.setState({snackbarMessage: cb[2], snackbaropen: true});
          this.handleClick();
          return;
        }
        if( cb[0] && !cb[1] ){
          this.setState({snackbarMessage: cb[2], snackbaropen: true});
          this.handleClick();
          return;
        }

        if( cb[0] && cb[1] ){
          this.setState({snackbarMessage: cb[2], snackbaropen: true});
          this.handleClick();
        window.location.href = cb[3];
        }
      });
    }
  }
  //Before mounting , remove cookies saved.
  componentWillMount(){
    localStorage.removeItem('token');
    cookieHandler.remove('myLetter');
    cookieHandler.remove('usrprfl');
    cookieHandler.remove('usrprmssns');
    cookieHandler.remove('wllExp');
    cookieHandler.remove('tkn');
  }
  //After mounting get the screenshot to show in the login.
  componentDidMount(){
    //change the loginwall dinamically
    let randomPicNumber = Math.floor((Math.random() * 6) + 1);
    //********Cambiar randomPicSrc para test/prod*******
    //let randomPicSrc = "css/images/login_images/loginwall"+ randomPicNumber+ ".jpg"; //prod
    let randomPicSrc = env.CSSDIRECTORY+ "images/login_images/loginwall"+ randomPicNumber+ ".jpg";//desarrollo
    console.log(randomPicSrc);
  //  $('.login_wrapper').css("background-image", "url("+randomPicSrc+")");
  $('.login_wrapper_content').css("background-image", "url("+randomPicSrc+")").css('background-size','100% 100%');

  }
  //If user use ebter to log in.
  handleKeyPress(target){
    if(target.charCode==13){
        this.onClick();
    }
  }

  //Makes snackbar to hide
  handleSnackbarClick = () => {
     this.setState({active: false})
  };
  //Shows the snackbar
  handleClick = () => {
   this.setState({active: true})
  };
  //Change the values in the state for user and pass.
  handleChange = (name, value) => {
     this.setState({...this.state, [name]: value});
  };

  render(){
  let src = env.CSSDIRECTORY + 'images/logo_factigis.png';
      return (

          <div className="login_wrapper_content">
            <div className="login_div">
            <img className="login_logo" src={src}></img>
            <Input className="login_input" type='text' label='Usuario' name='name' icon="person" value={this.state.username} onChange={this.handleChange.bind(this, 'username')} />
            <Input className="theme__filled___1CY2o" type='password' label='Contraseña' name='name' icon="lock" value={this.state.password} onChange={this.handleChange.bind(this, 'password')} onKeyPress={this.handleKeyPress.bind(this)}  />
            <Button icon='power_settings_new' label='Login' raised primary className="login_button" onClick={this.onClick.bind(this)} />
            </div>
            <Snackbar action='Aceptar' active={this.state.active} icon='error' label={this.state.snackbarMessage} onClick={this.handleSnackbarClick.bind(this)} onTimeout={this.handleSnackbarTimeout} type='cancel' />
          </div>
    );
  }
}

export default LoginApp;
