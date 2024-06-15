module.exports.CustomErrorClass=class CustomError extends Error{
    constructor(ErrorMsg,statusCode){
        super(ErrorMsg)
        this.statusCode=statusCode
        this.status=(statusCode>=400&&statusCode<=500)?'fail':"error"
        this.isOperational=true
        Error.captureStackTrace(this, this.constructor)
    }
}
