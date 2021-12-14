---
title: Static Websites & Assets
menuText: Static Websites & Assets
description: Serve static assets like images, CSS, and JavaScript, and host front-end apps and websites.
menuOrder: 5
parent: Building Applications
---

# Static Websites & Assets

Serverless Cloud allows you to serve files from your application URL. This is useful for serving static assets such as images, CSS, and JavaScript, allowing you to host front-end apps and websites. By convention, static assets must be stored in the `static` directory at the root of your application.

You can have sub-directories in the static directory, but there are some reserved sub-directory names:

- `public`: this is reserved for public files created using the "storage" interface, which are available from the path `/public/*`

## Static HTML pages

Serverless Cloud also supports serving static HTML pages:

- requests for `/` will return `static/index.html` if it exists
- requests for `/<page>` will return `static/page.html` if it exists

This also applies for sub-directories in the `static` directory. For example, a request for `/admin` will return `/static/admin/index.html` if it exists, and a request for `/admin/page` will return `/admin/page.html`.

**NOTE:** Avoid having static pages that have corresponding API routes. For example, if you have a `/users` route, and also a `/static/users.html` page, Serverless Cloud will return the static page, and the API route will be unreachable.

## Custom server error pages

When a request is made for a page that doesn't exist, Serverless Cloud will return `static/404.html` if it exists, with a 404 status code. If this file doesn't exist, Serverless Cloud will return a default 404 page.

You can also customize the response that is sent when your application throws an error by creating a static file `static/500.html`.

## Dynamic error pages

If you would like your application to return a dynamic `404` or `500` response instead of using static files, you can write your own error handlers that override the default behavior.

See the [Express documentation on handling errors](https://expressjs.com/en/guide/error-handling.html) for more information.

## Falling back to index.html for single-page applications (SPAs)

To return your `index.html` page for any missing path, you can add a 404 handler with the `http` interface:

```javascript
http.on(404, "index.html");
```

## Using React, Vue, and other SPAs

If you are using a SPA framework or static site generator that requires a _build_ step, you can store your source files in your project directory and configure your output directory to be `/static`. To prevent Serverless Cloud from syncing your source files, you can add a **`.serverlessignore`** file in the root of your project and add a list of directories and files you do not wish to sync.

For example, if your front-end source files are stored in `/src`, your **`.serverlessignore`** file should contain the following:

```
src
```

This will allow you to run a separate terminal with your SPA build scripts running and only sync when it generates output files.

**NOTE:** Please be sure to restart your cloud shell after changing the `.serverlessignore` file.
