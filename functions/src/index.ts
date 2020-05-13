import * as functions from 'firebase-functions';
import admin = require('firebase-admin');

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//Oficialmente se ejecuta la siguiente peticion get:
// http://localhost:5001/prueba1-87d2f/us-central1/helloWorld
//

//================================================================
//Inicializar instancias de BD Firestore (obligatorio 
//para acceder globalmente a la bd)
const app = admin.initializeApp();
const FS = app.firestore();

//================================================================

export const helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});

//test:
export const holaMag = functions.https.onRequest(async (request, response) => {

    const data = await FS.collection("").limit(1).get();
    data.forEach();
    response.send(`hola Mag tu usuarios es: ${r}`);
   });
