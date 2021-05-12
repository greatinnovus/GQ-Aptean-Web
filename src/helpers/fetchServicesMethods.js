import { environment } from '../config';
import axios from 'axios';
import loginError from '../tests/login-error.txt';
import loginSuccess from '../tests/login-success.txt';
import seqSearchInit from '../tests/seqSearchInit.txt';
import seqSearchInitRedo from '../tests/seqSearchInit-redo.txt';
let baseUrl = process.env.REACT_APP_API_URL;

// import { Auth } from "../helpers/Auth";
// import { environment } from "../helpers/config";
// import PubSub from 'pubsub-js';
// export const fetchServicesMethods = {};
// fetchServicesMethods.get = get;
// fetchServicesMethods.post = post;
// fetchServicesMethods.delete = remove;
// let token =  Auth.token();
// Post Method
// let token = localStorage.getItem('token');
// function get(url){
// PubSub.publish('msg', true);
//  const requestOptions = { 
//      headers: { 
//           'type':'web',
//           'Content-Type': 'application/json',
//           'Authorization': 'Bearer '+token
//      },
//      method: 'GET', 
// }; 
// return fetch(environment.baseUrl+url, requestOptions)
//  .then(handleResponse);
// }
// // Post Method
// function post(url , data){
//     PubSub.publish('msg', true);
//     const requestOptions = { 
//         headers: { 
//             'type':'web',
//              'Authorization': 'Bearer '+token, 
//         },
//         method: 'POST', 
//         body: data
//    }; 
//     return fetch(environment.baseUrl+url, requestOptions)
//     .then(handleResponse)
// }
// // Delete Method
// function remove(url){
//     const requestOptions = { 
//         headers: { 
//             'type':'web',
//             'Content-Type': 'application/json',
//             'Authorization': 'Bearer '+token, 
//         },
//         method: 'DELETE', 
//    }; 
//     return fetch(url, requestOptions)
//     .then(response => response.json())
// }
function handleResponse(response) {
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
    return response.text().then(text => {
     const   data= text && JSON.parse(text);
    if (!response.ok) {
    if (response.status === 401) {
    // logout();
    }
    if(response.status === 503){
    // history.push('/maintenanceMode')
    }
    const error = data;
    // PubSub.publish('msg', false);
    return Promise.reject(error);
    }
    // PubSub.publish('msg', false);
    return data;
    });
}
    }

export function post(url, data) {
    if (window.location.hostname == 'localhost') {
        let file;
        if (url.includes('gquser.login')) {
            file = loginSuccess;
        } else if (url.includes('gqft.launch_seq_search')) {
            file = seqSearchInit;
        }
        return fetch(file).then(r => r.text())
            .then(text => {
                console.log('text decoded:', text);
                return JSON.parse(text);
            });
    } else {
        return fetch(baseUrl + url, {
            method: 'post',
            headers: {
                //'Content-Type': 'application/json; charset=utf-8;application/x-www-form-urlencoded',
                //'Access-Control-Allow-Origin': '*',
                'Accept': 'application/x-www-form-urlencoded'
            },
            // body: obj
            body: JSON.stringify(data)
        })
            .then(handleResponse);
    }
    
        // .then(json)
        // .then(function (data) {
        //     console.log('Request succeeded with JSON response', data);
        //     return data;
        // })
        // .catch(function (error) {
        //     console.log('Request failed', error);
        // });
}


// export function get(url, data) {
//     return fetch(baseUrl+url, {
//         method: 'get',
//         headers: {
//             'Content-Type': 'application/json',
//             // 'Access-Control-Allow-Origin': '*',
//             // 'accept': '*/*'      
//         },
//         // body: obj
//         body: JSON.stringify(data)
//     })
//     .then(handleResponse);
// }

// axios get
 export function get(url, data) {
    try {
       return axios.get(baseUrl+url).then(resp =>{
            console.log('response.data',resp);
            return resp
        });
        // return response;
      } catch (error) {
        console.error(error);
      }
//     axios.get(baseUrl+url)
//   .then(handleResponse)
//   .catch(function (error) {
//     // handle error
//     console.log(error);
//   })


}
