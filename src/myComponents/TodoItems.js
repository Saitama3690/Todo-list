import React, { useContext } from 'react'
import todoContext from '../context/todo/todoContext';
import Todos from './Todos';
// import Todos from './Todos'

const TodoItems = (props) => {
  const context = useContext(todoContext)
  const {deleteTodo} = context
  const {todo,updateTodo} = props;
  // console.log(Todos.length);
  return (
    <>
   <div className="card text-center col-md-3 "  >

  <div className="card-body">
    <h5 className="card-title">{todo.task}</h5>
    <p className="card-text">{todo.desc}

    </p>
    <a href="#" className="btn btn-primary m-3" onClick={()=>{deleteTodo(todo._id)}}> <i className="fa-solid fa-trash mx-4 "></i></a>
    <a href="#" className="btn btn-primary" onClick={()=>{updateTodo(todo)}}> <i className="fa-solid fa-pen-to-square mx-4"></i></a>
  </div>
</div>




    
    </>
  )
} 

export default TodoItems


//onClick={() => {onDelete(todo)}}