function errorHandler(err, req, res, next){
    let statusCode, errorMessage, errorCode;
    errorCode = err.name;
    console.log(err);
    switch(err.name){
        case 'TokenNotFound':
            statusCode = 404;
            errorMessage = 'Token not found';
            break;
        case 'UserNotFound':
            statusCode = 404;
            errorMessage = 'User not found';
            break;
        case 'DataNotFound':
            statusCode = 404;
            errorMessage = 'Data not found';
            break;
        case 'Unauthorized':
            statusCode = 403;
            errorMessage = 'Not Authorized to do this';
            break;
        case 'SequelizeValidationError':
            const validationErrors = [];
            err.errors.forEach(el => {
                validationErrors.push(el.message);
            });
            // console.log(validationErrors);
            statusCode = 400;
            errorMessage = validationErrors;
            break;
        case 'WrongPassword':
            statusCode = 400;
            errorMessage = 'Wrong Password';
            break;
        case 'StockNotEnough':
            statusCode = 400;
            errorMessage = 'Product stock is not enough';
            break;
        case 'UserExist':
            statusCode = 409;
            errorMessage = 'User already exists';
            break;
        default:
            statusCode = 500;
            errorMessage = err;
            console.log(err);
    }
    res.status(statusCode).json({ errorCode, message: errorMessage });
}
module.exports = errorHandler;