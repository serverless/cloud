import { data, events } from '@serverless/cloud'

data.on(['created', 'updated'], async ({ item }) => {
    if (item.key.startsWith('cart')) {
        console.log('item added to cart, scheduling a follow-up')
        await events.publish('cart.followup', { after: '3 seconds' }, item.key)
    }
})

events.on('cart.followup', async (event: any) => {
    const cart = await data.get(event.body as string)
    
    if (cart) {
        if (Object.values(cart).reduce((memo, value) => memo + Number(value), 0) > 0) {
            console.log('There are still items in the cart')
        }
    }
})
