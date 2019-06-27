import cookieHandler from 'cookie-handler';
import mymap from '../../services/map-service';
import layers from '../../services/layers-service';
//1/2/2018: Agregando moment para hacer respuestas solo mayores a 6 meses de antigüedad.
import moment from 'moment';
var before_sixMonths = moment().subtract(6,'months').calendar();

console.log(before_sixMonths,"tengo hace 6 meses" , typeof before_sixMonths);
function loadFactStates(folio , callback){
  //console.log('cargando estados.');

  var qTasEstados = new esri.tasks.QueryTask(layers.read_historial_factibilidad());
  var qEstados = new esri.tasks.Query();
  qEstados.returnGeometry = false;
  qEstados.where = "ID_Factibilidad="+ folio;
  qEstados.outFields=["*"];
  qEstados.orderByFields=['Fecha_cambio'];
  qTasEstados.execute(qEstados, (featureSet)=>{
    if(!featureSet.features.length){
      console.log("no hay estados para esta factibilidad");
      return callback([]);
    }

    //console.log("estados", folio, ":",featureSet.features);
    return callback(featureSet.features);

  }, (Errorq)=>{
    console.log(Errorq,"Error doing query for estados factibilidad ");
    return callback([]);
  });
}


function loadCurrentHistoryData(dateRange, callback){
  let usrprfl = cookieHandler.get('usrprfl');
  console.log("Estado_tramite='CERRADA' AND EMPRESA = '"+ usrprfl.EMPRESA+ "' " + dateRange);
  var qTaskFact = new esri.tasks.QueryTask(layers.read_agregarFactibilidad());
  var qFact = new esri.tasks.Query();
  qFact.where = "Estado_tramite='CERRADA' AND EMPRESA = '"+ usrprfl.EMPRESA+ "' " + dateRange;
  qFact.returnGeometry = true;
  qFact.outFields = ["*"];
  qTaskFact.execute(qFact, (featureSet)=>{
    if(featureSet.features.length){
    console.log("esto:", featureSet);
      return callback(featureSet.features)
    }else{
      //console.log("no hay", featureSet.features.length, comuna);
      return callback([])
    }

  }, (Errorq)=>{
    //console.log("error en query para obtener factibilidades según zona", comuna)
    return callback([]);

  });
}
export {loadFactStates, loadCurrentHistoryData}
