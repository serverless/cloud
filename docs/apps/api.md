---
title: APIs
menuText: APIs
description: Serverless Cloud provides a modern API framework that makes it easy to build and deploy cloud native APIs.
menuOrder: 2
parent: Building Applications
---

# APIs

Serverless Cloud provides a modern API framework that makes it easy to build and deploy cloud native APIs. If you would rather use Express.js, Koa, or another framework, you can **[bring your own framework](/cloud/docs/apps/frameworks)** while still taking advantage of the other features of Serverless Cloud.

## Creating an API

To create an API with Serverless Cloud, you define routes in your code using the `api` interface imported from the `@serverless/cloud` module.

```javascript
// CommonJS
const { api } = require("@serverless/cloud");

// ES Modules
import { api } from "@serverless/cloud";
```

You can then use a supported method to define an API route.

```javascript
// Create a GET route for /users
api.get('/user', (req,res) => { ...do something... })

// Create a POST route for /users
api.post('/users', (req,res) => { ...do something... })
```

## Supported methods

The following is a list of common API methods supported in Serverless Cloud.

Methods accept a `path` and `callback` parameter.

| Method     | Description                                                                                                                                                        |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `all()`    | This method is like the standard app.METHOD() methods, except it matches all HTTP verbs.                                                                           |
| `delete()` | Routes HTTP DELETE requests to the specified path with the specified callback functions.                                                                           |
| `get()`    | Routes HTTP GET requests to the specified path with the specified callback functions.                                                                              |
| `post()`   | Routes HTTP POST requests to the specified path with the specified callback functions.                                                                             |
| `put()`    | Routes HTTP PUT requests to the specified path with the specified callback functions.                                                                              |
| `use()`    | Mounts the specified middleware function or functions at the specified path: the middleware function is executed when the base of the requested path matches path. |

## Specifying paths

Paths are specified using simple string representions. Dynamic parameters can be set using the `:paramName` syntax. This value will be available in your callback function via the `req.params` object.

```javascript
// Create a GET route for /users with a dynamic parameter
api.get('/users/:userId', (req,res) => { ...do something with req.params.userId... })
```

## Callback functions

API route methods accept one or more callback functions as the second parameter. Callback functions receive a **Request** and **Response** object, as well as a `next` method as parameters.

### Request object

The Request object supports the following properties and methods. By convention, the Request object is referenced as `req`.

| Properties    | Description                                                                                                                         |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `req.body`    | The parsed body of the request. If the `Content-Type` is `application/json`, the value will automatically be parsed into an object. |
| `req.cookies` | An object that contains any passed cookis.                                                                                          |
| `req.method`  | The HTTP VERB used to trigger this route.                                                                                           |
| `req.params`  | An object that contains parsed parameters from the url as defined using `:paramName`.                                               |
| `req.path`    | The path used in the request.                                                                                                       |
| `req.query`   | An object containing parsed querystring parameters.                                                                                 |

### Response object

The Response object supports the following methods. By convention, the Response object is referenced as `res`.

| Method           | Description                                                                                                                                                                                |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `res.cookie()`   | Sets cookie name to value. See [res.cookie()](http://expressjs.com/en/4x/api.html#res.cookie).                                                                                             |
| `res.json()`     | Sends a JSON response. This method sends a response (with the correct content-type) that is the parameter converted to a JSON string using `JSON.stringify()`.                             |
| `res.location()` | Sets the response `Location` HTTP header to the specified path parameter.                                                                                                                  |
| `res.redirect()` | Redirects to the URL derived from the specified path, with specified status, a positive integer that corresponds to an HTTP status code. If not specified, status defaults to “302 Found”. |
| `res.send()`     | Sends the HTTP response. The body parameter can be a `Buffer` object, a `String`, an `object`, `Boolean`, or an `Array`.                                                                   |

## Middleware

Serverless Cloud supports both _Application_ and _Route-level_ middleware. For more information on middleware, please visit the [Express.js docs](http://expressjs.com/en/guide/using-middleware.html).

## CORS

To enable CORS on your API routes, you can use the CORS middleware.

```javascript
import cors from "cors";

api.use(cors());
```

Alternatively, you can apply CORS to specific routes.

```javascript
import cors from "cors";

api.get('/user', cors(), (req,res) => { ...do something... })
```

## Timeouts

By default, API routes will timeout after 10 seconds. To change the default, you can specify an object as your second parameter with a `timeout` key. Timeouts are specified in milliseconds and must be a positive integer. API routes support a maximum timeout of 29 seconds.

```javascript
api.get('/user', { timeout: 2000 }, (req,res) => {
  ...do something...
})
```

## Handling Uploads

API has a built in function for uploading files. `upload` takes both a route and a standard request handler function. Files can be uploaded as either a binary body or multipart form data. The `upload` method creates both a POST and PUT route.

### Binary Body Uploads

When uploading files as a binary body, information about the uploaded file will be available via the `req.files` array. This will include the `mimetype`, `size`, and `buffer`. The `buffer` can be passed directly to the `storage` interface to save the file.

```javascript
api.upload("/upload", async (req, res) => {
  await storage.write("my-uploaded-file", req.files[0].buffer);
  return res.sendStatus(200);
});
```

### Multipart Form Data Uploads

When uploading files from an HTML form (see below), API will automatically parse your files into a `req.files` array. Each item in the array will contain the `fieldname`, `orginalname`, `encoding`, `mimetype`, `size`, and the `buffer`.

```html
<form action="/upload" method="post" enctype="multipart/form-data">
  <input type="file" name="avatar" />
  <input type="text" name="someField" />
</form>
```

Additional form fields will be automatically parsed into an object and available on `req.body`. The `buffer` can be passed directly to the `storage` interface to save the file. Please note that multiple files can be uploaded and have a total size limit of 6MB.

```javascript
api.put("/upload", async (req, res) => {
  // access other form fields
  console.log("someField: " + req.body.someField);
  // save the buffer to storage
  await storage.write(res.files[0].originalname, req.files[0].buffer);
  return res.sendStatus(200);
});
```

## Serving Serverless Storage files

To send either locally stored files or files stored via Storage, use `res.sendFile`. `sendFile` will first check the local directory - if the supplied path exists here, the local file will be sent. Otherwise, `sendFile` will redirect to a download url for a given path, if it exists, from Storage.

```javascript
api.put("/file", async (req, res) => {
  await fs.writeFile("localPath", req.files[0].buffer);
  // will reference local file
  return res.sendFile("localPath");
});

api.get("/file", async (req, res) => {
  // will redirect to a download url via Storage
  return res.sendFile("storage-uploads/myFile.txt");
});
```
