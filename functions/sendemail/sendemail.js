require('dotenv').config()

const axios = require('axios');

const korurl = process.env.NEXT_PUBLIC_KORURL;
const korak = process.env.NEXT_PUBLIC_KORAK;
const korxapik = process.env.NEXT_PUBLIC_KORXAPIK;
const ejssid = process.env.NEXT_PUBLIC_EJS_SID;
const ejstid = process.env.NEXT_PUBLIC_EJS_TID;
const ejsuid = process.env.NEXT_PUBLIC_EJS_UID;


exports.handler = async function(event, context) {
    if(!event.httpMethod === 'POST'){
        return { statusCode: 405, body: 'Method Not Allowed', headers: { 'Allow': 'POST' } }
    }

    let responseStatusCode;
    // let responseMessage;
    const parsedTemplateData = JSON.parse(event.body);
    const assembledData = JSON.stringify({
            "service_id": ejssid,
            "template_id": ejstid,
            "user_id": ejsuid,
            "template_params": parsedTemplateData,
            "accessToken": korak
    });
    const config = { 
        method: 'post',
        url: korurl,
        headers: {
            'x-api-key': korxapik,
            'authorization': korak,
            'content-type': 'application/json',
        },
        data: assembledData
    }

    await axios(config)
    .then(function (response) {
        responseStatusCode = response.status;
        // responseMessage = response.statusText;
    })
    .catch(function (error) {
        console.log(error);
        if(error.response)
            responseStatusCode = error.response.status;
            // responseMessage = error.response.statusText;
    })
    
    console.log("responseStatusCode: ", responseStatusCode)
    // console.log('responseMessage: ', responseMessage)
    return {
        statusCode: responseStatusCode ? responseStatusCode : 500,
        // body: responseMessage
    }
}
