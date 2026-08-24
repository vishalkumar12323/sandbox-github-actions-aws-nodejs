

export default function handler() {
    const VERSION = process.env.VERSION;
    const response = {
        msg: "Hello From AWS Lambda!",
        version: VERSION,
        node_version: 20,
        timestamp: new Date().toISOString()
    }

    return {
        statusCode: 200,
        body: JSON.stringify(response),
    };
};