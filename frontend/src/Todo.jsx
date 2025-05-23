import React, { useState } from "react";
import { nanoid } from "nanoid";
import "./App.css";
const Todo = () => {
  const [task, setTask] = useState("");
  const [todo, setTodo] = useState([
    {
      id: nanoid(),
      text: "react",
      state: false,
    },
    {
      id: nanoid(),
      text: "js",
      state: false,
    },
  ]);
  const handleTodo = () => {
    if (!task.trim()) return;
    const item = {
      id: nanoid(),
      text: task,
      state: false,
    };
    setTodo((prev) => [...prev, item]);
    setTask("");
  };
  const toggleState = (id) => {
    setTodo(
      todo.map((t) => {
        if (t.id === id) {
          return {
            ...t,
            state: !t.state,
          };
        } else {
          return t;
        }
      })
    );
  };

  const handleDelete = (id) => {
    setTodo(todo.filter((t) => t.id !== id));
  };

  return (
    <>
      <h1>Todo List</h1>
      <input
        type="text"
        placeholder="enter todo"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />

      <button onClick={handleTodo}>Add</button>
      <ul>
        {todo.map((t) => (
          <li key={t.id}>
            <input
              type="checkbox"
              checked={t.state}
              onChange={() => toggleState(t.id)}
            />
            <span className={t.state ? "strike" : ""}>{t.text}</span>
            <button onClick={() => handleDelete(t.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Todo;
