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

    let responseStatusCode = 0;
    let responseMessage = '';
    const parsedTemplateData = JSON.parse(event.body);
    // const token = parsedTemplateData.tokeStamp.toke;
    // const timestamp = parsedTemplateData.tokeStamp.stamp;
    const assembledData = JSON.stringify({
            "service_id": ejssid,
            "template_id": ejstid,
            "user_id": ejsuid,
            "template_params": parsedTemplateData.templateData,
            "accessToken": korak
    });
    const config = { 
        method: 'post',
        url: korurl,
        headers: {
            // token,
            // timestamp,
            'x-api-key': korxapik,
            'authorization': korak,
            'content-type': 'application/json',
        },
        data: assembledData
    }

    await axios(config)
    .then(function (res) {
        // console.log(JSON.stringify(res.data));
        responseStatusCode = res.status;
        responseMessage = res.statusText;
    })
    .catch(function (error) {
        console.log(error);
        responseStatusCode = error.status;
        responseMessage = error.statusText;
    })
    
    return {
        statusCode: 200,
        body: JSON.stringify({message: `${responseMessage}`}),
    }
}
