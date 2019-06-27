import layers from '../../services/layers-service';
import token from '../../services/token-service';
import cookieHandler from 'cookie-handler';

function factigis_findSGOCert(idfactibilidad){

  var promise = new Promise((resolve,reject)=>{

    var qTaskInterruptions = new esri.tasks.QueryTask(layers.read_obrasAdicionales());
    var qInterruptions = new esri.tasks.Query();

    qInterruptions.returnGeometry = false;
    qInterruptions.outFields=["*"];
    qInterruptions.where = `ID_FACTIBILIDAD = '${idfactibilidad}'`;

    qTaskInterruptions.execute(qInterruptions, (featureSet)=>{

      if(!featureSet.features.length){
        return resolve([]);
      }

      resolve(featureSet.features);
    }, (Errorq)=>{
      console.log(Errorq,"Error doing query for obras adicionales cert.");
      reject([]);
    });

  });

  return promise;

}


function searchNivelesCoci(sed){
  var promise = new Promise((resolve,reject)=>{
    var qTaskInterruptions = new esri.tasks.QueryTask(layers.read_cortocircuito_sed());
    var qInterruptions = new esri.tasks.Query();

    qInterruptions.returnGeometry = false;
    qInterruptions.outFields=["*"];
    qInterruptions.where = `SED = '${sed}'`;

    qTaskInterruptions.execute(qInterruptions, (featureSet)=>{
      console.log("niveles coci para sed", sed, featureSet.features);

      if(!featureSet.features.length){

        return resolve([]);
      }

      resolve(featureSet.features);
    }, (Errorq)=>{
      console.log(Errorq,"Error doing query for searchNivelesCoci");
      reject([]);
    });
  });

  return promise;
}
export {factigis_findSGOCert, searchNivelesCoci}
