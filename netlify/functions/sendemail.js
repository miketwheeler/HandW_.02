require("dotenv").config()

const axios = require("axios");

exports.handler = async function(event, context) {
    if(!event.httpMethod === 'POST'){
        return { statusCode: 405, body: 'Method Not Allowed', headers: { 'Allow': 'POST' } }
    }

    let responseStatusCode = 444;
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
        url: process.env.NEXT_PUBLIC_EJSURL,
        headers: {
            'authorization': process.env.NEXT_PUBLIC_KORAK,
            'content-type': 'application/json',
        },
        data: assembledData
    }

    // await axios(config)
    // .then((response) => {
    //     console.log("response:: ", response.statusCode)
    //     // responseStatusCode = response.status;
    //     responseStatusCode = response.statusCode || 200;
    // })
    // .catch((error) => {
    //     console.log("func-error:: ", error)
    //     if(error)
    //         responseStatusCode = error.statusCode || 500;
    // })

    return axios(config)
    .then((response) => { 
        return { statusCode: 200, body: response.data ? JSON.stringify(response.data) : "no-response-data-given" }
    })
    .catch((error) => {
        console.log(error);
        return { statusCode: 422, body: `Error: ${error ? error : "no error data given"}`}
    })
    
}
