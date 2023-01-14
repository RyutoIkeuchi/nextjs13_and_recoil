import { useResetRecoilState } from "recoil";
import { todoListState } from "../../state/todoState";

export const TodoItemReset = () => {
	const resetList = useResetRecoilState(todoListState);
	return <button onClick={resetList}>Reset</button>;
};