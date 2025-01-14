


const ErrorResponse = (statusCode, message) => {
    return {
        success: false,
        statusCode,
        error: message,
    };
};

const SuccessResponse = (statusCode, message, data = null) => {
    return {
        success: true,
        statusCode,
        message,
        data,
    };
}


module.exports = {
    ErrorResponse,
    SuccessResponse,
};