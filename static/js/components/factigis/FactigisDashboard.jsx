import React from 'react';
import ReactDOM from 'react-dom';
import {FactigisModuleList, excludeDataFactigis,FactigisInsertMyData} from '../../../js/services/factigis_services/factigisModuleList';
import cookieHandler from 'cookie-handler';
import {saveGisredLogin, getFormatedDate} from '../../services/login-service';
import _ from 'lodash';
import {Navbar, Nav, NavItem, NavDropdown, DropdownButton,FormGroup,FormControl, MenuItem,Breadcrumb, CollapsibleNav} from 'react-bootstrap';
import { AppBar, Checkbox, IconButton } from 'react-toolbox';
import { Layout, NavDrawer, Panel, Sidebar } from 'react-toolbox';
import env from '../../services/factigis_services/config';
import {Button} from 'react-toolbox/lib/button';

class FactigisDashboard extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      factigisModuleList: [],
      factigisNotAvList: []
    }

  }
  componentWillMount(){
    //if theres no cookie, the user cannot be in dashboard.
    if(!cookieHandler.get('usrprmssns')){
      window.location.href = "index.html";
      return;
    }
    //else , charge the modules that the user has permissions
    var myDashboardModules = cookieHandler.get('usrprmssns');
    var list = FactigisInsertMyData(FactigisModuleList(), myDashboardModules);
    let unicos = list.map(l=>{
      return l.module;
    });
    ////console.log("unicos",_.uniq(unicos), "lista", list, "asd", _.uniqWith(list, _.isEqual));


    this.setState({factigisModuleList: _.uniqWith(list, _.isEqual)});

    //and then save where the user is:

    const page = env.SAVEAPPLICATIONNAME;
    const module = "DASHBOARD";
    //saveGisredLogin(userPermissions[0].username,page,module,localStorage.getItem('token'));

    //and load the other not available modules

    var myLi = _.uniqWith(myDashboardModules, _.isEqual);
    var mAll = FactigisModuleList();
    //console.log(myLi,mAll,"listas")
    var myPropList = ['module', 'alias',"widgets",'Available','Permission','Insert','Update','Delete','url','color','img'];
    var result = excludeDataFactigis(mAll,myLi,myPropList);
    //console.log("exclude",result)
    this.setState({factigisNotAvList: result});

  }

  componentDidMount(){
    /*//var d = cookieHandler.get('wllExp');
    var d = new Date(cookieHandler.get('wllExp'));

    if(d > getFormatedDate()){
      console.log(d,"tengo",getFormatedDate());
    }else{
      console.log("expiro");
      console.log(d,"tengo",getFormatedDate());
      window.location.href = "index.html";
    }
    */
  }

  onClickDashboard(e){
    if(e==""){
        return;
    }
      window.location.href = e;
  }

  onLoggOff(){
      cookieHandler.remove('myLetter');
      cookieHandler.remove('usrprfl');
      cookieHandler.remove('usrprmssns');
      cookieHandler.remove('wllExp');
      localStorage.removeItem('token');
      window.location.href = "index.html";
  }

  render(){
    let whoLogged = cookieHandler.get('usrprfl');
    whoLogged = whoLogged.NOMBRE_COMPLETO.split(" ");
    let src = env.CSSDIRECTORY+'images/logo_factigis.png';
    var excludeModules = this.state.factigisNotAvList.map((m, index)=>{
        //console.log(m);
        let url = m.url;
        let urlName = m.alias;
        let imgSrc = m.img;
        let color = m.color;

        let divstyle = {
          'backgroundColor': 'none',
          'color': 'white'
        };
         return  <div className="factigisDashboard-icons" style={divstyle} key={index}>
                    <div ><img className="factigisDashboard-img" src={imgSrc}></img></div>
                    <h7 className="factigisDashboard-a" key={index} href={url}>{urlName}</h7><br/></div>;
    });
    var modules = this.state.factigisModuleList.map((m, index)=>{

        let url = m.url;
        let urlName = m.alias;
        let imgSrc = m.img;
        let color = m.color;
        let display;
        if (m.available=='yes'){
          display = 'flex';

        }else{
          display  = 'none';
        }
        let divstyle = {
          'backgroundColor': color,
          'color': 'white',
          'display': display
        };
         return  <div className="factigisDashboard-icons" style={divstyle} key={index}>
                    <div className="factigisDashboard-divImgCenter"><img className="factigisDashboard-img" src={imgSrc}></img></div>
                    <a className="factigisDashboard-a" key={index} href={url}>{urlName}</a><br/></div>;
    });

    return (
    <div>
      <Panel>
        <AppBar>
          <div className="wrapperTop">
            <div className="logo_content">
              <img className="img_logo" src={src} ></img>
              <div className="breadcrumbs_custom">
                <Button className="btn_dashboard" icon='home' label='Inicio' accent onClick={this.onClickDashboard.bind(this,"index.html")}  />
                <Button className="btn_dashboard" icon='explore' label='Dashboard' accent onClick={this.onClickDashboard.bind(this,"")}/>
              </div>
            </div>
            <div className="welcome_logout_wrapper">
              <h6>Bienvenido:  {whoLogged[0]}</h6>
              <IconButton icon='settings_power' inverse={ true } onClick={this.onLoggOff.bind(this)}/>
            </div>
          </div>
        </AppBar>
      </Panel>
      <div className="factigisDashboard-title">
      <h1 className="factigisDashboard-titleleft">Facti</h1><h1 className="factigisDashboard-titleright">GIS</h1>
      </div>
      <div className="factigisDashboard-title">
      <h1 className="factigisDashboard-subtitle">Seleccione una opción</h1>
      </div>
      <div className="wrapper_factigisDashboard">
        {modules}
        {excludeModules}
      </div>
    </div>

  );
  }
}

export default FactigisDashboard;
