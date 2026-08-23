exports.handler = async () => {
    const VERSION = process.env.VERSION;
    return {
        statusCode: 200,
        body: JSON.stringify({
            msg: "Hello World ",
            version: VERSION,
            timestamp: new Date().toISOString()
        })
    };
};