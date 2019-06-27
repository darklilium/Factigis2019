import React from 'react';
import ReactDOM from 'react-dom';
import cookieHandler from 'cookie-handler';
import env from '../../services/factigis_services/config';
import dateFormat from 'dateformat';


class FactigisCarta extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      open: false,
      myElements: [],
      myCompany: '',
      empresaLogo: '',
      direccionEmpresa: {
        litoral: 'Av. Peñablanca N°540, Algarrobo',
        casablanca: 'Av. Portales N°187, Casablanca',
        linares: 'Chacabuco 675, Linares',
        parral: 'Anibal Pinto 1101, Parral',
        chilquinta: 'Av. Argentina N°1, piso 9, casilla 12V'
      },
      fonoEmpresa: {
        litoral: 'Servicio: 600 730 7630, desde celulares: +56 32 226 53 60',
        casablanca: 'Servicio: 32 226 53 70, desde celulares: +56 32 226 53 70 ',
        linares: 'Servicio: 600 600 25 00, desde celulares: +56 32 22 65 340',
        parral: ' Servicio: 600 600 22 00, desde celulares: +56 32 226 53 80',
        chilquinta: 'Fono: (56-32) 245 2000 - Fax: (56-32) 223 1171'
      },
      emailEmpresa: {
        litoral: 'litoral@litoral.cl, www.litoral.cl',
        casablanca: 'casablanca@casablanca.cl www.casablanca.cl',
        linares: 'reclamosll@luzlinares.cl www.luzlinares.cl',
        parral: 'reclamoslp@luzlinares.cl www.luzparral.cl',
        chilquinta: 'www.chilquinta.cl'
      }
    }

  }

  open() {
    this.setState({ open: true });

  }
  closed() {
    this.setState({ open: false })
  }
  componentWillMount() {
    //if theres no cookie, the user cannot be in factigis Carta.
    if (!cookieHandler.get('usrprmssns')) {
      window.location.href = "index.html";
      return;
    }

    //18.4.2018:
    var emp = cookieHandler.get('usrprfl').EMPRESA;
    console.log(emp, "empresa logo");
    //else , charge the modules that the user has permissions
    this.setState({ myElements: cookieHandler.get('myLetter'), myCompany: emp });

  }

  render() {
    var direccion = this.state.myElements[0];
    var solicitante = this.state.myElements[1];
    var ejecutor = this.state.myElements[2];
    var folio = this.state.myElements[3];
    var cargo = this.state.myElements[4];
    var lugar = this.state.myElements[5];
    var departamento = this.state.myElements[6];
    var lugarEmision = this.state.myElements[7];


    var hoy = new Date();

    hoy.setDate(hoy.getDate());
    hoy = dateFormat(hoy, "dd/mm/yyyy hh:MM:ss")

    //04.12.2018: REQ. Dinamizar carta según empresa
    let fonoEmp, dirEmp, emailEmp = '';

    switch (this.state.myCompany) {
      case 'chilquinta':
        fonoEmp = this.state.fonoEmpresa.chilquinta;
        dirEmp = this.state.direccionEmpresa.chilquinta;
        emailEmp = this.state.emailEmpresa.chilquinta;
        break;

      case 'litoral':
        fonoEmp = this.state.fonoEmpresa.litoral;
        dirEmp = this.state.direccionEmpresa.litoral;
        emailEmp = this.state.emailEmpresa.litoral;
        break;

      case 'linares':
        fonoEmp = this.state.fonoEmpresa.linares;
        dirEmp = this.state.direccionEmpresa.linares;
        emailEmp = this.state.emailEmpresa.linares;
        break;

      case 'parral':
        fonoEmp = this.state.fonoEmpresa.parral;
        dirEmp = this.state.direccionEmpresa.parral;
        emailEmp = this.state.emailEmpresa.parral;
        break;

      case 'casablanca':
        fonoEmp = this.state.fonoEmpresa.casablanca;
        dirEmp = this.state.direccionEmpresa.casablanca;
        emailEmp = this.state.emailEmpresa.casablanca;
        break;
    }


    //dev
    let image = `${env.CSSDIRECTORY}images/factigis_images/logo_${this.state.myCompany}400.png`;
    //prod
    //let image = "css/images/factigis_images/logo_chq400.png";

    return (
      <div className="wrapper_factigisCarta">
        <img className="factigisCarta_img" src={image}></img>
        <h4 className="factigisCarta_h4">Folio N°  {folio}</h4>
        <h3 className="factigisCarta_h3">CERTIFICADO DE FACTIBILIDAD</h3>
        <br />
        <p className="factigisCarta_p p1"><b>{this.state.myCompany.toUpperCase()} S.A.,</b> certifica la factibilidad de suministro de energía eléctrica en la propiedad {direccion}, según lo indicado en el DFL N° 4 del año 2006, Ministerio de Minería (artículos 125 y 126), sus Reglamentos y Normas Eléctricas.</p>
        <p className="factigisCarta_p p2">La presente certificación de factibilidad se otorga bajo el supuesto que el suministro se podrá conectar en las condiciones técnicas de tensión, potencia y número de fases que actualmente posee la red eléctrica donde se conectará el empalme.</p>
        <p className="factigisCarta_p p3">En caso de no cumplirse el supuesto antes indicado, será necesario que el interesado pague los costos de estudios para elaborar proyecto y presupuesto, con el propósito de llegar a un acuerdo comercial con {this.state.myCompany.toUpperCase()}.</p>
        <p className="factigisCarta_p p4">Se extiende el presente certificado a solicitud de <b>{solicitante}</b>, para los fines que estime conveniente.</p>

        <p className="factigisCarta_p p5">{ejecutor}<br />{cargo}<br />{lugar}<br />{departamento}</p>
        <p className="factigisCarta_fecha">{lugarEmision}, {hoy}</p>
        <p className="factigisCarta_pie">{dirEmp}<br />{fonoEmp}<br />{emailEmp}</p>

      </div>
    );
  }
}

export default FactigisCarta;
