'use client';
import { Suspense, useEffect } from 'react';
import { useRecoilRefresher_UNSTABLE, useRecoilState } from 'recoil';
import { postsDataSelector } from '../../../state/apiResponseState';

export default function ApiTestPage() {
	return (
		<div>
			<Suspense fallback={<div>Loading....</div>}>
				<PostsList />
			</Suspense>
		</div>
	);
}

const PostsList = () => {
	const [posts, store] = useRecoilState(postsDataSelector);
	const refresh = useRecoilRefresher_UNSTABLE(postsDataSelector);

	useEffect(() => {
		store(posts);
	}, []);

	return (
		<div>
			<button onClick={() => refresh()}>リフレッシュ</button>
			{posts.map((post: any) => (
				<p key={post.id}>{post.title}</p>
			))}
		</div>
	);
};
