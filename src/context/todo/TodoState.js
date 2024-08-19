import React, { useState } from "react";
import TodoContext from "./todoContext";

const TodoState = (props) =>{
    const host = "http://localhost:5000"
    const todosInitial = [];

      const [todos,setTodo] = useState(todosInitial)

      // get all task
      const getTodo =async () =>{
        //api call

        const response = await fetch(`https://todolist-30q6bf4vr-akshil-rajputs-projects.vercel.app/api/todo/fetchalltasks`, { 
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        const json = await response.json();
        console.log(json);
        setTodo(json)
      }

      // Add a task 

      const addTodo =async (task,desc) =>{
        //api call

        const response = await fetch(`https://todolist-30q6bf4vr-akshil-rajputs-projects.vercel.app/api/todo/addatask`, { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({task,desc})
        });
       const todo = await response.json();
       setTodo(todos.concat(todo))

       }

      //  Delete a task
      const deleteTodo = async(id) =>{
        // API call
        const response = await fetch(`https://todolist-30q6bf4vr-akshil-rajputs-projects.vercel.app/api/todo/deletetask/${id}`, { 
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json',
              'auth-token': localStorage.getItem('token')
          }
      });
      const json = await response.json();
      console.log(json)

            console.log("Deleting the task with id" + id)
            const newTodo = todos.filter((todo)=>{return todo._id!==id})
            setTodo(newTodo)
      }

      // Edit a task
      const editTodo =async (id,task, desc) =>{

        
        const response = await fetch(`https://todolist-30q6bf4vr-akshil-rajputs-projects.vercel.app/api/todo/updatetask/${id}`, { 
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({task,desc})
            
        });
        const json = await response.json();
        console.log(json)


        //editable todos
        let newTodos = JSON.parse(JSON.stringify(todos))

        for (let index = 0; index < newTodos.length; index++) {
            const element = newTodos[index];
            if(element._id === id){
                newTodos[index].task = task;
                newTodos[index].desc = desc;
                break;
            }
        }   
        console.log(id,todos,todos)
        setTodo(newTodos)
      }

    return(


        <TodoContext.Provider value={{todos,setTodo,addTodo,deleteTodo,editTodo,getTodo}}>
            {props.children}
        </TodoContext.Provider>
    )
}

export default TodoState;