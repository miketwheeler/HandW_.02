// import Cors from 'cors'

require('dotenv').config()

// const cors = Cors({
//     methods: ['GET', 'POST', 'HEAD'],
// })

const {
    EMAIL_JS_SERVICE_ID, 
    EMAIL_JS_TEMPLATE_ID, 
    EMAIL_JS_USER_ID, 
    EMAIL_JS_ACCESS_TOKEN
} = process.env;

const axios = require('axios');


function runMiddleware(req, res, fn) {
    return new Promise((resolve, reject) => {
        fn(req, res, (result) => {
            if(result instanceof Error) {
                return reject(result);
            }
            return resolve(result);
        })
    })
}


// exports.handler = async (event, context, callback) => {
//     console.log(event.body)
//     // await runMiddleware(event, context, cors);

//     if(!event.httpMethod === 'POST') {
//         return ({ 
//             statusCode: 405, 
//             body: 'Method Not Allowed', 
//             headers: { 
//                 'Allow': 'POST' 
//             } 
//         })
//     }

//     const emailjsData = {
//         service_id: EMAIL_JS_SERVICE_ID,
//         template_id: EMAIL_JS_TEMPLATE_ID,
//         user_id: EMAIL_JS_USER_ID,
//         template_params: JSON.parse(event.body),
//         accessToken: EMAIL_JS_ACCESS_TOKEN,
//     }

//     return (
//         axios.post('https://api.emailjs.com/api/v1.0/email/send', {
//             method: 'POST',
//             data: JSON.stringify(emailjsData),
//             contentType: 'application/json'
//         })
//         .then((response) => (console.log(response)))
//         .catch(error => ({ statusCode: 422, body: `Error: ${error}` }))
//         // console.log(emailjsData)
//     )
// }

exports.handler = async function(event, context, callback) {
    console.log(event.body)
    // parse the data received
    const body = JSON.parse(event.body);
    await runMiddleware(event, context, cors);

    // transport
    let transcript = {
        service_id: EMAIL_JS_SERVICE_ID,
        template_id: EMAIL_JS_TEMPLATE_ID,
        user_id: EMAIL_JS_USER_ID,
        template_params: body,
        accessToken: EMAIL_JS_ACCESS_TOKEN,
    }

    try {
        axios.post('https://api.emailjs.com/api/v1.0/email/send', {
                method: 'POST',
                data: transcript,
                contentType: 'application/json'
            })
            .then(response => callback(response))
            .catch(error => callback(error))
        }
    catch (error) {
        callback(error);
    }
}
