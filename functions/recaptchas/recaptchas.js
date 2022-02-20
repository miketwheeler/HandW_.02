require('dotenv').config()

const { NEXT_PUBLIC_GRU, NEXT_PUBLIC_RCSK } = process.env;

const axios = require('axios');

exports.handler = async function(event, context) {
    if(!event.httpMethod === 'POST' || !event.body){
        return { statusCode: 405, body: 'Method Not Allowed', headers: { 'Allow': 'POST' } }
    }

    let responseStatusCode = 0;
    let responseData = '';
    const { token } = JSON.parse(event.body);
    const heads = { headers: {'content-type': 'application/x-www-form-urlencoded; charset=utf-8',}}
    
    await axios.post(`${NEXT_PUBLIC_GRU}?secret=${NEXT_PUBLIC_RCSK}&response=${token}`, undefined, heads)
    .then(function(res) {
        responseStatusCode = res.status;
        responseData = res.data;
    })
    .catch(function(error) {
        console.log(error);
        responseStatusCode = error.statusCode;
        responseData = error.message;
    })

    return {
        statusCode: responseStatusCode ? responseStatusCode : 200,
        body: JSON.stringify(responseData),
    }
}