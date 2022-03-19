import { api, data } from '@serverless/cloud'

api.get('/api/healthcheck', (req, res) => {
    res.status(200).send('hello world!')
})

data.on(['created', 'updated'], async event => {
    console.log('data event!', event)
})
