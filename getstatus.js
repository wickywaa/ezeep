var axios = require('axios');

const accesskey = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FjY291bnQuZXplZXAuY29tIiwiZXhwIjoxNjE0NzI0NTA5LCJpYXQiOjE2MTQ3MjA5MDksInNjb3BlcyI6InByaW50aW5nIiwic3ViIjoiMDZkNDAyYTItYmY2YS00MjZhLWE0ODktNjJhMDAyN2E2YTE4Iiwib3JnIjoiNTRlM2EzMjQtY2M4OS00NzIyLTgzMzgtYzI4NWQyNmJlZjE1Iiwicm9sIjoidXNlciJ9.c1vmbKNcSLanEJg9Ady-BkxDsr4pf3wDGfl5_m1-w191ivV0aw1B32H8sp_5rRTOHZIPFM4cnHPoRryw2i5wzizPvnHcADIv28epyY91mzla8etbHuCI17uQIeyG_bV_9tbqhFWRK6LWVlCEZEjCS5VbwuPJmxe1p8QRRS0sLU6ktySsFvJ3VC8xux1G8qz5BJbyNXn_TLjHcvFzXlTTr1oUZONHNiOsZUeLz9xJFj8bs_22-G8g-HGH4fSax_GvH-eL1_OUS-jSCQpw-QcYt-m2EAbXhAeaRb0xCHEAnXUodDOiJOs5UdicUURP76LLyGKNliSJcdMWi5Nwr9RFrg"
const printjob = "ezprnds-p00000O:HP Co_tpcb_3176_563684328#1801071420:1"



getStatus = (authkey,jobid)=>{


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







