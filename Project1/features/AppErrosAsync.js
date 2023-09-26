// Esta funcao sera responsavel pela captura dos erros das funcoes assicronas 
// Com isto nao sera preciso usar o try and catch block

module.exports = catchAsyncErro => {

    return (req,res,next)=>{
     catchAsyncErro(req,res,next).catch(erro=> next(erro));
   
    }
}