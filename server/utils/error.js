class ErrorHandler extends Error {
    constructor(statusCode, message) {
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
}

const handleError = (err, res) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "An unexpected error happened on the server";
    const uiMessage = "An unexpected error happened on the server";

    console.error('\nEM-ERROR: ' + message + '\n');

    res.status(statusCode).json({
        status: "error",
        statusCode,
        uiMessage
    });
};

module.exports = {
    ErrorHandler,
    handleError
};