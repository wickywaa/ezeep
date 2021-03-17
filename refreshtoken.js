var axios = require('axios');
var FormData = require('form-data');
var qs = require('qs')

const encodedID = 'UkhFWlJmN2FmUUJsSlo2QnpTelE3SkhJWFZ3T2J2ckpHWVZuSnh0MAoKOg=='

const code  = '8PUWoX8ltuTF8e8XfSCy4I80tl7jlg'


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


const getRefreshtoken =(token,encodedid,callback)=>{

    var data = {

        "grant_type":"refresh_token",
        "scope":"printing",
        "refresh_token": token

    }

    var config ={

        method:'post',
        url : 'https://account.ezeep.com/oauth/access_token/',
        headers:{
            "Content-Type":'application/x-www-form-urlencoded',
            "Authorization": `Basic ${encodedid}`,
            "Host":"account.ezeep.com"
            
        

        },
        data : qs.stringify(data)

    }

    axios(config)
    .then((response)=>{

        callback(response)
    })
    .catch((error)=>{

        console.log(error)
    })


}



const refreshTokencall = (authCode,encodedId)=>{

    getAccessToken(authCode,encodedId,(accesstoken)=>{
        console.log(accesstoken.data.refresh_token)
        reftoken = accesstoken.data.refresh_token
    getRefreshtoken(reftoken,encodedId,(newRefreshToken)=>{

        console.log(newRefreshToken.data)
    })
    })

}


refreshTokencall(code,encodedID)