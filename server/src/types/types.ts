type Tdb = {
  [userId: string]: Tuser;
};

type Tuser = {
  id: string;
  username: string;
  password: string;
  todos: { [todoId: string]: TtodoItem };
  todosOrder: string[];
};

type TtodoItem = {
  id: string;
  content: string;
  complete: boolean;
};

export { Tuser, TtodoItem, Tdb };
