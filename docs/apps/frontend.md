---
title: Frontend Development
menuText: Frontend Development
description: Learn how to develop a frontend using popular frameworks
menuOrder: 10
parent: Building Applications
---

# Frontend Development

If you are building an application that has a frontend, as opposed to just an API or any other type of server-side only application, you'll probably want to use a frontend development framework like React or Vue.

These frameworks provide a local development server, which lets you rapidly iterate your frontend code and see the results in your browser instantly, and a build tool that lets you create a production-ready minified build that you can deploy to a production instance.

Serverless Cloud seamless integrates with frontend frameworks using the `cloud dev`, `cloud share` and `cloud deploy` commands.

## Starter templates

If you are getting started on a new project, you can use a starter template to get up and running quickly. There are starter templates for all the frontend frameworks supported by Serverless Cloud. To get started just run the `cloud` command in a new directory:

```bash
mkdir my-project
cd my-project
cloud
```

The Cloud shell will guide you through the process of logging in and setting up your project.

After the project has been set up, you can run `cloud dev` to start the frontend framework's local development server.

## Local development using `cloud dev`

This will run the `cloud:dev` script as defined in your `package.json`. It can be used to start your local development server. For example, to start the Vue.js development server, add the following to the `scripts` section of your `package.json`:

```json
  "cloud:dev": "vue-cli-service serve"
```

When you run `cloud dev`, the Cloud shell will connect to your personal instance and start your local development server.

You can also start the development server from within the Cloud shell using the `dev` command, and stop it with the `stop` command.

## Sharing and deploying with `cloud share` and `cloud deploy`

`cloud share` deploys your application to a new "preview" instance that includes the same code and data as your developer sandbox. `cloud deploy` deploys your application to a "stage" instance, without copying any data.

When using a frontend framework, these commands can also build your application by running the `cloud:build` script defined in your `package.json`. For example, to build a Vue.js application, add this script to your `package.json`:

```json
  "cloud:build": "vue-cli-service build"
```

When this script is specified, Serverless Cloud will run the script to build your application whenever you run `cloud share` or `cloud deploy`.

Build logs are displayed in the Cloud dashboard, in the "Deployments" tab. Each time an instance is deployed, a new deployment will appear in the dashboard, and the build logs can be viewed by clicking on the deployment list item.

If your framework supports static site generation, you can use the Cloud SDK at build time to generate your pages. See the second on Static Site Generation (SSG) below, and checkout the guide for your specific framework.

## Installing dependencies

Serverless Cloud currently includes all your non-dev dependencies when you deploy using `cloud share` and `cloud deploy`. To minimize your package size, you should install all frontend framework dependencies as `devDependencies` using `npm install --save-dev`.

## Configuration Helpers

Some frameworks require special configuration to work with Serverless Cloud. Check the framework-specific section for your framework below.

## Developer Sanbox Proxy

When you run `cloud dev`, your developer sandbox API endpoint is available via `localhost` using a random unassigned port.

You can use the `CLOUD_PORT` environment variable to configure your local development server to proxy to your Serverless Cloud API.

For example, in a `create-react-app` application, you can do the following in `src/setupProxy.js`:

```javascript
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:" + process.env.CLOUD_PORT,
    })
  );
};
```

## Static Site Generation (SSG)

In frameworks that support SSG, you can using the Cloud SDK at build time. For example, with a Next.js application, you can use the SDK inside `getStaticProps()` and `getStaticPaths()`:

```javascript
export async function getStaticProps(context: any) {
  const result = await data.get(`user:${context.params.id}`, true))

  return {
    props: {
      user: result?.value
    },
    notFound: !result?.value,
    revalidate: 10
  }
}

export async function getStaticPaths() {
  const result = await data.get('user:*', true))

  /**
   * pre-render the first two users, with a fallback to generate other pages on demand
   * at runtime
   */
  return {
    paths: result.items.slice(0, 1).map(({ value }) => ({
      params: { id: value.id.toString() }
    })),
    fallback: true
  }
}
```

## Server side rendering (SSR)

In frameworks that support SSR, your server-side components can use the Cloud SDK.

For example, in a Next.js app you can use the SDK within `getServerSideProps()`:

```javascript
import { data, params } from '@serverless/cloud'

export default function UsersPage({ users }) {
  return (
    <div className="root">
      <main>
        <h1>Users</h1>
        {users?.map((user) => (
          <p key={user.id}>{user.name}</p>
        ))}
      </main>
    </div>
  )
}

export async function getServerSideProps() {
  const result = await data.get('user:*', true))
  return {
    props: {
      users: result.items.map(({ value }) => value),
    }
  }
}
```

# Framework-Specific Guides

## Next.js

### Supported versions and features

Serverless Cloud supports Next.js 12 and up, and the following features:

- image optimization
- middleware
- static site generation (SSG)
- server side rendering (SSR)
- incremental static regeneration (ISR)

### Configuration

Use the Next.js configuration helper to build your configuration in `next.config.js`:

```javascript
// next.config.js
import withCloud from "@serverless/cloud/nextjs";

export default withCloud();
```

### API fallback

If you are using the Cloud SDK for your API instead of the built-in Next.js API support, you need to set up a fallback for your local development server:

```javascript
// next.config.js
import { params } from "@serverless/cloud";
import withCloud from "@serverless/cloud/nextjs";

export default withCloud({
  async rewrites() {
    // in production mode, requests automatically fall through to the cloud api
    if (process.env.NODE_ENV === "production") {
      return [];
    }

    // have the dev server fall back to the cloud api
    return {
      fallback: [
        {
          source: "/:path*",
          destination: `${params.CLOUD_URL}/:path*`,
        },
      ],
    };
  },
});
```

## Astro

### Configuration

Use the Astro configuration helper in your configuration file. For example, when using Svelte:

```javascript
// astro.config.mjs
import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";
import serverlessCloud from "@serverless/cloud/astro";

// https://astro.build/config
export default defineConfig({
  integrations: [serverlessCloud(), svelte()],
});
```

## SvelteKit

### Configuration

Use the Svelte configuration helper. This is an example of a default configuration:

```javascript
// svelte.config.js
import withCloud from "@serverless/cloud/svelte";

export default withCloud();
```

### API proxy

To proxy `/api` requests to your developer sandbox API:

```javascript
// svelte.config.js
import withCloud from "@serverless/cloud/svelte";

export default withCloud({
  kit: {
    methodOverride: {
      allowed: ["PATCH", "DELETE"],
    },
    vite: {
      server: {
        proxy: {
          "/api": `http://localhost:${process.env.CLOUD_PORT}`,
        },
      },
    },
  },
});
```

## Other Frameworks

Other frameworks do not use a configuration helper. Check our starter templates for example configurations.

We have starter templates for these frameworks:

- Angular
- Eleventy
- React (create-react-app)
- Vue.js
