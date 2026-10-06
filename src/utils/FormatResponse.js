exports.successResponse = (result,message="success",data=null,statusCode=200) => {
    return result.status(statusCode).json({
        success: true, message, data,
    });
}

exports.errorResponse = (result, message = "Internal server error",statusCode = 500) => {
    return result.status(statusCode).json({
        success:false, message
    });
}