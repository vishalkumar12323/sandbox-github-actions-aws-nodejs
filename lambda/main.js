exports.handler = async () => {
    const VERSION = process.env.VERSION;
    return {
        statusCode: 200,
        body: JSON.stringify({
            msg: "Hello From AWS Lambda!",
            version: VERSION,
            timestamp: new Date().toISOString()
        })
    };
};