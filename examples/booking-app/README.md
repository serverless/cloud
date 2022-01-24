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
The Serverless Booking App
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

**Serverless Booking App**

[![Deploy to Serverless Cloud](https://cloud.serverless.com/deploy.svg)](https://cloud.serverless.com/start/clone?repoUrl=https%3A%2F%2Fgithub.com%2Fserverless%2Fcloud%2Ftree%2Fmain%2Fexamples%2Fbooking-app)

To get started, clone this repo, and navigate into the `examples/booking-app` directory...

```
git clone git@github.com:serverless/cloud.git
cd cloud/examples/booking-app
```

Install the Cloud CLI (in package.json) and other dependencies
```
npm i 
```

Next, start your Serverless Cloud experience with the `start` command...

```
npm start
```

Finally, you'll need to set the `TOKEN_SECRET` param in the [Serverless Cloud Dashboard](https://cloud.serverless.com) to any strong value of your choice. This will be what user's tokens are signed with.

Seed some data by running 
```
import --overwrite
```
while in Interactive mode.

To try some endpoints out, open up the Postman collection and set the URL parameter to the one displayed in your terminal.
