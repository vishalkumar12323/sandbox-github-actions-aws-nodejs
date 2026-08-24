exports.handler = async () => {
    const VERSION = process.env.VERSION;
    return {
        statusCode: 200,
        body: JSON.stringify({
            msg: "Hello From AWS Lambda!",
            version: VERSION,
            node_version: 20,
            timestamp: new Date().toISOString()
        })
    };
};