// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//Oficialmente se ejecuta la siguiente peticion get:
// http://localhost:5001/prueba1-87d2f/us-central1/helloWorld

import * as functions from 'firebase-functions';

import { FirebaseConfig } from "./fn-modules/firebase-config";
import { FnResponseController } from './fn-modules/fn-response-ctrl';
import { cors } from "cors";

cors({
    origin : true
})
//================================================================

export const helloWorld = functions.https.onRequest((request, response) => {
    //configuracion para evitar errores de permisos de CORS
    response.set('Access-Control-Allow-Origin', "*");
    response.set('Access-Control-Allow-Methods', 'GET, POST');

    response.send("Hello from Firebase!");
});

//test:
export const holaMag = functions.https.onRequest(async (request, response) => {

    const FB = FirebaseConfig.getInstance();
    const app_FS = FB.app_FS;
    const nomCol = "Productos";

    //FS.collection(nomCol).doc().set({nombre:"mercedez"}, {merge: true})

    const data = await app_FS.collection(nomCol).limit(10).get();
    let d1: any[] = [];
    data.forEach((doc) => {
        d1.push(doc.data());
    });
    response.send(d1);
});

export const FnProductoMeta = functions.https.onRequest((request, response) => {
    
    const ModelMetaCtrl = new FnResponseController(request);
    ModelMetaCtrl.getModelMetaResult()
    .then((ModelMetaResult)=>{
        if (ModelMetaResult && ModelMetaResult != null) {
            response.send(ModelMetaResult);
        }else{
            response.status(404).send(null);
        }
    })
});
