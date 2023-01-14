'use client';
import { ChangeEvent, useState } from 'react';
import {
	atom,
	selector,
	useRecoilState,
	useRecoilValue,
	useResetRecoilState,
	useSetRecoilState,
} from 'recoil';

type TodoItemType = {
	id: number;
	text: string;
	isComplete: boolean;
};

const todoListState = atom<Array<TodoItemType>>({
	key: 'TodoList',
	default: [],
});

const todoListFilterState = atom({
	key: 'TodoListFilter',
	default: 'Show All',
});

const todoListStatsState = selector({
	key: 'TodoListStats',
	get: ({ get }) => {
		const todoList = get(todoListState);
		const totalNum = todoList.length;
		const totalCompletedNum = todoList.filter((item) => item.isComplete).length;
		const totalUncompletedNum = totalNum - totalCompletedNum;
		const percentCompleted =
			totalNum === 0 ? 0 : (totalCompletedNum / totalNum) * 100;
		return {
			totalNum,
			totalCompletedNum,
			totalUncompletedNum,
			percentCompleted,
		};
	},
});

const filteredTodoListState = selector({
	key: 'FilteredTodoList',
	get: ({ get }) => {
		const filter = get(todoListFilterState);
		const list = get(todoListState);

		switch (filter) {
			case 'Show Completed':
				return list.filter((item) => item.isComplete);
			case 'Show Uncompleted':
				return list.filter((item) => !item.isComplete);
			default:
				return list;
		}
	},
});

export default function TodoList() {
	const todoList = useRecoilValue(filteredTodoListState);

	return (
		<>
			<TodoListStats />
			<TodoListFilters />
			<TodoItemCreator />
			<TodoItemReset />
			{todoList.map((todoItem) => (
				<TodoItem key={todoItem.id} item={todoItem} />
			))}
		</>
	);
}

function TodoItemCreator() {
	const [inputValue, setInputValue] = useState('');
	const setTodoList = useSetRecoilState(todoListState);

	const addItem = () => {
		setTodoList((oldTodoList) => [
			...oldTodoList,
			{
				id: getId(),
				text: inputValue,
				isComplete: false,
			},
		]);
		setInputValue('');
	};

	const onChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
		setInputValue(value);
	};

	return (
		<div>
			<input type="text" value={inputValue} onChange={onChange} />
			<button onClick={addItem}>Add</button>
		</div>
	);
}

let id = 0;
const getId = () => {
	return id++;
};

const TodoItemReset = () => {
	const resetList = useResetRecoilState(todoListState);
	return <button onClick={resetList}>Reset</button>;
};

const TodoItem = ({ item }: { item: TodoItemType }) => {
	const [todoList, setTodoList] = useRecoilState(todoListState);
	const index = todoList.findIndex((listItem) => listItem === item);

	const editItemText = ({
		target: { value },
	}: ChangeEvent<HTMLInputElement>) => {
		const newList = replaceItemAtIndex(todoList, index, {
			...item,
			text: value,
		});
		setTodoList(newList);
	};

	const toggleItemCompletion = () => {
		const newList = replaceItemAtIndex(todoList, index, {
			...item,
			isComplete: !item.isComplete,
		});
		setTodoList(newList);
	};

	const deleteItem = () => {
		const newList = removeItemAtIndex(todoList, index);
		setTodoList(newList);
	};

	return (
		<div>
			<input type="text" value={item.text} onChange={editItemText} />
			<input
				type="checkbox"
				checked={item.isComplete}
				onChange={toggleItemCompletion}
			/>
			<button onClick={deleteItem}>X</button>
		</div>
	);
};

const replaceItemAtIndex = (
	arr: TodoItemType[],
	index: number,
	newValue: TodoItemType
) => {
	return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
};

const removeItemAtIndex = (arr: TodoItemType[], index: number) => {
	return [...arr.slice(0, index), ...arr.slice(index + 1)];
};

const TodoListFilters = () => {
	const [filter, setFilter] = useRecoilState(todoListFilterState);
	const updateFilter = ({
		target: { value },
	}: ChangeEvent<HTMLSelectElement>) => {
		setFilter(value);
	};

	return (
		<>
			Filter:
			<select value={filter} onChange={updateFilter}>
				<option value="Show All">All</option>
				<option value="Show Completed">Completed</option>
				<option value="Show Uncompleted">Uncompleted</option>
			</select>
		</>
	);
};

const TodoListStats = () => {
	const { totalNum, totalCompletedNum, totalUncompletedNum, percentCompleted } =
		useRecoilValue(todoListStatsState);

	const formattedPercentCompleted = Math.round(percentCompleted);

	return (
		<ul>
			<li>Total items: {totalNum}</li>
			<li>Items completed: {totalCompletedNum}</li>
			<li>Items not completed: {totalUncompletedNum}</li>
			<li>Percent completed: {formattedPercentCompleted}</li>
		</ul>
	);
};
