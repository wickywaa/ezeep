var axios = require('axios');

const accesskey = "eyJ0eXAodDOiJO9RFrg"
const printjob = "ezprnds-p00000O:HP420:1"



getStatus = (authkey,jobid)=>{

   // must be uri encoded or you will receive an error
    const encodedJobId = encodeURIComponent(jobid)


    const config = {

        url:`https://printapi.ezeep.com/sfapi/status/?id=${encodedJobId}`,
        headers:{
           "Authorization":`Bearer ${authkey}`
        }
    }
    
    
    
    axios(config)
    .then((response)=>{
    
        console.log(response.data)
    }).catch((error)=>{
        console.log(error)
    })



}


getStatus(accesskey,printjob)







