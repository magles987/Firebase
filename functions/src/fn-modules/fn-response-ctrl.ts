import * as functions from 'firebase-functions';
import { Handler_meta } from './meta/handler-meta';
import { Handler_ProductoMeta } from './meta/handler-producto-meta';

//████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████
/*IMapHandlers:*/
//aqui determinar las propiedades y tipo de objeto que almacenara 
//cada elemmento del mapHandler
interface IMapHandlers {
    get_H_Meta? : ()=>Handler_meta<any>;
}

//████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████
/*class FnResponseController*/
//
export class FnResponseController {

    //cargar TODAS las funciones para obtener instancias
    // handlers a usar, se usa funcione, para no tener que 
    //crear las instancias de todos los handlers cuando en 
    //realidad se usa 1 por peticion
    private static MapHandlers = new Map<string, IMapHandlers>([
        [
            Handler_meta.nomsDic.Producto.S,
            { get_H_Meta: ()=>new Handler_ProductoMeta()}
        ]
    ]);

    constructor(
        private request:functions.https.Request
    ) { }

    /*getModelMetaResult()*/
    //determina que ModelMetadata se esta solicitando, se 
    //configura y se devuelve, normalmente la configuracion 
    //que se realice requerirá consultas y administracion 
    //de otras apis de firebase ejecutadas de manera asincrona
    // por lo tanto se devuenve promesa 
    public getModelMetaResult():Promise<unknown | null>{
        //determinar el modeloMeta que se debe configurar y devolver
        let nomModel = <string>this.request.query[Handler_meta.nomPropQuery];
        if (!nomModel || nomModel == null) {
            return Promise.resolve(null);
        }

        //limpiar la cadena y 
        //eliminar caracteres No permitidos Si los hay
        nomModel = this.clearParamString(nomModel);

        //determinar si esta registrado en el diccionario de noms
        if (!Handler_meta.nomsDic[nomModel]) {
            return Promise.resolve(null);
        }

        //obtener y crear el handler de metadata solicitado
        const itemMap = FnResponseController.MapHandlers.get(nomModel);
        const handler_meta = itemMap.get_H_Meta();

        return handler_meta.configAndGetModelMeta(this.request);

    }

    //================================================================
    //utilitarios:
    /*clearParamString()*/
    //limpia un parametro recibido desde la solicitud enviada por 
    //el cliente de cualquier caracter malisioso
    //Parametros:
    //qParam: parametro recibido en request a limpiar
    private clearParamString(qParam:string):string{
        //determinar que sea un string valido
        if (!qParam || qParam == null || 
            typeof(qParam) != "string" ||
            qParam == ""
        ) {
            return qParam;
        }

        qParam = qParam.trim();

        //esto SI son permitidos (eliminar los demas)
        const Reg_clearStr = /[^a-zA-Z0-9_]/g; 
        qParam = qParam.replace(Reg_clearStr, "");

        return qParam;
    }
    

}
