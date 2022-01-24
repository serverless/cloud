<br>
<br>
<br>
<br>
<br>
<br>
<br>
<p align="center">
⚡️
<br>
<br>
<b>cloud.serverless.com</b>
<br>
Image Resizer
</p>

<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>

**Image Resizer**

[Image Resizer](https://purple-art-64y4z.cloud.serverless.com/) is an image editor built on [Serverless ⚡️ Cloud](https://serverless.com/cloud/).

[![Deploy to Serverless Cloud](https://cloud.serverless.com/deploy.svg)](https://cloud.serverless.com/start/clone?repoUrl=https%3A%2F%2Fgithub.com%2Fserverless%2Fcloud%2Ftree%2Fmain%2Fexamples%2Fimage-resizer)

# Developing

## Getting Started

Clone this repo, and navigate into the `examples/image-resizer` directory...

```
git clone git@github.com:serverless/cloud.git
cd cloud/examples/image-resizer
```

Install dependencies

```
npm i
```

## Local dev

You can run the frontend on localhost and talk to the Cloud API.

1. Run `npm start` in the `image-resizer` root folder
1. Note the URL of your developer sandbox
1. Change the baseUrl in `frontend/api.js` to your personal url + /api
1. Run `npm start` in the frontend folder
1. Visit the app at [http://localhost:3000](http://localhost:3000)

## Developer sandbox

To deploy the frontend to your developer sandbox:

1. Run `npm start` in the `image-resizer` root folder
1. Run `npm run build` in the frontend folder. The build output will be synced to your developer sandbox.
1. Visit the app using your developer sandbox URL

## Deploy to production

1. Run `npm run build` in the frontend folder
1. Run `cloud deploy production` in the `image-resizer` root folder

The app will be deployed to the `production` instance.
