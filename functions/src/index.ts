import * as functions from 'firebase-functions';

import * as admin from 'firebase-admin'

//import {Producto, IProducto} from '../../mi-web-Angular/src/app/models/firebase/producto/producto';
//import {Producto_Meta} from '../../mi-web-Angular/src/app/services/firebase/producto/producto_Meta';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//Oficialmente se ejecuta la siguiente peticion get:
// http://localhost:5001/prueba1-87d2f/us-central1/helloWorld
//

//================================================================
//Inicializar instancias de BD Firestore (obligatorio 
//para acceder globalmente a la bd)

const app = admin.initializeApp({
    //estas credenciales se deben usar cuando se desea probar cloud 
    //functions de manera local pero con conexion a la base de datos 
    //en el servidor de firestore
    credential: admin.credential.cert(require( "../../prueba1-87d2f-firebase-adminsdk-byfgp-89fbc2979a.json")),
    databaseURL: "https://prueba1-87d2f.firebaseio.com"
});
const FS = app.firestore();

//================================================================

export const helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});

//test:
export const holaMag = functions.https.onRequest(async (request, response) => {

    //const meta = new Producto_Meta();
    const nomCol = "Productos";

    //FS.collection(nomCol).doc().set({nombre:"mercedez"}, {merge: true})

    const data = await FS.collection(nomCol).limit(10).get();    
    let d1:any[] = [];
    data.forEach((doc) => {
        d1.push(doc.data());
    });
    response.send(d1);
   });
