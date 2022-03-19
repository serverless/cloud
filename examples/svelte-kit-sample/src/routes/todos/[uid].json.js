import { data } from '@serverless/cloud';

// PATCH /todos/:uid.json
export const patch = async (event) => {
	const formData = await event.request.formData();
	const uid = event.params.uid;

	const todo = await data.get(`todo#${event.locals.userid}:${uid}`);

	if (todo) {
		Object.assign(todo, {
			done: formData.has('done') ? !!formData.get('done') : todo.done,
			text: formData.has('text') ? formData.get('text') : todo.text
		});

		await data.set(`todo#${event.locals.userid}:${uid}`, todo);
	
		return {
			status: 200
		};
	}

	return {
		status: 404
	};
};

// DELETE /todos/:uid.json
export const del = async (event) => {
	const uid = event.params.uid;

	await data.remove(`todo#${event.locals.userid}:${uid}`);

	return {
		status: 303,
		headers: {
			location: '/todos'
		}
	};
};
