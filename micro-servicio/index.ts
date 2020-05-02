// Express imports
import Express from 'express';  // servidor web
import {Request,Response} from 'express';
//debug and color imports
import {DEBUG,COLOR} from './utils/debug';
//API import UTILs

import {APIUtils, ApiStatusEnum} from './utils/appi.utils';

// JsonWebTokens import 
import jwt from 'jsonwebtoken'
// Acceder a las variables de Entorno
import ENV from './environments/env.production'
//JSON Web Token Middelware 
//import AuthToken
import AuthToken from './middlewares/token.middleware';
// MONGO DB Helper import
import MongoDBHelper from './helpers/mongodb.helper'
import MongoDBClient  from 'mongodb';
var cors = require('cors')

const token= AuthToken(ENV);




const debug=DEBUG();
const color=COLOR();
const app=Express();
const apiUtils=APIUtils(ENV);
const mongodb=MongoDBHelper.getInstance(ENV)

app.use(Express.urlencoded({extended:true}));
app.use(Express.json());
app.use(cors());


//app.get('/products',midelware,,,,,(req:Request,res:Response)=>{
//app.get('/products',token.varify ,async (req:Request,res:Response)=>{
app.get('/products',async (req:Request,res:Response)=>{
    
   
    const productos= await mongodb.db.collection('cars').find({}).toArray();
    console.log("API-PRODUCTOS",productos);
    

    res.status(200).json(productos);
    });



app.get('/products/:codigo',async (req:Request,res:Response)=>{
    
   
    const {codigo} = req.params;
    const filtro = {codigo:{$eq:codigo}};
    const productos= await mongodb.db.collection('cars').findOne(filtro);
    res.status(200).json(
        apiUtils.BodyResponse(ApiStatusEnum.Success, 'Ok', 'La solicitud ha tenido éxito' + codigo, {productos})
    );
});




    // parametro el puerto
app.listen(ENV.API.PORT,async()=>{
    try{
        await mongodb.connect();//conectando con MDB
    }catch(error){
        process.exit();
    }
    
    debug.express(`El servidor de ${color.express("Express")} el servidor express se ${color.warnig("correcto")} inicio correctamente ${color.info(ENV.API.PORT)}`);

});

