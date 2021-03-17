var axios = require('axios');
var FormData = require('form-data');
var qs = require('qs')
var fs = require('fs')
var path = require('path')


const encodedclientid = "YkdKcThpeXlWUzlYTUliQnB0YXFad0pZV2JrWWVFT252NnIzU2Z3VDpJVWxXYkF0NXN1bjE1RElDYWJBTXl4dk9EQjdTSTF5aTNBeThmZjl1d01MSHZDSG9oaVZnb24yWHBUcWdGZ1AyQU52TzVHSHk1VENjdzZYN01kamVzckFwYnhpSDZqWGJiTXpoZGdJdVBRMFlHRzlkNGhpQlVibFBSd3VaMFU5Wgo="
const code = "W0e20Yrn6gcOEWIHfMcWavlfeAlPdO"


const getAccessToken= (code,encodedClientId,callback)=>{

    var data = {
        "grant_type":"authorization_code",
        "scope": "printing",
        "code": code
    }
    
    
    var config = {
      method: 'post',
      url: 'https://account.ezeep.com/oauth/access_token/',
      headers: { 
        'Authorization': `Basic ${encodedClientId}`, 
        "Content-Type":'application/x-www-form-urlencoded',
        "Host":"account.ezeep.com"
      },
      data : qs.stringify(data)
    };
    
    axios(config)
    .then( (response)=> {
        callback(response)
      
    })
    .catch((error)=> {
      callback(error)
    });


}

getAccessToken(code,encodedclientid,(accesstoken)=>{

  console.log(accesstoken)

})