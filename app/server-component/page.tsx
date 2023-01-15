import { use } from 'react';

export default function ServerComponentPage() {
	const fetchData = async () => {
		const response = await fetch(
			'https://jsonplaceholder.typicode.com/comments'
		);
		const data = await response.json();
		return data;
	};

  const data = use(fetchData());

	return (
		<div>
			<ul>
				{data.map((item:any) => (
					<li key={item.id}>{item.name}</li>
				))}
			</ul>
		</div>
	);
}
