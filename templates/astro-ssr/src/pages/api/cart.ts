import { getUserId } from '../../models/session';
import { addToCart } from '../../models/cart';

export interface AddToCartItem {
	id: string;
	name: string;
}

export async function post(_params: any, request: Request) {
	const userId = getUserId(request)

	if (!userId) {
		return new Response('Not logged in', {
			status: 401,
		});
	}

	const item: AddToCartItem = await request.json();
	const { total } = await addToCart(userId, item.id);

	return {
		body: JSON.stringify({
			total
		}),
	};
}
