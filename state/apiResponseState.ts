import { atom, DefaultValue, selector } from 'recoil';

export const postsData = atom({
	key: 'PostsData',
	default: [],
});

export const postsDataSelector = selector({
	key: 'PostsDataSelector',
	get: async () => {
		const response = await fetch('https://jsonplaceholder.typicode.com/posts');
		const data = await response.json();
		return data;
	},
	set: ({ set }, newValue) => {
		if (newValue instanceof DefaultValue) {
			return newValue;
		} else {
			set(postsData, newValue);
		}
	},
});
