require('dotenv').config()


const { NEXT_PUBLIC_EJSU, NEXT_PUBLIC_EJS_SID, NEXT_PUBLIC_EJS_TID, NEXT_PUBLIC_EJS_UID, NEXT_PUBLIC_EJS_AT } = process.env;
const axios = require('axios');
// const urlSend = 'https://api.emailjs.com/api/v1.0/email/send';

exports.handler = async function(event, context) {
    if(!event.httpMethod === 'POST'){
        return { statusCode: 405, body: 'Method Not Allowed', headers: { 'Allow': 'POST' } }
    }

    let responseStatusCode = 0;
    let responseMessage = '';

    const parsedTemplateData = JSON.parse(event.body);

    let options = { 
        method: 'POST',
        url: NEXT_PUBLIC_EJSU,
        headers: {
        'content-type': 'application/json',
        'Accept': 'application/json',
        },
        data: {
            accessToken: NEXT_PUBLIC_EJS_AT,
            service_id: NEXT_PUBLIC_EJS_SID,
            template_id: NEXT_PUBLIC_EJS_TID,
            template_params: parsedTemplateData,
            user_id: NEXT_PUBLIC_EJS_UID,
        }
    }
    
    // await axios.request(options)
    // axios.request(options)
    // .then(function(res) {
    //     console.log(res.data);
    //     responseStatusCode = res.statusCode;
    //     responseMessage = res.message;
    // })
    // .catch(function(error) {
    //     console.log(error);
    //     responseStatusCode = error.statusCode;
    //     responseMessage = error.message;
    // })
    console.log('send-email ')

    return {
        statusCode: 200,
        body: JSON.stringify({message: 'success'})
        // statusCode: responseStatusCode,
        // body: JSON.stringify({message: `${responseMessage}`}),
    }
}