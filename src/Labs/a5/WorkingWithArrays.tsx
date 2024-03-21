import React, { useState, useEffect } from "react";
import axios from "axios";

interface Todo {
  id: any;
  title: any;
  description: any;
  due: any;
  completed: any;
}

const API_BASE = process.env.REACT_APP_API_BASE;

function WorkingWithArrays() {
  const API = `${API_BASE}/a5/todos`;
  const [todo, setTodo] = useState({
    id: 1,
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-09-09",
    completed: false,
  });
  const [todos, setTodos] = useState<Todo[]>([]);
  const fetchTodos = async () => {
    const response = await axios.get(API);
    setTodos(response.data);
  };
  const fetchTodoById = async (id: any) => {
    const response = await axios.get(`${API}/${id}`);
    setTodo(response.data);
  };
  const createTodo = async () => {
    const response = await axios.get(`${API}/create`);
    setTodos(response.data);
  };
  const updateTitle = async () => {
    const response = await axios.get(`${API}/${todo.id}/title/${todo.title}`);
    setTodos(response.data);
  };
  const postTodo = async () => {
    const response = await axios.post(API, todo);
    setTodos([...todos, response.data]);
  };
  const [errorMessage, setErrorMessage] = useState(null);
  const deleteTodo = async (todo: { id: any; }) => {
    try {
      const response = await axios.delete(
        `${API}/${todo.id}`);
      setTodos(todos.filter((t) => t.id !== todo.id));
    } catch (error: any) {
      console.log(error);
      setErrorMessage(error.response.data.message);
    }
  };
  const updateTodo = async () => {
    try {
      const response = await axios.put(
        `${API}/${todo.id}`, todo);
      setTodos(todos.map((t) => (
        t.id === todo.id ? todo : t)));
    } catch (error: any) {
      console.log(error);
      setErrorMessage(error.response.data.message);
    }
  };
  useEffect(() => {
    fetchTodos();
  }, []);
  return (
    <div>
      <h2>Working with Arrays</h2>
      <input type="number" value={todo.id}
        onChange={(e) => setTodo({
          ...todo, id: parseInt(e.target.value)
        })} />
      <br />
      <input type="text" value={todo.title}
        onChange={(e) => setTodo({
          ...todo, title: e.target.value
        })} />
      <br />
      <input type="text" value={todo.description}
        onChange={(e) => setTodo({
          ...todo, description: e.target.value
        })} />
      <br /><br />
      <input value={todo.id} readOnly />
      <br />
      <input onChange={(e) => setTodo({ ...todo, title: e.target.value })} value={todo.title} type="text" />
      <br />
      <textarea value={todo.description} onChange={(e) => setTodo({ ...todo, description: e.target.value })} />
      <br />
      <input value={todo.due} type="date" onChange={(e) => setTodo({ ...todo, due: e.target.value })} />
      <br />
      <label>
        <input type="checkbox" onChange={(e) => setTodo({ ...todo, completed: e.target.checked })} />
        &nbsp;Completed
      </label>
      <br /><br />

      <button className="btn btn-warning w-25" style={{ marginBottom: "5px" }} onClick={postTodo}>
        Post Todo
      </button>
      <br />
      <button className="btn btn-info w-25" style={{ marginBottom: "5px" }} onClick={updateTodo}>
        Update Todo
      </button>
      <br />
      <button className="btn btn-primary w-25" style={{ marginBottom: "5px" }} onClick={createTodo} >
        Create Todo
      </button>
      <br />
      <button className="btn btn-success w-25" style={{ marginBottom: "5px" }} onClick={updateTitle} >
        Update Title
      </button>
      {errorMessage && (
        <div className="alert alert-danger mb-2 mt-2">
          {errorMessage}
        </div>
      )}
      <ul className="list-group w-25">
        {todos.map((todo: { id: number; title: string }) => (
          <li key={todo.id} className="list-group-item">
            {todo.title}
            <button className="btn btn-warning float-end me-2" onClick={() => fetchTodoById(todo.id)} >
              Edit
            </button>
            <button className="btn btn-danger float-end me-2" onClick={() => deleteTodo(todo)} >
              Delete
            </button>
          </li>
        ))}
      </ul>

      <h3>Updating an Item in an Array</h3>
      <a className="btn btn-primary" href={`${API}/${todo.id}/title/${todo.title}`} >
        Update Title to {todo.title}
      </a>

      <h4>Retrieving Arrays</h4>
      <a className="btn btn-primary" href={API}>
        Get Todos
      </a>

      <h4>Retrieving an Item from an Array by ID</h4>
      <input value={todo.id}
        onChange={(e) => setTodo({
          ...todo,
          id: parseInt(e.target.value)
        })} /> &nbsp;
      <a className="btn btn-danger" href={`${API}/${todo.id}`}>
        Get Todo by ID
      </a>

      <h3>Filtering Array Items</h3>
      <a className="btn btn-primary" href={`${API}?completed=true`}>
        Get Completed Todos
      </a>

      <h3>Creating new Items in an Array</h3>
      <a className="btn btn-primary" href={`${API}/create`}>
        Create Todo
      </a>

      <h3>Deleting from an Array</h3>
      <a className="btn btn-primary" href={`${API}/${todo.id}/delete`}>
        Delete Todo with ID = {todo.id}
      </a>

      <h3>Editing from an Array</h3>
      <a className="btn btn-danger me-2" href={`${API}/${todo.id}/completed/${todo.completed}`}>
        Complete Todo ID = {todo.id}
      </a>
      <input type="checkbox"
        onChange={(e) => setTodo({
          ...todo,
          completed: e.target.checked
        })}
        checked={todo.completed} /> Completed &nbsp;
      <input type="checkbox"
        onChange={(e) => setTodo({
          ...todo,
          completed: !e.target.checked
        })}
        checked={!todo.completed} /> Not Completed
      <br />
      <br />
      <a className="btn btn-danger me-2" href={`${API}/${todo.id}/description/${todo.description}`}>
        Describe Todo ID = {todo.id}
      </a>
      <input type="text"
        onChange={(e) => setTodo({
          ...todo,
          description: e.target.value
        })}
        value={todo.description} />
    </div>
  );
}
export default WorkingWithArrays;