# Serverless Cloud Web3 Example

[![Deploy to Serverless Cloud](https://cloud.serverless.com/deploy.svg)](https://cloud.serverless.com/start/clone?repoUrl=https%3A%2F%2Fgithub.com%2Fserverless%2Fcloud%2Ftree%2Fmain%2Fexamples%2Fweb3)

This is a work in progress that demonstrates how to use web3 + rarible in Serverless Cloud given that they have a very large footprint.  It uses esbuild to produce a bundle of under 5mb compared to the over 200mb installed size of these projects.

The caveat of this approach is that your entire node_modules folder is ignored, so other libraries also need to be brought in to the bundle.  `dayjs` has been included to serve as an example.  While it is not convenient, hopefully your dependencies do not change too often and the 500ms or so it takes to `npm run build` is acceptable for now, and we will explore ways to improve this experience.

PRs to help make this a full-fledged example are welcome!
