import * as functions from 'firebase-functions';
import { FirebaseConfig } from "../firebase-config";
import { Handler_meta } from './handler-meta';
import { ProductoMeta } from "../../../../mi-web-HTML5/src/MC-firebase/controllers/producto/producto-meta";

//████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████
/*class Fn_ProductoMeta */
//permite extender funcionalidades exclusivas para usar desde cloudFunctions
//SE RECOMIENDA NO DECLARAR PROPIEDADES PARA ESTA CLASE, ya que las propiedades
// a usar deben estar en la clase [Padre]Meta
export class Handler_ProductoMeta extends Handler_meta<ProductoMeta> {

    constructor(){
        super(new ProductoMeta());
    }

    /*configAndGetModelMeta() @Override*/
    //realiza la configuraion de los metadatos que deban ser analizados 
    //y modificados por aspectos o comporamientos del lado del servidor
    //y se devuelve la metadata ya modificada
    public configAndGetModelMeta(request:functions.https.Request):Promise<ProductoMeta>{

        return new Promise( (resolve, reject) => {
            
            //...
            //aqui se debe asignar la configuracion y mdificaciones 
            //adicionales a la metadata que se deban hacer en el servidor

            const FB = FirebaseConfig.getInstance();
            let app_FS = FB.app_FS;

            app_FS.collection(this.ModelMeta.__nomColeccion).limit(10).get()
            .then((data) => {

                let docs: any[] = [];
                data.forEach((doc) => {
                    docs.push(doc.data());
                });
                return docs;
            })
            .then((docs) => {
                this.ModelMeta["docs987"] = docs;
                resolve(this.ModelMeta);
                return;
            })

            // resolve(this.ModelMeta);
            //reject();
        });
    }
    
}