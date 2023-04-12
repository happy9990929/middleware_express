const appError = (httpStatus,errMessage,next)=>{
  const error = new Error(errMessage);
  error.statusCode = httpStatus;
  error.isOperational = true; // 可預期的
  return error;
}

module.exports = appError;