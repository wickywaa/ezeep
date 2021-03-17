# About ezeep Blue

ezeep is the future of Printing. With ezeep, printing will become dramatically simpler and any device will be able to print on any printer. ezeep Blue combines the simplicity of ezeep with the stability, scalability and high printing speed of ThinPrint’s remote desktop solution. 

Thanks to ezeep, organizations can simplify their administration and provide printing to their users with fewer requirements on their infrastructure. With a few clicks, they can manage access to their printers and monitor print activity. That leads to lower overall costs for printing.

ezeep’s API first approach ensures open interfaces that allow easy integrations with existing solutions for user and resource management, cost control, compliance monitoring and others to achieve maximum savings through automation. A continuously growing ecosystem of standard integrations by development partners benefits non-technical customers as well.

By lowering costs, removing technical requirements and providing the ability to share printers in a managed and secure way with anyone anywhere, ezeep ensures that printing becomes easy.

# Introduction

ezeep Blue supports a Print API that enables 3rd Party developers to use the ezeep platform and fully integrate printers into their workflows. In this document you will go through a full print workflow and will learn to

- Connect a user account with the authorization code workflow
- Authenticate a user with access and refresh tokens
- Pick a cloud connected printer
- Create and upload a document
- Adjust settings for a print job 
- Trigger a print job to an ezeep-connected printer
- Get information on the printjob status

## Requirements

- ezeep Blue administrator account
- Your personal ezeep Client ID and Client Secret
- base64 encoded clientId
- Redirect Uri

To setup your ezeep administrator account and organization, [sign up here](https://www.ezeep.com/blue/)

To receive your Client ID,Client Secret and provide your redirect URI(s) contact us at [helpdesk@ezeep.com](mailto:helpdesk@ezeep.com) 

For the full documentation on setting up your ezeep Blue account, [check our web documentation](https://support.ezeep.com/en/support/home)

 ## Base 64 encoded id
**base_64_encoded_client_id**
Basic authentication scheme is used, meaning the Authorization header value is `Basic ` followed by a space
and the base64 encoded client_id followed by a colon `:` followed by your client secret
For example: If your client id is `g34ibgu2fhon` and your client secret is `jisow35ysdlalx35s2avnks43223jdhjsdk` you need to base64-encode it as `g34ibgu2fhon:jisow35ysdlalx35s2avnks43223jdhjsdk` which results in `ZzM0aWJndTJmaG9uOmppc293MzV5c2RsYWx4MzVzMmF2bmtzNDMyMjNqZGhqc2RrCg==`.
You can use a base64 encoding tool like [this one](https://www.base64encode.org).

## Starting

The printing workflow requires you to

- authenticate the user
- get printers
- prepare an upload
- upload a file
- print


## Endpoints

| URL | Name |
| ------ | ------ |
| https://account.ezeep.com | Account Management API |
| https://printapi.ezeep.com | Print Management API |

  
## Base Url

```
https://account.ezeep.com
```

# Authorize  token end point

### 1. Redirects the user to the authorization Page

`https://account.ezeep.com/oauth/authorize?response_type=code&client_id=<client_id>&redirect_uri=<redirect_uri>`

### 2. Returns an authorization code as a URL parameter to the redirect URI

- `<your redirect_uri>/?code=<authorization_code>`
- `myapp://callback?code=<authorization_code>`


Required query parameters:

| Attribute     |required    |   description                                                                      |
|:------------- |:----------:|:-----------------------------------------------------------------------------------|
| response_type |   yes      | defines the OAuth2 grant, `code` is preferred as authorization grant               |
| client_id     |   yes      |the Client ID you received from ezeep                                               |
| redirect_uri  |   yes      |Must match one of the redirect URIs you provided  when you requested your Client ID |
| social        |   no       |`azure` to automatically redirect to Microsoft for authentication                   |
| prompt        |   no       |`none` to prevent Microsoft from showing the account selection prompt               |
| scope         |   no       |`printing`                                                                          |
| state         |   no       |can be used to maintain state after redirecting the user agent                      |


## Request access token

Returns access token. It will be valid for 3600 seconds(1 hour) and after that duration you have to request new access token using the **refresh token** that you received in the access token response.

```shell
POST 'https://account.ezeep.com/oauth/access_token'
```

|Type    |Key               | Value                 |
|:-----: |:----------------:|:----------------------:|
|  Header      | Authorization| Basic {{base_64_encoded_client_id}} |
|  Data       | grant_type | authorization_code |
|  Data       |scope | printing |
|   Data      |code | {{authorization_code}} |

<br>
Example Request<br>

```shell
curl  -X POST 'https://account.ezeep.com/oauth/access_token/' \
      -H "Authorization:Basic <base64_encodedId>"  \
      -d "{
           'grant_type':'authorization_code',
           'scope' :'printing',
           'code':'<authorization_code>'
         }" 
```

Example Response

```json
 
{
   "access_token": "eyJ0eXAiO...", 
   "token_type": "Bearer",
   "expires_in": 3600,
   "scope": "printing", 
   "refresh_token": "erliDdAb..."
}
```

## Use refresh token

You can use the refresh token once to generate a new access token and refresh token:

```shell
curl -X POST 'https://account.ezeep.com/oauth/access_token/'
```

|Type    |Key               | Value                 |
|:-----: |:----------------:|:----------------------:|
|  Header| Authorization    | Basic {{base_64_encoded_client_id}} |
|  Header| Content-Type     |application/x-www-from-urlencoded
|  Data  | grant_type       | authorization_code |
|  Data  |scope             | printing |
|  Data  |code               | {{refresh_token}} |

Example request:

```shell
curl -X POST 'https://account.ezeep.com/oauth/access_token/' \
     -H 'Authorization:Basic UkhFWlJmN2FmUUSnh0MDoNCg==' \
     -d "{
          'grant_type':'refresh_token',
          'scope':'printing'
          'refresh_token':'<refresh_token>'
        }"
```

Example Response

```json
{
    "access_token": "eyJ0eXAiOiJ...",
    "token_type": "Bearer",
    "expires_in": 3600,
    "scope": "",
    "refresh_token": "vT5GTKk8..."
}
```

You will need to replace and store the new refresh token securely from the response for future usage. 

# Printing

To print using the ezeep print api first you will need to work through the Authentication process and have a valid access token. You can now use this token to work through the following steps of the printing process.

- Get printer
- Prepare an upload
- Upload a file
- Print

## Base URL

```shell
https://printapi.ezeep.com/

```

## Get Configuration

With this request, you can retreive details of the currently authenticated user and related system configuration parameters . It is used to determine which filetypes are supported for printing (_System:FILEEXT_)

```shell
Get https://printapi.ezeep.com/sfapi/GetConfiguration/
```

|Type    |Key               | Value                 |
|:-----: |:----------------:|:----------------------:|
|  Header| Authorization    | Bearer {{Access Token}} |

Example Request:

```shell
curl -X Get 'https://printapi.ezeep.com/sfapi/GetConfiguration/' \
     -H "Authorization:Bearer eyJ0eXAiOiJKV1QiLCJhb...."
```

Example response:

The response contains a list of available printers

```json
{
    "Drivers": {
        "PrinterDynamic": "0e651413e003e36de6781cfe227a9cc2",
        "PrinterStatic": "ee527381ab6ab5d4aba89f8ec2fd5d2c"
    },
    "Folders": [
        {
            "export": "",
            "id": 1,
            "op": 3
        }
       
    ],
    "SFForms": {
        "$Count": 0
    },
    "Shell": [],
    "System": {
        "BW": 0,
        "CONNECT": ":4001",
        "CONNECTEX": ":4001",
        "DocProvUplInterval": 60,
        "FILEEXT": "bmp;csv;doc;docm;docx;dot;dotm;dotx;eml;gif;htm;html;jpeg;jpg;log;mht;mhtml;odf;odg;odm;odp;odt;otg;oth;otp;ott;pdf;png;pot;potm;potx;pps;ppsx;ppt;pptm;pptx;rtf;scp;sda;sdd;sds;sdw;sgl;smf;sti;stw;sxd;sxg;sxi;sxm;sxw;tif;tiff;tpf;txt;vor;wtx;xls;xlsb;xlsm;xlsx;xlt;xltm;xltx;xml;xps;",
        "HOST": "https://vm-mfkym5000000:443",
        "HOSTEX": "https://vm-mfkym5000000:443",
        "MaxLocalPreviewFileSize": 16777216,
      
    },
   
}...........
```

| Section    | Attribute   | Type  | Description  |                                                  
| ---------- | ----------- | ------| ------------ |
| `System `  | `FILEEXT `  | string   | list of supported file formats (file extension)                                                        |

## Get Printer

Requests a list of printers available to the user

```shell
  GET  https://printapi.ezeep.com/sfapi/GetPrinter/
```

|Type    |Key               | Value                 |
|:-----: |:----------------:|:----------------------:|
|  Header| Authorization    | Bearer {{Access Token}} |

Example Request:

The response contains a list of available printers:

```shell
curl -X GET 'https://printapi.ezeep.com/sfapi/GetPrinter/'  \
     -H "Authorization:Bearer <access_token>"  
```

Example Response:

```json
[
  {
    "id": "2fd4f571-7c2e-4042-8fc5-1d736f532e88",
    "location": "Parallel Universe 2b-α-3187",
    "name": "printer 6"
  },
  {
    "id": "9620e656-b39b-49ba-a653-a3f168575ec2",
    "location": "",
    "name": "printer01"
  }
  
]
```

## Get Printer Properties

Returns further properties of the printer by printer id.

```
 GET https://printapi.ezeep.com/sfapi/GetPrinterProperties/
```

| Attribute         | Type   | Required | Description                                                                                            |
| ----------------- | ----   | -------- | ------------------------------------------------------------------------------------------------------ |
| `Authorization`   |Header  | yes       | Bearer {{Access Token}}
| `printer`         | string | no       | The name of the printer. If it is empty, printerproperties of all available printers will be returned. |
| `id`              | string | no       | The id of the printer. If it is empty, printerproperties of all available printers will be returned.   |

Specify either printer_name or printer_id. ezeep is following Microsofts DEVMODE for printer properties. You can find a [detailed specification here](https://docs.microsoft.com/en-us/windows/win32/api/wingdi/ns-wingdi-devmodea)

Example Request:

```shell
curl -X GET \
     "https://printapi.ezeep.com/sfapi/GetPrinterProperties/?id=016bc036-2498-431e-84c6-14552639f515" \
     -H "Authorization:Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9." 

```

Example response:

```json
[
  {
    "Collate": true,
    "Color": false,
    "Driver": "",
    "DuplexMode": 0,
    "DuplexSupported": false,
    "Id": "9620e656-b39b-49ba-a653-a3f168575ec2",
    "Location": "",
    "MaxXExtent": 0,
    "MaxYExtent": 0,
    "Name": "printer01",
    "OrientationsSupported": [
      "portrait",
      "landscape"
    ],
    "OrientationsSupportedId": [
      1,
      2
    ]
  }
]
```


## Prepare file upload
 Uploads a file to print.

```shell
GET https://printapi.ezeep.com/sfapi/PrepareUpload/
```

|Type    |Key               | Value                 |
|:-----: |:----------------:|:----------------------:|
|  Header| Authorization    | Bearer {{Access Token}} |

Example request:

```shell
curl -X GET 'https://printapi.ezeep.com/sfapi/PrepareUpload/' \
     -H "Authorization:Bearer <access__token>" 
```

Example Response:

The response will include the file id of your new document as well as the sasURI which we will use for the upload later on:

```json
{
  "fileid": "ERI_be20b4d1-d6b8-41ee-8ca8-580905b9b4ed",
  "sasUri": "https://rndsvcezp.blob.core.windows.net/userstorage/ERI_be20b4d1-d6b8-41ee-8ca8-580905b9b4ed?sv=2018-03-28&sr=b&sig=FxuLjL2Kids9Ww60dqQ6FlqscTTccKFBwk%2Ft0Tyf%2BM0%3D&se=2020-05-22T15%3A45%3A12Z&sp=wl"
}
```

## File Upload
Uploads a file to print.

```shell
PUT {{sasURI}}
```

|Type    |Name              | Value                                         |
|:------: |:---------------:|:---------------------------------------------:|
|  Header |  x-ms-blob-type |      BlockBlob                                |
|  Header |  Content-Type   |      multipart/form-data                      |
|  File   | Fileupload      | file=test@C:/Users/User/Desktop/testfile.pdf  | 

Example request:

```shell
curl -X PUT  \
      "https://rndsvcezp.blob.core.windows.net/userstorage/ERI_db66aea1-f702-4a0a-b2ee-37a7cdacd376 
       sv=2019-07-07&sr=b&sig=9y%2Fs5gOgVZgxI2ap634TnKQzilTmTcicCOOIWYVVnNs%3D&se=2021-02-08T23%3A06%3A52Z&sp=wl"
    -H "x-ms-blob-type: BlockBlob" \
    -H "Content-Type:multipart/form-data" \
    -F "file=test@C:/Users/User/Desktop/testfile.pdf"
```

If successful, you will receive an empty HTTP 201 (created) response.

## Print an uploaded file

Prints a file that you have uploaded. 

```shell
POST https://printapi.ezeep.com/sfapi/Print/
```

Parameters:

| Attribute                 | Type   | Required | Description                                                              |
| ------------------------- | ----   | -------- | ------------------------------------------------------------------------ |
| `fileid`                  | string | yes      | Id of the uploaded file. See `PrepareUpload`                             |
| `type`                    | string | yes      | Type of the file. (e.g. txt)                                             |
| `alias`                   | string | no       | Original name of file/document. If it is empty, the fileid will be used. |
| `printerid`               | string | yes      | Id of the printer. See `GetPrinterProperties`.                           |
| `printanddelete`          | bool   | no       | If `true` the uploaded document will be deleted after printing. If `false` the uploaded document remains on the server. Default is `false`. |
| `properties[paper]`       | string | no       | Size of the paper. See `GetPrinterProperties`                            |
| `properties[paperid]`     | int    | no       | Id of of paper size. See `GetPrinterProperties`                          |
| `properties[color]`       | bool   | no       | Enable color. See `GetPrinterProperties`                                 |
| `properties[duplex]`      | bool   | no       | Enable duplex. See `GetPrinterProperties`                                |
| `properties[duplexmode]`  | int    | no       | Duplex mode. See `GetPrinterProperties`                                  |
| `properties[orientation]` | int    | no       | Orientation mode. See `GetPrinterProperties`                             |
| `properties[copies]`      | int    | no       | Count of copies. See `GetPrinterProperties`                              |
| `properties[resolution]`  | string | no       | DPI / quality . See `GetPrinterProperties`                               |

Example request:

The request parameters need to be sent in the body in JSON format.

```shell
curl -X POST 'https://printapi.ezeep.com/sfapi/Print' \
     -H 'Content-Type':'application/json' \
     -H 'Authorization':'Bearer <token>' \
     -d "{
         'fileid':'<fileid>',
         'printerid':'<printerid>',
         'type':'pdf'
         }"  
```

Example Response:

```json
{
  "jobid": "ezprnds-d000001:HP Un_tpcb_788_7863578#2031753094:4"
}
```

## Print a file referenced by URL
Target documents's URL must be public reachable and must contain all information needed to download the file (e.g. _authorization information_ if needed).

Request and response are more or less the same as for [Print an uploaded file](Print%20an%20uploaded%20file). **But** the JSON attribute _fileid_ is replaced by _fileurl_.
Since the file is downloaded in background it's not unlikely (depending on file's size) that printing can't start immediately. In this case you will receive _HTTP 412 Precondition failed_ and the response provides you a _fileid_ you can use for [Print an uploaded file](Print%20an%20uploaded%20file).

 

```shell
POST https://printapi.ezeep.com/sfapi/Print/
```

Parameters:

| Attribute                 | Type   | Required | Description                                                              |
| ------------------------- | ----   | -------- | ------------------------------------------------------------------------ |
| `fileurl`                 | string | yes      | URL of the file to print
| `type`                    | string | yes      | Type of the file. (e.g. txt)                                             |
| `alias`                   | string | no       | Original name of file/document. If it is empty, the fileid will be used. |
| `printerid`               | string | yes      | Id of the printer. See `GetPrinterProperties`.                           |
| `printanddelete`          | bool   | no       | If `true` the uploaded document will be deleted after printing. If `false` the uploaded document remains on the server. Default is `false`. |
| `properties[paper]`       | string | no       | Size of the paper. See `GetPrinterProperties`                            |
| `properties[paperid]`     | int    | no       | Id of of paper size. See `GetPrinterProperties`                          |
| `properties[color]`       | bool   | no       | Enable color. See `GetPrinterProperties`                                 |
| `properties[duplex]`      | bool   | no       | Enable duplex. See `GetPrinterProperties`                                |
| `properties[duplexmode]`  | int    | no       | Duplex mode. See `GetPrinterProperties`                                  |
| `properties[orientation]` | int    | no       | Orientation mode. See `GetPrinterProperties`                             |
| `properties[copies]`      | int    | no       | Count of copies. See `GetPrinterProperties`                              |
| `properties[resolution]`  | string | no       | DPI / quality . See `GetPrinterProperties`                               |

Example request:

```shell
curl -X "https://printapi.ezeep.com/sfapi/Print" \
     -H "Content-Type:application/json" \
     -H "Authorization:Bearer eyJ0eXAiOiJKV1..." \
     -d "{
         'fileurl':'https://file-examples-com.github.io/uploads/2017/10/file-sample_150kB.pdf','printerid':'016bc036-2498-431e-84c6-14552639f515',
         'type':'pdf'
        }"
```

Example Response if file has printed:

```json
{
  "jobid": "ezprnds-d000001:HP Un_tpcb_788_7863578#2031753094:4"
}
```

Example response if file is still uploading (larger files):

```json
{
  "fileid": "ERI_be20b4d1-d6b8-41ee-8ca8-580905b9b4ed",
  "sasUri": ""
}
```




## Get Status

You can retrieve information on the printjob state with the following request:

```
GET https://printapi.ezeep.com/sfapi/Status/?:id
```
Parameters:

| Attribute         | Type   | Required | Description                                                                                            |
| ----------------- | ----   | -------- | -------------------------------- |
| `id     `         | string | yes      | The Job identifier. See `Print`. |

Example request:

```shell
curl -X GET \
 "https://printapi.ezeep.com/sfapi/status/?id=ezprnds-p00000M:HP%20Co_tpcb_4936_114813343#1801071420:1" \
 -H "Authorization: Bearer <access__token"  
 
````

Example response:

```json
{
  "jobpagesprinted": 0,
  "jobpagestotal": 1,
  "jobposition": 1,
  "jobstatus": 129,
  "jobstatusstring": "PRINTING|RETAINED|"
}
```


## Status Codes

| Status Code       | Description
| ----------------- | -----------
| 1246              | INFO: no status available yet, keep asking
| 129               | INFO: print job processing is running
| 0                 | INFO: print job successfully finished
| 3011              | ERROR: something went wrong - restart print job
| 2                 | ERROR: invalid print job identifier
