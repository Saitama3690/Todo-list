import React, { useContext, useEffect, useState, useRef } from "react";
import TodoItems from "./TodoItems";
import todoContext from "../context/todo/todoContext";
import { useNavigate } from "react-router-dom";

const Todos = (props) => {
  let navigate = useNavigate();
  const context = useContext(todoContext);
  const { todos, editTodo, getTodo } = context;

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getTodo();
    }
    //eslint-disable-next-line
    else {
      navigate("/Login");
    }
  }, []);

  var ref = useRef(null);
  var refClose = useRef(null);

  const [todo, setTodo] = useState({ id: "", etask: "", edesc: "" });

  //update a note on click
  const updateTodo = (currentTodo) => {
    ref.current.click();
    setTodo({
      id: currentTodo._id,
      etask: currentTodo.task,
      edesc: currentTodo.desc,
    });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    // addTodo(todo.task , todo.desc);
    await editTodo(todo.id, todo.etask, todo.edesc);
    // setTodo({id: currentTodo._id, etask: currentTodo.task , edesc: currentTodo.desc});

    refClose.current.click();
  };

  const onChange = (e) => {
    setTodo({ ...todo, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="container ">
        <button
          type="button"
          className="btn btn-primary d-none"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          ref={ref}
        >
          Edit Task
        </button>

        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Edit Task
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="etask" className="form-label">
                      Task Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="etask"
                      value={todo.etask}
                      name="etask"
                      onChange={onChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="edesc" className="form-label">
                      Task Description
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="edesc"
                      value={todo.edesc}
                      name="edesc"
                      onChange={onChange}
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  ref={refClose}
                >
                  Close
                </button>
                <button
                  onClick={handleClick}
                  type="button"
                  className="btn btn-primary"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>

        <h3 className="text-center mt-4 ">Your Pending Tasks</h3>
        <div className="container m-3">
          {todos.length === 0 && (
            <p className="text-center text-white">No tasks are pending</p>
          )}
        </div>
        <div className="row my-3">
          {todos.map((todo) => (
            <TodoItems key={todo._id} updateTodo={updateTodo} todo={todo} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Todos;
