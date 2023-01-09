import { useEffect, useState } from 'react';

export const Toast: React.FC = () => {
	const [show, setShow] = useState(false);

	useEffect(() => {
		if (show) {
			setTimeout(() => {
				setShow(false);
			}, 3000);
		}
	}, [show]);

	return (
		<div>
			<button onClick={() => setShow(true)}>クリック</button>
			{show && <div role="alert">Hello World</div>}
		</div>
	);
};
