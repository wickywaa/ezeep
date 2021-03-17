const axios = require('axios');


const open = require('open');


const myClientId = '<enter client id here>'






const redirect_uri  = 'enter your redirect uri ';
const baseurl =  "https://account.ezeep.com";


// this is a function to open up the browser  and redriect to authenticate the user
// I use this for testing and I send the auth code to my local host endpoint or I can copy and paste from ur query parameters




const getCode=(ID,URI)=>{

  const  fullurl  = `${baseurl}/oauth/authorize?response_type=code&client_id=${ID}&redirect_uri=${URI}&scope=printing`


   const url = open(fullurl)
    
    .then((code)=>{
        
    })
    .catch((error)=>{
        console.log(error)
    }
    )

   
}






getCode(myClientId,redirect_uri)




           
