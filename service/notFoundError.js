const notFound = (req, res, next) => {
  res.status(404).json({
    status:"false",
    message:"您的路由不存在"
})
}

module.exports = notFound;