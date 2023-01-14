import { ChangeEvent } from 'react';
import { useRecoilState } from 'recoil';
import { TodoItemType } from '../../app/recoil-study/todo/page';
import { todoListState } from '../../state/todoState';

export const TodoItem = ({ item }: { item: TodoItemType }) => {
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
