var axios = require('axios');

var qs = require('qs')



const encodedclientid = "enteryour encoded id here"
const code = "<auth code here>"


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
