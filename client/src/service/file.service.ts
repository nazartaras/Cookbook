export const uploadFile = async (file: FormData) => {
	const response = await fetch(`/api/image/upload`, {
		method: 'POST',
		body: file
	});
	return await response.json();
};