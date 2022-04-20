---
title: Bring your own framework
menuText: Using Other Frameworks
description: Learn how to use other HTTP frameworks like Express to build your apps.
menuOrder: 9
parent: Building Applications
---

# Bring your own framework (BYOF)

Serverless Cloud provides a [modern API framework](/cloud/docs/apps/api) that makes it easy to build and deploy cloud native APIs. However, if you're migrating an application that already uses a different HTTP framework, Serverless Cloud will support your framework's API routing capabilities while still allowing you to take advantage of our other features.

## Supported frameworks

- [Connect](https://github.com/senchalabs/connect)
- [Express](https://expressjs.com/)
- [Koa](https://koajs.com/)
- [Restana](https://github.com/BackendStack21/restana)

**Experimental support is also available for:**

- [Sails](https://sailsjs.com/)
- [Hapi](https://hapi.dev/)
- [Fastify](https://www.fastify.io/)
- [Restify](http://restify.com/)
- [Polka](https://github.com/lukeed/polka)

## Importing your framework

HTTP frameworks like [Connect](https://github.com/senchalabs/connect) and [Express](https://expressjs.com/) were designed to function as Node.js HTTP servers using ports and sockets to respond to requests. In modern distributed systems, each request is isolated and responds to events rather than HTTP requests. Serverless Cloud provides an `http` interface function that will import your existing HTTP framework and make it compatible with our platform.

```javascript
// Import and initialize your framework
import express from "express"; // or any supported framework
const app = new express();

// Enable express body parsing middleware
app.use(express.json());

// Import the http interface and wrap your initialized app
import { http } from "@serverless/cloud";
http.use(app);
```

Then you can create routes and use middleware as usual.

```javascript
  app.get("/", (req, res) => {
    ... do something here ...
  })
```

## Using with GraphQL
GraphQL apis are supported with some additional boilerplate.

### express-graphql

```javascript
const { api} = require("@ serverless/cloud");
const { graphqlHTTP } = require('express-graphql');
const { buildSchema, GraphQLSchema } = require('graphql');

api.use('/graphql', graphqlHTTP({
  schema: schma,
  rootValue: rslvrs,
  graphiql: true,
}));
```

### apollo-server-express
```javascript
import { api } from "@serverless/cloud";
import { ApolloServer } from 'apollo-server-express';

class ServerlessCloudApollo extends ApolloServer {
  serverlessFramework() {
    return true;
  }

  async ensureStarted(){
    await super.ensureStarted();
  }
}

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
};

const server = new ServerlessCloudApollo({ typeDefs, resolvers });
// you can use top-level await here as long as your package.json type is "module" and tsconfig has "module" and "target" set to esnext.
await server.ensureStarted();

api.use(server.getMiddleware({ path: '/graphql'}));
```

## Limitations

Your code is running in a distributed serverless environment. You cannot rely on your server being 'up' in the sense that you can/should not use in-memory sessions, web sockets, etc. You are also subject to restrictions on Serverless Cloud's request/response size, maximum duration, etc.
