import { resetCart } from '../models/cart'

const userId = '1'

export async function post() {
	await resetCart(userId)

	return new Response(null, {
		status: 301,
		headers: {
			Location: '/',
			'Set-Cookie': `user-id=${userId}; Path=/; Max-Age=2592000`,
		},
	});
}
