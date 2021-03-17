import requests
import json
access_token="put your access token here"
printer_url="https://printapi.ezeep.com/sfapi/GetPrinter/"
prepare_printer = "https://printapi.ezeep.com/sfapi/PrepareUpload/"

printer_id = requests.get(printer_url,headers={'Authorization': access_token})

tokens_id = json.loads(printer_id.text)
print(tokens_id)

printer_upload = requests.get(prepare_printer,headers={'Authorization': access_token})
tokens_printer = json.loads(printer_upload.text)
print(tokens_printer)

path='C:/Users/mufal/Downloads/week_9.pdf'
files = {'file': open(path,'rb')}
file_upload=requests.put(tokens_printer["sasUri"],files=files, headers={"x-ms-blob-type":"BlockBlob","Content-Type":"multipart/form-data"})
print(file_upload)

data={'fileid':tokens_printer['fileid'],'printerid':tokens_id[0]["id"],'type':'pdf'}
data=json.dumps(data)

print_job=requests.post("https://printapi.ezeep.com/sfapi/Print/",headers={'Authorization': access_token,"Content-Type":"application/json"},data=data)
print_job_json=json.loads(print_job)

#To check the print status

#status_url='https://printapi.ezeep.com/sfapi/Status/?:id'
#getting_status = requests.get(status_url)
#print(getting_status.text)

