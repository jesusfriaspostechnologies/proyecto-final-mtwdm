import {MongoClient} from 'mongodb';
import {DEBUG,COLOR} from '../utils/debug'

const debug=DEBUG();
const color=COLOR();

export default class MongoDB{
    public db:any;

    private cnn:any;
    private port : number;
    private dbUri: string;
    private static _instance:MongoDB;

    constructor(CONFIG:any){
        this.port=CONFIG.MONGODB.PORT;
        if(CONFIG.MONGODB.USER_NAME != ''){
            this.dbUri=`mongodb://${CONFIG.MONGODB.USER_NAME}:${CONFIG.MONGODB.USER_PASSWORD}@${CONFIG.MONGODB.HOST}:${CONFIG.MONGODB.PORT}/${CONFIG.MONGODB.DEFAULT_DATABASE}`;
        }else{
            this.dbUri=`mongodb://${CONFIG.MONGODB.HOST}:${CONFIG.MONGODB.PORT}/${CONFIG.MONGODB.DEFAULT_DATABASE}`;
        }
    }

    /**  patron sigleton */
    public static getInstance(CONFIG:any){
        return this._instance || (this._instance=new this(CONFIG));
    }

    async connect(){
        console.log(this.dbUri);
        
        await MongoClient.connect(this.dbUri,{useNewUrlParser:true,useUnifiedTopology:true})
        .then((connection)=>{
            console.log('Conectado a mongoDB');
            debug.mongoDB(`El servidor de ${color.mongoDB("MongoDB")} el servidor express se ${color.warnig("correcto")} inicio correctamente ${color.info(this.port)}`);
            this.cnn=connection;
            this.db=this.cnn.db();
        })
        .catch((error)=>{
            console.log("Ocurrio un  Error al intentar conectarse a Mongo DB",error);
            
        })
    }

    setDataBase(dbName:string){
        this.db=this.cnn.db(dbName);
    }
}