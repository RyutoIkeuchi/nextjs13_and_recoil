'use client';

import Link from 'next/link';
import { useRecoilCallback, useRecoilState, useRecoilValue } from 'recoil';
import {
	countState,
	multipleOf3Selector,
	squareCountSelector,
} from '../../state/countState';

export default function CountPage() {
	const [count, setCount] = useRecoilState(countState);
	const squareCount = useRecoilValue(squareCountSelector);
	const multipleOf3 = useRecoilValue(multipleOf3Selector);

	const alertCount = useRecoilCallback(
		({ snapshot }) =>
			async () => {
				const count = await snapshot.getPromise(countState);
				alert(count);
			},
		[]
	);

	return (
		<div>
			<div style={{ marginBottom: '20px' }}>
				<p>{multipleOf3}</p>
				<p>{count}</p>
				<p>{squareCount}</p>
				<button onClick={() => setCount(count + 1)}>+1</button>
				<button onClick={alertCount}>アラート表示</button>
			</div>
			<hr />
			<Link href="recoil-study/todo">Todo画面へ</Link>
		</div>
	);
}
