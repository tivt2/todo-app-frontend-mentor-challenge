import { Generic } from "../Generic";
import { Todo } from "./TodoItem/Todo";

export function NewTodo() {
  return (
    <Generic.Container>
      <Todo isNewTodo={true} />
    </Generic.Container>
  );
}
