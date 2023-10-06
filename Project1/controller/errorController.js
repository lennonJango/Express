const AppError = require("../features/AppError");

/*
 Esta funcao é responsavel por lidar com os erros de validacao na base de dados
*/

const handleCastErrorDb = err =>{
  const message = `Invalid ${err.path} : ${err.value}`;
  return new AppError(message,400);
}

/*
    Esta funcao é responsavel por lidar com os erros de duplicacao na base de dados   
*/

const handleDuplicateErrorDB = err =>{


    //    console.log(err.keyValue)
    // const value = err.errmsg.match(/(["'])(\\?.)*?\1/)
   const messagem =`N foi possivel fazer  criacao de um recurso "${err.keyValue.name}",porque já existi,tente criar outro`;
   return new AppError(messagem,400);
} 

/*
  Esta funcao lida com erros de validacao da base de dados 
*/

const handleValidationErrorDb = err =>{

  const {errors,obj} = {err}
    console.log("........")
    const {error} = {...errors}
   console.log(error)
  // const mensagem = `Campo ${err.properties.path} tem o valor ${err. properties.name} invalido,tente novamento`
  return new AppError("Tente novamente",400);
}
  
const sendErroDev = (err,res)=>{
  res.status(err.statusCode).json({
    status:err.status,
    message: err.message,
    stack:err.stack
   //  ERRO:"N conseguimos localizar o recurso"
 })
}

const sendErroProduction = (err,res)=>{

  // Erro operacional 
  if(err.isOperational){
  res.status(err.statusCode).json({
    status:err.status,
    message: err.message,
    // stack:err.stack
   //  ERRO:"N conseguimos localizar o recurso"
   })
}else{

  // Erro desconhecido

  // Para o desenvolvedor saber do erro
    console.error(err);

    // Mandado a messagem generica 
    res.status(500).json({
        status:"Erro",
        message:"Algo deu errado tente novamente"
    })
 }
}


// Error handling
module.exports = ((err,req,res,next)=>{

    err.statusCode = err.statusCode || 500; 
    err.status = err.status || "error";

    // Mandado erros para parte do desenvolvimento e em producao 

    if(process.env.NODE_ENV==="Development"){

      sendErroDev(err,res)
      
        
    }else if(process.env.NODE_ENV==="Production"){

         let error  = {...err};

        if(err.name ==="CastError"){
          error = handleCastErrorDb(error);
        };

        if(err.code===11000){
          error = handleDuplicateErrorDB(error)
        }

        if(err._message==="Tour validation failed"){
          console.log(err);
          error = handleValidationErrorDb(error);
        }

       sendErroProduction(error,res);
    }
  
   

})