
exports.handler = async () => {
    return {
        statusCode: 200,
        body: JSON.stringify({
            msg: "Hello World!",
            version: "1.0.0",
            timestamp: new Date().toISOString()
        })
    };
};