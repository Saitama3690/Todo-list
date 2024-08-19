import React, {useContext, useState} from "react";
import todoContext from "../context/todo/todoContext";

const AddTodos = () => {
  const context = useContext(todoContext);
  const {addTodo} = context;

  const [todo, setTodo] = useState({task : "",desc : ""})

  const handleClick = (e)=>{
      e.preventDefault();
      addTodo(todo.task , todo.desc);
      setTodo({task : "",desc : ""})
  }

  const onChange = (e)=>{
      setTodo({...todo,[e.target.name]:e.target.value})
  }



  return (

    <div className="container my-3 shadow-wg p-5">
  <h1 className=" mb-4  text-border">Add a Task</h1>
  <form>
    <div className="mb-3">
      <label htmlFor="task " className="form-label">
        Task Name
      </label>
      <input
        type="text"
        className="form-control"
        id="task"
        name="task"
        value={todo.task}
        minLength={5}
        required
        onChange={onChange}
      />
    </div>
    <div className="mb-3">
      <label htmlFor="desc" className="form-label">
        Task Description
      </label>
      <input
        type="text"
        className="form-control"
        id="desc"
        name="desc"
        value={todo.desc}
        minLength={5}
        required
        onChange={onChange}
      />
    </div>
    <button type="submit" className="btn btn-primary btn-glow text-white" onClick={handleClick}>
      Add Task
    </button>
  </form>
</div>

  );
};

export default AddTodos;
