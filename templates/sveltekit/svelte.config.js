import withCloud from '@serverless/cloud/svelte'

export default withCloud({
    kit: {
        methodOverride: {
            allowed: ['PATCH', 'DELETE']
        },
        vite: {
            server: {
                proxy: {
                    '/api': `http://localhost:${process.env.CLOUD_PORT}`
                }
            },
        }
    }
})
