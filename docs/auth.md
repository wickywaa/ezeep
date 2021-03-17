## **Authorize  token end point**


### 1. Redirects the user to the authorization Page

`https://account.ezeep.com/oauth/authorize?response_type=code&client_id=<client_id>&redirect_uri=<redirect_uri>`

### 2. Returns an authorization code as a URL parameter to the redirect URI

- `http://localhost:8080/?code=<authorization_code>`
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








## **Request access token**

Returns Access token


```shell
POST "https://account.ezeep.com/oauth/access_token/
```




|Type    |Name               | Value                 |
|:-----: |:----------------:|:----------------------:|
|  Header      | Authorization| Basic {{base_64_encoded_client_id}} |
|  Data       | grant_type | authorization_code |
|  Data       |scope | printing |
|   Data      |code | {{authorization_code}} |






<br>

Example Request<br>


```shell
curl -H "Authorization:Basic <base64_encodedId>"  -d"grant_type=authorization_code&scope=printing&code=<authorization_code>" -X POST "https://account.ezeep.com/oauth/access_token/
```

Example Response

```json
 
{
  "access_token": "eyJ0eXAiO............", 
"token_type": "Bearer",
"expires_in": 3600,
"scope": "printing", 
"refresh_token": "erliDdAbfgDciyUTRhQUlrLI9HWWKTg6"

}
```

## **Use Refresh Token**

You can use the refresh token once to generate a new access token and refresh token:

```
POST "https://account.ezeep.com/oauth/access_token/
```


|Type    |Name               | Value                 |
|:-----: |:----------------:|:----------------------:|
|  Header| Authorization    | Basic {{base_64_encoded_client_id}} |
|  Header| Content-Type     |application/x-www-from-urlencoded
|  Data  | grant_type       | authorization_code |
|  Data  |scope             | printing |
|  Data  |code               | {{refresh_token}} |




Example request:

```shell
curl -H "Authorization:Basic UkhFWlJmN2FmUUSnh0MDoNCg=="  -d"grant_type=refresh_token&scope=printing&refresh_token=VAVdnsLY1kxn8gUp01ibo57yA1" -X POST "https://account.ezeep.com/oauth/access_token/

```




Example Response

```json
{
    "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9...",
    "token_type": "Bearer",
    "expires_in": 3600,
    "scope": "",
    "refresh_token": "vT5GTKk8s4eL1MhJqdkaEFhth23459OQV"
}
```

You will need to replace and store the new refresh token securely from the response for future usage. 
