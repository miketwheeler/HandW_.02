require("dotenv").config()

const axios = require("axios");

exports.handler = async function(event, context) {
    if(!event.httpMethod === 'POST'){
        return { statusCode: 405, body: 'Method Not Allowed', headers: { 'Allow': 'POST' } }
    }

    const parsedTemplateData = JSON.parse(event.body);
    const token = parsedTemplateData.tokeStamp.toke;
    const timestamp = parsedTemplateData.tokeStamp.stamp;
    const assembledData = JSON.stringify({
        "service_id": process.env.NEXT_PUBLIC_EJS_SID,
        "template_id": process.env.NEXT_PUBLIC_EJS_TID,
        "user_id": process.env.NEXT_PUBLIC_EJS_UID,
        "template_params": parsedTemplateData.templateData,
        "accessToken": process.env.NEXT_PUBLIC_KORAK
    });
    const config = { 
        method: 'post',
        // url: process.env.NEXT_PUBLIC_EJSURL,
        url: process.env.NEXT_PUBLIC_KORURL,
        headers: {
            token,
            timestamp,
            'x-api-key': process.env.NEXT_PUBLIC_KORXAPIK,
            'authorization': process.env.NEXT_PUBLIC_KORAK,
            'content-type': 'application/json',
        },
        data: assembledData
    }

    return axios(config)
    .then((response) => { 
        return { statusCode: 200, body: response.data ? JSON.stringify(response.data) : "no-response-data-given" }
    })
    .catch((error) => {
        console.log(error);
        return { statusCode: 422, body: `Error: ${error ? error : "no error data given"}`}
    })
    
}
