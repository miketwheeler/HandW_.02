require('dotenv').config()

const axios = require('axios');

exports.handler = async function(event, context) {
    if(!event.httpMethod === 'POST'){
        return { statusCode: 405, body: 'Method Not Allowed', headers: { 'Allow': 'POST' } }
    }

    let responseStatusCode;
    const parsedTemplateData = JSON.parse(event.body);
    const assembledData = JSON.stringify({
        "service_id": `${process.env.NEXT_PUBLIC_EJS_SID}`,
        "template_id": `${process.env.NEXT_PUBLIC_EJS_TID}`,
        "user_id": `${process.env.NEXT_PUBLIC_EJS_UID}`,
        "template_params": parsedTemplateData,
        "accessToken": `${process.env.NEXT_PUBLIC_KORAK}`
    });
    const config = { 
        method: 'post',
        url: `${process.env.NEXT_PUBLIC_EJSURL}`,
        headers: {
            'authorization': `${process.env.NEXT_PUBLIC_KORAK}`,
            'content-type': 'application/json',
        },
        data: assembledData
    }

    await axios(config)
    .then(function (response) {
        responseStatusCode = 200;
    })
    .catch(function (error) {
        if(error.response)
            responseStatusCode = 433;
    })
    
    console.log("responseStatusCode: ", responseStatusCode)
    return {
        statusCode: responseStatusCode ? responseStatusCode : 500,
    }
}
