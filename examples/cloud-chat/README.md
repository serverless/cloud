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

1. Run `npm start` in the `cloud-chat` root folder
1. Note the URL of your personal instances
1. Change `NEXT_PUBLIC_API_URL` in `frontend/.env.development` to your personal instance URL
1. Run `npm start` in the frontend folder
1. Visit the app at [http://localhost:3001](http://localhost:3001)

## Personal instance

To deploy the frontend to your personal instance:

1. Run `npm start` in the `cloud-chat` root folder
1. Run `npm run build` in the frontend folder. The build output will be synced to your personal instance.
1. Visit the app using your personal instance URL

## Deploy to production

1. Run `npm run build` in the frontend folder
1. Run `npx run deploy` in the `cloud-chat` root folder

The app will be deployed to the `production` instance.

## Backend tests

Run backend tests using `npm test` in the `cloud-chat` root folder

## Token Secret

A token secret is used to sign authorization tokens, so you should set it to a unique value to secure your tokens.

To set the token secret:

1. Go to the [Serverless Cloud Dashboard](https://cloud.serverless.com)
1. Go to the app page for `cloud-chat` and click the Parameters tab
1. Create a parmeter with the key: `TOKEN_SECRET` and set the value to be a random secret string
