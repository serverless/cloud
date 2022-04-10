import { data } from '@serverless/cloud'
import type { Product } from './product'

export interface Cart {
    total: number,
	items: Array<{
		id: string;
		name: string;
		count: number;
	}>;
}

export async function getCart(userId: string): Promise<Cart> {
    const items = []

    if (userId) {
        const cart = await data.get(`cart:${userId}`);

        if (cart) {
            const entries = Object.entries(cart)

            await Promise.all(entries.map(async ([id, count]) => {
                const product = await data.get(`products:${id}`) as Product
                
                if (product) {
                    items.push({ id, name: product.name, count })
                }
            }))
        }
    }

    const total = items.reduce((sum, item) => sum + item.count, 0);

    items.sort((a, b) => a.name.localeCompare(b.name))

    return { total, items } as Cart
};

export async function addToCart(userId: string, itemId: string) {
    const res = await data.add(`cart:${userId}`, String(itemId), 1)
    const entries = Object.entries(res)
    const total = entries.reduce((sum, [id, count]) => sum + count, 0)
    
    return { total }
}

export async function resetCart(userId: string) {
    await data.remove(`cart:${userId}`)
}
