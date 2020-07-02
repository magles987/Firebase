import * as admin from 'firebase-admin'
import { firebaseConfig } from 'firebase-functions';

//████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████
/*class FirebaseConfig*/
//configuracion inicial y UNICA de las apis del set de firebase que se 
//usaran desde cloud Funtions tambien llamado ServerFN 
//(Ejemplo: firestore, auth, las mismas cloudfunctions y demas)
//IMPORTANTE:
//clase configurada para singleton basico, NO se debe crear por medio de new
//sino usar el metodo static getInstance()
export class FirebaseConfig {

    //flags de configuracion de emulacion:
    private _isFunctionEmulator = true;
    private _isFirestoreEmulator = false;

    //app representacion de la siute de firebase
    private app:admin.app.App;

    //propiedad que contiene la representacion del api 
    //de Firestore ya configurada
    public app_FS:FirebaseFirestore.Firestore;

    //propiedad UNICa para el singleton
    private static instance:FirebaseConfig;

    //Importante:
    //para un singleton en typescript NO se recomeinada
    //declarar PROPIEDADES DE CLASE dentro del constructor 
    //(argumentos de constructor si se pueden recibir) 
    //que son enviados desde el metodo estatico getInstance()
    constructor() {
        //garantizar que NO se crearan configuraciones 
        //adicionales si ya existe una instancia
        if (!FirebaseConfig.instance) {
            
            //determinar configuracion inical de app de 
            //acuerdo a emulacion si existe
            if (this._isFunctionEmulator) {
    
                if (this._isFirestoreEmulator) {
                    //emular conexion como si fuera a servidor oficial
                    this.app = admin.initializeApp();
                }else{
                    this.app = admin.initializeApp({
                        //estas credenciales se deben usar cuando se desea probar cloud 
                        //functions de manera local pero con conexion a la base de datos 
                        //en el servidor de firestore
                        credential: admin.credential.cert(require( "../../../prueba1-87d2f-firebase-adminsdk-byfgp-89fbc2979a.json")),
                        databaseURL: "https://prueba1-87d2f.firebaseio.com"
                    });
                }
                
            }else{
                //se deduce que si no esta activado el emulador de 
                //cloudfunctions es porque se esta ejecutando desde 
                //el servidor oficial de firebase, por lo tanto la 
                //conexion se debe hacer directamente a la bd de 
                //firestore oficial
                this.app = admin.initializeApp();
            }


            //cargar configuracion del api de FIrestore
            this.app_FS = this.app.firestore();
        }
    }

    /*getInstance()*/
    //obtener una instancia UNICA (singleton)
    public static getInstance():FirebaseConfig{
        if (!FirebaseConfig.instance) {
            FirebaseConfig.instance = new FirebaseConfig();
        }
        return FirebaseConfig.instance;
    }
        

}
