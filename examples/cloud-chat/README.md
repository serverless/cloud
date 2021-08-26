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
Cloud Chat
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

**Cloud Chat**


[Cloud Chat](https://distributed-source-t9cms.cloud.serverless.com) is an iMessage-inspired chat application built on [Serverless ⚡️ Cloud](https://serverless.github.io/cloud/).

Find friends on the map and then start chatting. It's a fun way to make new friends from around the world. Be nice! 😀
# Developing
## Getting Started
Clone this repo, and navigate into the `examples/cloud-chat` directory...

```
git clone git@github.com:serverless/cloud.git
cd cloud/examples/cloud-chat/backend
```

Install the Cloud CLI (in package.json) and other dependencies
```
npm i 
```
## Setting up Auth0

- create an API
- create an Application

Update these values in `.env`:

- NEXT_PUBLIC_AUTH0_CLIENT_ID: the Client ID of your application
- NEXT_PUBLIC_AUTH0_DOMAIN: the Domain of your application
- NEXT_PUBLIC_AUTH0_AUDIENCE: the API Audience aka Identifier of your API

## Params

Create the following params in the [Serverless Cloud Dashboard](https://cloud.serverless.com) for the cloud-chat service:

- AUTH0_DOMAIN: "Domain" from your Auth0 application settings
- AUTH0_AUDIENCE: "Identifier" from your Auth0 API settings

Note - you will need to have run "npm start" or "cloud" to have your cloud-chat instance appear.

## Local dev

You can run the frontend on localhost and talk to the Cloud API.

1. Run `cloud start` in the backend folder

1. Change `NEXT_PUBLIC_API_URL` in .env.development to point to your personal instance URL

1. run `npm start` in the frontend folder

## Personal instance

1. Run `npm run build` in the frontend folder
1. Run `cloud start` in the backend folder

The `static` folder in the backend folder links to the `out` folder of the frontend app, so will be synced to your Cloud personal instance every time you build.

## Deploy to prod

In the Cloud shell, run `deploy prod --overwrite` to deploy to the `prod` named instance.
