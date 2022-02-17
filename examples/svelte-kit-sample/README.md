# Serverless Cloud SvelteKit Example

This is a SvelteKit sample application adapted for Serverless Cloud.

Notice how `svelte.config.js` makes use of our built-in helper to do most of the configuration for you! The Serverless Cloud Runtime will detect, build, and serve your application, no further configuration is required, but you can, as this example demonstrates, use the `svelte.config.js` file to configure things like methodOverride as well as proxy certain requests to the Cloud API local proxy.

> Note: We use `src/assets` as our pre-build assets directory, because `static` is where Cloud loads them from.  This is the opposite of SvelteKit, which uses `static` as the source directory.  This is why static is in `.gitignore`.

Check out `src/routes/todos/*.js` and see how easy it is to use the Cloud SDK directly to interact with Data, and see `./index.js` to see using the Data SDK to write event handlers for those data operations - write only a few lines of code to react to data events!