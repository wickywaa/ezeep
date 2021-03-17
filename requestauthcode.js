const axios = require('axios');
const FormData = require('form-data');
const data = new FormData();
const open = require('open');

const newclientid = 'zV2gpuxma9GRLJpyxAwew0sOPjjDrt5AKYdweCLX'
const myClientId = 'RHEZRf7afQBlJZ6BzSzQ7JHIXVwObvrJGYVnJxt0'
const devClientid = 'HHHbxyDH1wxHbl01ZA6Y7vSs70Cc7NDU7Su4MISc'
const newestclientid = '2ATwQCdROTS4pHedN0bHtEAA5c3qCXST7loxJ5fS'



const clientID  = devClientid;
const localhostUri = "http://localhost:3000/code"
const redirect_uri  = 'https://www.ezeep.com';
const baseurl =  "https://account.ezeep.com";


const sedhourl  = "https://global.consent.azure-apim.net/redirect"
const sedhoid =  "bGJq8iyyVS9XMIbBptaqZwJYWbkYeEOnv6r3SfwT"



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




//getCode(myClientId,redirect_uri)

getCode(myClientId,redirect_uri)



//

           