export const formUrlQuery = (
	searchParams: string,
	key: string,
	value: string,
) => {
	const params = new URLSearchParams(searchParams);
	params.set(key, value);
	const newPathName = `${window.location.pathname}?${params}`;
	return newPathName;
};

export const removeUrlQuery = (searchParams: string, key: string[]) => {
	const params = new URLSearchParams(searchParams);
	// biome-ignore lint/complexity/noForEach: <explanation>
	key.forEach((item) => {
		params.delete(item);
	});
	const newPathName = `${window.location.pathname}?${params}`;
	return newPathName;
};
