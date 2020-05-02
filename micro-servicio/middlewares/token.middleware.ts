import {Request,Response,NextFunction} from 'express'
import jwt from 'jsonwebtoken';
import {APIUtils,ApiStatusEnum} from '../utils/appi.utils';



export default(CONFIG:any)=>{
    const apiUtils=APIUtils(CONFIG);
    return {
        varify:(req:Request,res:Response,next:NextFunction)=>{
            const beareHeader=req.headers['authorization'];
            if(typeof beareHeader !== 'undefined'){
                const bearer = beareHeader.split(' ');
                const bearerToken=bearer[1];
                jwt.verify(bearerToken,CONFIG.TOKEN.SECRET_KEY,(err:any,tokenDecoded:any)=>{
                    if(err){
                        return res.status(ApiStatusEnum.Forbidden).json(
                            apiUtils.BodyResponse(
                                ApiStatusEnum.Forbidden,
                                //Descripcion
                                'Acceso Prhoibido al verificar el Token (Middleware TOKENs)',
                                //Mensaje
                                'El Token Proporcionado , no es un token Valido . Favor de Verificar',
                                //result
                                {},
                                err,
                                //Notificacion
                                
                            )
                        )
                    }
                    req.body.authUser=tokenDecoded;
                    next();
                });
            }else{
                // Unautorized
                return res.status(ApiStatusEnum.Unauthorized).json(
                    apiUtils.BodyResponse(
                        ApiStatusEnum.Unauthorized,
                        //Descripcion
                        'Acceso No autorizado(Middleware TOKENs)',
                        //Mensaje
                        'Necesita proporcionar un Token',
                        //result
                        {},
                        {},
                        //Notificacio
                    )
                )
            }
        }
    }
}