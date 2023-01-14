'use client';
import { useRecoilValue } from 'recoil';
import { TodoListFilters } from '../../../components/todo/TodoFiters';
import { TodoItem } from '../../../components/todo/TodoItem';
import { TodoItemCreator } from '../../../components/todo/TodoItemCreater';
import { TodoItemReset } from '../../../components/todo/TodoItemReset';
import { TodoListStats } from '../../../components/todo/TodoListStats';
import { filteredTodoListState } from '../../../state/todoState';

export type TodoItemType = {
	id: number;
	text: string;
	isComplete: boolean;
};

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
