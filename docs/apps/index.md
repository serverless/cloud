---
title: Building Applications
menuText: Building Applications
description: Serverless Cloud provides an easy-to-use Serverless Development Kit (SDK) for building applications quickly and easily.
menuOrder: 3
has_children: true
has_toc: false
---

# Building Applications on Serverless Cloud

With Serverless Cloud, you _just write code_. Backed by a fully-featured Node.js runtime with support for modern [JavaScript](/cloud/docs/get-started/supported-languages#javascript) and [Typescript](/cloud/docs/get-started/supported-languages#typescript) right out of the box, you can build just about any application you can imagine. Import your favorite libraries, write your own custom functions, connect to third-party APIs and services, and even use familiar backend frameworks like [Express.js and Koa](/cloud/docs/apps/frameworks).

You can supercharge your applications by using our **Serverless Development Kit (SDK)**. The SDK provides several intuitive interfaces that let developers build modern, cloud native applications without ever thinking about infrastructure. The SDK was designed to be simple and familiar, maximizing your productivity by eliminating the need to learn new, complicated APIs.

## Serverless Development Kit (SDK)

The Serverless Development Kit (SDK) includes interfaces for `api` (to build modern APIs), `schedule` (for creating scheduled tasks), `data` (for accessing our powerful, built-in datastore), `params` (for accessing application secrets), and `http` (to bring your own framework).

The SDK is automatically available to your application and the interfaces can be selectively imported into your scripts like this:

```javascript
import { api, data, params } from "@serverless/cloud";
```

Learn more about these SDK interfaces and how to use them:

- [APIs](/cloud/docs/apps/api)
- [Scheduled Tasks](/cloud/docs/apps/schedule)
- [Serverless Data](/cloud/docs/apps/data)
- [Serverless Storage](/cloud/docs/apps/blob-storage)
- [Serverless Events](/cloud/docs/apps/events)
- [Static Assets](/cloud/docs/apps/static-assets)
- [Parameters](/cloud/docs/apps/params)
- [Bring Your Own Framework](/cloud/docs/apps/frameworks)

## Additional Concepts

- [Apps and Instances](/cloud/docs/apps/apps-instances)
- [Serving Static Assets](/cloud/docs/apps/static-assets)
- [Using Typescript](/cloud/docs/apps/typescript)
