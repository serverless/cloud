import type { AddToCartItem } from './pages/api/cart'

export async function addItemToCart(item: AddToCartItem) {
    const res = await fetch('/api/cart', {
        credentials: 'same-origin',
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
        }),
        body: JSON.stringify(item),
    });

    if (res.status === 401) {
        document.location.replace('/login')
    } else {
        return await res.json()
    }
}
