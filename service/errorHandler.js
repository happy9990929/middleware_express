const resErrorProd = (err, res) => {
  if(err.isOperational) {
    res.status(err.statusCode).json({
      message: err.message
    })
  } else {
    console.error('出現重大錯誤', err);
    // 送出罐頭預設訊息
    res.status(500).json({
      status: 'error',
      message: '系統錯誤，請洽系統管理員'
    })
  }
}

// 開發環境錯誤
const resErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    message: err.message,
    err: err,
    stack: err.stack
  })
}

const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  if(process.env.NODE_ENV=== 'dev') {
    return resErrorDev(err, res)
  }

  if(err.name === 'ValidationError') {
    err.message = '資料欄位未填寫正確，請重新輸入';
    err.isOperational = true;
    return resErrorProd(err, res);
  }

  resErrorProd(err, res);
}

module.exports = errorHandler;