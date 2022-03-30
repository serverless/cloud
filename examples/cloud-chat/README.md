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

[![Deploy to Serverless Cloud](https://cloud.serverless.com/deploy.svg)](https://cloud.serverless.com/start/clone?repoUrl=https%3A%2F%2Fgithub.com%2Fserverless%2Fcloud%2Ftree%2Fmain%2Fexamples%2Fcloud-chat)

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

Install Serverless Cloud if you haven't already

```
npm i -g @serverless/cloud
```

## Local development

In one terminal window, run `cloud dev` to run the Next.js dev server.

In another terminal window, run `cloud` to run the Serverless Cloud shell.

The application will be available at http://localhost:3000

## Deploy to production

`cloud deploy production`

The production URL will be displayed when the deployment is complete.

## Backend tests

`cloud test`

## Token Secret

A token secret is used to sign authorization tokens, so you should set it to a unique value to secure your tokens.

To set the token secret:

1. Go to the [Serverless Cloud Dashboard](https://cloud.serverless.com)
1. Go to the app page for `cloud-chat` and click the Parameters tab
1. Create a parmeter with the key: `TOKEN_SECRET` and set the value to be a random secret string
