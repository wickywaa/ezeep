
```

##  **Base URL**

```
https://printapi.ezeep.com/

## **GetConfiguration**

With this request, you can retreive details of the currently authenticated user and related system configuration parameters . It is used to determine which filetypes are supported for printing (_System:FILEEXT_)

```
Get https://printapi.ezeep.com/sfapi/GetConfiguration/
```



Example Request:


```shell
curl -H "Authorization:Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9..............." "https://printapi.ezeep.com/sfapi/GetConfiguration/"
```

Example response:

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


## **Get Printer**

Requests a list of printers available to the user

```shell
  GET  https://printapi.ezeep.com/sfapi/GetPrinter/
```

Example Request:

```shell
curl -H "Authorization:Bearer <access_token>"  "https://printapi.ezeep.com/sfapi/GetPrinter/" 
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

## **GetPrinterProperties**

Returns further properties of the printer by printer id.

```
 GET https://printapi.ezeep.com/sfapi/GetPrinterProperties/
```


| Attribute         | Type   | Required | Description                                                                                            |
| ----------------- | ----   | -------- | ------------------------------------------------------------------------------------------------------ |
| `printer`         | string | no       | The name of the printer. If it is empty, printerproperties of all available printers will be returned. |
| `id`              | string | no       | The id of the printer. If it is empty, printerproperties of all available printers will be returned.   |

Specify either printer_name or printer_id. ezeep is following Microsofts DEVMODE for printer properties. You can find a [detailed specification here](https://docs.microsoft.com/en-us/windows/win32/api/wingdi/ns-wingdi-devmodea)


Example Request:

```shell
curl -H "Authorization:Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9." "https://printapi.ezeep.com/sfapi/GetPrinterProperties/?id=016bc036-2498-431e-84c6-14552639f515"

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



## **Prepare file upload**
 Uploads a file to print.

```shell
GET https://printapi.ezeep.com/sfapi/PrepareUpload/
```



Example request:



```shell
curl -H "Authorization:Bearer <access__token>" "https://printapi.ezeep.com/sfapi/PrepareUpload/"
```

Example Response:

```json
{
  "fileid": "ERI_be20b4d1-d6b8-41ee-8ca8-580905b9b4ed",
  "sasUri": "https://rndsvcezp.blob.core.windows.net/userstorage/ERI_be20b4d1-d6b8-41ee-8ca8-580905b9b4ed?sv=2018-03-28&sr=b&sig=FxuLjL2Kids9Ww60dqQ6FlqscTTccKFBwk%2Ft0Tyf%2BM0%3D&se=2020-05-22T15%3A45%3A12Z&sp=wl"
}
```

## **File Upload**
Uploads a file to print.


```shell
PUT {{sasURI}}
```


|Type    |Name              | Value                                         |
|:------: |:---------------:|:---------------------------------------------:|
|  Header |  x-ms-blob-type |      BlockBlob                                |
|  File   | Fileupload      | file=test@C:/Users/User/Desktop/testfile.pdf  | 


Example request:

```shell
curl -H "x-ms-blob-type: BlockBlob"  -H "Content-Type:multipart/form-data" -F file=test@C:/Users/User/Desktop/testfile.pdf -X PUT "https://rndsvcezp.blob.core.windows.net/userstorage/ERI_db66aea1-f702-4a0a-b2ee-37a7cdacd376?sv=2019-07-07&sr=b&sig=9y%2Fs5gOgVZgxI2ap634TnKQzilTmTcicCOOIWYVVnNs%3D&se=2021-02-08T23%3A06%3A52Z&sp=wl"
```

If successful, you will receive an empty HTTP 201 (created) response.


## **Printing**

### Print an uploaded file

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

```
curl  -H "Content-Type:application/json" -H "Authorization:Bearer <token>" -d "{'fileid':'<fileid>','printerid':'<printerid>','type':'pdf'}" "https://printapi.ezeep.com/sfapi/Print" 
```

Example Response:

```json
{
  "jobid": "ezprnds-d000001:HP Un_tpcb_788_7863578#2031753094:4"
}
```







### Print a file referenced by URL
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
curl  -H "Content-Type:application/json" -H "Authorization:Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FjY291bnQuZXplZXAuY29tIi" -d "{'fileurl':'https://file-examples-com.github.io/uploads/2017/10/file-sample_150kB.pdf','printerid':'016bc036-2498-431e-84c6-14552639f515','type':'pdf'}" "https://printapi.ezeep.com/sfapi/Print"

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





## **GetStatus**

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
curl  -H "Authorization: Bearer eyJ5GNNctN7M2IT0KOWo7kUuJvTFxY2XPDbsfuR7PsMRQlLMGJcoAOXWvh0MB9B6IZrUBciia1piiRoZM6Wz7mT0SGAkniVxGE4a1AfOPkWdxYlRpUNYyyF82moG6Pw" "https://printapi.ezeep.com/sfapi/status/?id=ezprnds-p00000M:HP%20Co_tpcb_4936_114813343#1801071420:1" 
 
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
