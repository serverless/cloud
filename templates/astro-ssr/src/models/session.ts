import lightcookie from 'lightcookie';

export function isLoggedIn(request: Request): boolean {
	return !!getUserId(request)
}

export function getUserId(request: Request): string {
	const cookie = request.headers.get('cookie');
	const parsed = lightcookie.parse(cookie);
	return parsed['user-id']
}
