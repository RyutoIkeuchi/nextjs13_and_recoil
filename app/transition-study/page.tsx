'use client';

import { ChangeEvent, Key, useState, useTransition } from 'react';

const generateProducts = () => {
	const products = [];
	for (let i = 0; i < 10000; i++) {
		products.push(`Product ${i + 1}`);
	}
	return products;
};

const ProductList = ({ products }: { products: string[] }) => {
	return (
		<ul>
			{products.map((product:string, index: Key) => (
				<li key={index}>{product}</li>
			))}
		</ul>
	);
};

const dummyProducts = generateProducts();

const filterProducts = (filterWord:string) => {
	if (!filterWord) {
		return dummyProducts;
	}

	return dummyProducts.filter((product) => product.includes(filterWord));
};

export default function UseTransitionTestPage() {
	const [isPending, startTransition] = useTransition();
	const [filterWord, setFilterWord] = useState('');

	const filteredProducts = filterProducts(filterWord);

	const updateFilterHandler = (event:ChangeEvent<HTMLInputElement>) => {
		startTransition(() => {
			setFilterWord(event.target.value);
		});
	};

	return (
		<div>
			<h1>useTransition</h1>
			<input
				type="text"
				placeholder="数字を入力してください"
				onChange={updateFilterHandler}
			/>
			<p>
				{isPending && (
					<span>
						プロダクトをアップデート中・・・
					</span>
				)}
			</p>
			<ProductList products={filteredProducts} />
		</div>
	);
}
