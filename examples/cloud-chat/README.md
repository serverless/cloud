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

[Cloud Chat](https://distributed-source-t9cms.cloud.serverless.com) is an iMessage-inspired chat application built on [Serverless ⚡️ Cloud](https://serverless.com/cloud/).

Find friends on the map and then start chatting. It's a fun way to make new friends from around the world. Be nice! 😀

# Developing

## Getting Started

Clone this repo, and navigate into the `examples/cloud-chat` directory...

```
git clone git@github.com:serverless/cloud.git
cd cloud/examples/cloud-chat
```

Install dependencies

```
npm i
```

## Local dev

You can run the frontend on localhost and talk to the Cloud API.

1. Run `npm start` in the backend folder
1. Change `NEXT_PUBLIC_API_URL` in `.env.development` to be the personal instance URL that is displayed in the Cloud shell
1. Run `npm start` in the frontend folder

The app will be available at [http://localhost:3001](http://localhost:3001)

## Personal instance

To deploy the frontend to your personal instance:

1. Run `npm run build` in the frontend folder
1. Run `npm start` in the backend folder

The frontend build output will be synced to your Cloud personal instance every time you build.

The app will be available at your personal instance URL, eg. [https://elegant-package-huklr.cloud.serverless.com/](https://elegant-package-huklr.cloud.serverless.com/)

## Deploy to production

1. Run `npm run build` in the frontend folder
1. Run `npx run deploy` in the backend folder

The app will be deployed to the `production` instance.

## Backend tests

Run backend tests using `npm test` in the backend folder.

## Token Secret

A token secret is used to sign authorization tokens, so you should set it to a unique value to secure your tokens.

To set the token secret:

1. Go to the [Serverless Cloud Dashboard](https://cloud.serverless.com)
1. Go to the app page for `cloud-chat` and click the Parameters tab
1. Create a parmeter with the key: `TOKEN_SECRET` and set the value to be a random secret string
