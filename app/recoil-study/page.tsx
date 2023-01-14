'use client';

import Link from 'next/link';
import { atom, selector, useRecoilState, useRecoilValue } from 'recoil';

const textState = atom({
	key: 'textState',
	default: '',
});

const charCountState = selector({
	key: 'charCountState',
	get: ({ get }) => {
		const text = get(textState);
		return text.length;
	},
});

const CharacterCount = () => {
	const count = useRecoilValue(charCountState);
	return <div>Character Count: {count}</div>;
};

export default function TextInput() {
	const [text, setText] = useRecoilState(textState);

	const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setText(event.target.value);
	};

	return (
		<div>
			<input type="text" value={text} onChange={onChange} />
			<br />
			Echo: {text}
			<CharacterCount />
			<Link href="recoil-study/todo">Todo画面へ</Link>
		</div>
	);
}
