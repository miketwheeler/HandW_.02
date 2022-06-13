require('dotenv').config()

const axios = require('axios');

exports.handler = async function(event, context) {
    if(!event.httpMethod === 'POST'){
        return { statusCode: 405, body: 'Method Not Allowed', headers: { 'Allow': 'POST' } }
    }

    let responseStatusCode;
    const parsedTemplateData = JSON.parse(event.body);
    const assembledData = JSON.stringify({
            "service_id": process.env.NEXT_PUBLIC_EJS_SID,
            "template_id": process.env.NEXT_PUBLIC_EJS_TID,
            "user_id": process.env.NEXT_PUBLIC_EJS_UID,
            "template_params": parsedTemplateData,
            "accessToken": process.env.NEXT_PUBLIC_KORAK
    });
    const config = { 
        method: 'post',
        // url: process.env.NEXT_PUBLIC_KORURL,
        url: process.env.NEXT_PUBLIC_EJSURL,
        headers: {
            // 'x-api-key': process.env.NEXT_PUBLIC_KORXAPIK,
            'authorization': process.env.NEXT_PUBLIC_KORAK,
            'content-type': 'application/json',
        },
        data: assembledData
    }

    await axios(config)
    .then(function (response) {
        responseStatusCode = response.status;
    })
    .catch(function (error) {
        // console.log(error);
        if(error.response)
            responseStatusCode = error.response.status;
    })
    
    console.log("responseStatusCode: ", responseStatusCode)
    return {
        statusCode: responseStatusCode ? responseStatusCode : 500,
    }
}
