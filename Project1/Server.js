const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({
  path: "./../config.env",
});


// Global expection controller
/*
  Controla o processos de erro para que a aplicacao nao cair 
*/
process.on("uncaughtException",err=>{
      console.log("UncaughtException dectected");
      console.log(err)
      process.exit(1)
})

const uri = process.env.database.replace("<password>", process.env.password);

const db = mongoose
  .connect(`${uri}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((connection) => {
    console.log("A conexão foi feita com sucesso");
  })
  

  
const Servidor =app.listen(process.env.porta, () => {
  console.log(`Servidor is running on port ${process.env.PORTA}`);
});

// GLobal handling   unhandlerejectios erro 

process.on("unhandledRejection",err=>{
  console.log("UnhandleRejaction dectected ")
   console.log(err.name,err.message)
  //  Para fechar a aplicacao por conta do erro
   Servidor.close(()=>{
    process.exit(1);

   })
})











  


 







 



        




    

  



