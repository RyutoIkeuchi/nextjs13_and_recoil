import { atom, selector } from 'recoil';

export const countState = atom({
	key: 'Count',
	default: 0,
});

export const squareCountSelector = selector({
	key: 'SquareCount',
	get: ({ get }) => {
		const count = get(countState);
		return count ** 2;
	},
});

export const multipleOf3Selector = selector({
	key: 'MultipleOf3',
	get: ({ get }) => {
		const count = get(countState);
    const isMultipleOf3 = () => {
      if (count === 0) {
        return false
      }
      return count % 3 === 0;
    }
		return isMultipleOf3() ? '３の倍数' : 'その他の値';
	},
});
