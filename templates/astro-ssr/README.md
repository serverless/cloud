# Serverless⚡Cloud ❤️ Astro 🚀🧑‍🚀✨

This is the [Astro SSR example](https://github.com/withastro/astro/tree/main/examples/ssr) adapted to take advantage of [Serverless Cloud](https://www.serverless.com/cloud)

## Getting Started

- Clone this repository
- Run `npm i`
- Run `npx cloud` to launch the Cloud Shell and connect to a personal sandbox.

Next, from within that shell, run:

- `import` - this will seed your sandbox database with the products in data.json
- `dev` - this will launch the local Astro dev server with superpowers

Open http://localhost:3000 and poke around - it's a starter app, right?  Have a look at `src/models/cart.ts` - it uses `@serverless/data` to store the users cart.  This is the Cloud SDK

Now jump over to `src/index.ts` - see how, in only a few lines of code, you can build event-driven applications that schedule tasks for later that run in the background.  In this case it might be one of those much-loved "you forgot something in your cart" e-mails.

## Share

Your personal sandbox is just for you and runs in a hybrid cloud-local development environment, if you'd like someone else to see what you've made, run `share` from within the Cloud Shell - in under a minute, you'll get a production-like preview instance of your application, with a unique URL, and the data from your personal instance forked in to it.

## Notes

- Event handlers such as `data.on` and `event.on` need to be registered via something imported via package.json `main`, not via framework pages/endpoints.
- Running `cloud deploy {stageName}` will work, but won't have any product data.  You could use the [Cloud Dashboard](https://cloud.serverless.com/) to manually create add some, but the preview instance you created above via `share` is functionally identical.
