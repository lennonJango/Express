// Erro classe
// Esta é a classe que ira lidar com todos os erros
class AppError extends Error {
  constructor(message, statusCode) {
    // N foi preciso o this.message porque o super(message) ja referencia a propria mensagem passada no argumento
    super(message);

    this.statusCode = statusCode;
    this.status = `${this.statusCode}`.startsWith("4") ? "Fail" : "Error";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
