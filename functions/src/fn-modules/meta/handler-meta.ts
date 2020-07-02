import * as functions from 'firebase-functions';
import { nomsDictionaryMC } from "../../../../mi-web-HTML5/src/MC-firebase/controllers/meta";

//████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████
/*abstract class Handler_meta*/
//
export abstract class Handler_meta<TModelMeta>{
    
    //toma el registro de nombres de colecciones
    //se usa aqui como static para no adicionar imports 
    //referentes a colecciones fuera de esta clase
    public static nomsDic = nomsDictionaryMC;

    //nombre de la propiedad que se recibe en la peticion
    //la cual almacena en Modelo del metadata 
    public static nomPropQuery = "nomModel";    

    constructor(
        protected ModelMeta:TModelMeta
    ){}

    //Configurará y obtendra la metadata del modelo 
    //de forma asincrona
    public abstract configAndGetModelMeta(request:functions.https.Request):Promise<TModelMeta>;

}
