import token from '../../services/token-service';
import jQuery from 'jquery';
import layers from '../../services/layers-service';

function saveSGOCertificate(certificado){
  var promise = new Promise((resolve,reject)=>{
    console.log(token.read(),"token?");
      const data = {
        f: 'json',
        adds: JSON.stringify([{ attributes: certificado, geometry: {} }]),
        token: token.read()
      };


      jQuery.ajax({
        method: 'POST',
        url: layers.read_addSGOCertificate(),
        dataType:'html',
        data: data
      })
      .done(d =>{
        console.log(d);
        let json = JSON.parse(d);
        if( (_.has(json,'error')) ){
          reject(false)
        }else{
          let arrObject = [];
          if(json["addResults"][0].objectId>0){
            resolve(true)

          }else{
            reject(false)
          }
        }
      })
      .fail(f=>{
          console.log(f,"no pase")
          reject(false)
      });

  });

  return promise;

}

function deleteSGOCertificate(id, token){
  var promise = new Promise((resolve,reject)=>{
    const data = {
      f: 'json',
      deletes: id,
      token: token
    };

    $.ajax({
      method: 'POST',
      url: layers.read_addSGOCertificate(),
      dataType:'html',
      data: data
    })
    .done(d =>{
      console.log(d,"HOLA DESDE DELETE");
      let json = JSON.parse(d);

      if( (_.has(json,'error')) ){
        reject(false);
      }else{
          let arrObject = [];
          if(json["deleteResults"][0].objectId>0){
            resolve(true);

          }else{
            reject(false);
          }
      }
    })
    .fail(f=>{
      console.log(f,"no pase")
      reject(false)
    });

  });

  return promise;


}


export {saveSGOCertificate, deleteSGOCertificate}
