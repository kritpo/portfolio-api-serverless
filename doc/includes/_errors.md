# Errors

The Portfolio API uses the following error codes:

| Error Code | Error Message         | Meaning                                               |
| ---------- | --------------------- | ----------------------------------------------------- |
| 400        | Bad Request           | Your request is invalid.                              |
| 401        | Unauthorized          | Your AWS Cognito access token is incorrect.           |
| 403        | Forbidden             | You don't have rights to do the corresponding action. |
| 404        | Not Found             | The specified ressource could not be found.           |
| 405        | Method Not Allowed    | The specified HTTP method is not supported.           |
| 500        | Internal Server Error | The server encountered an error.                      |
