import "./App.css";
import Header from "./myComponents/Header";
import Footer from "./myComponents/Footer";
import Todos from "./myComponents/Todos";
import AddTodos from './myComponents/AddTodos';
import About from "./myComponents/About";
// import TodoState from "./src/context/todo/TodoState";                               
import TodoState from "./context/todo/TodoState";
import React, { useState } from 'react';
import Login from "./myComponents/Login";
import Signup from "./myComponents/Signup";

import {
  BrowserRouter as Router,
  Switch,
  Routes,
  Route
} from "react-router-dom";
import Alert from "./myComponents/Alert";


function App() {
  // const onDelete = (todo) => {
  //   console.log("i am delete", todo);
  //   setTodos(todos.filter((e)=>{
  //     return e!==todo;
  //   }))
  // }


  // const [todos, setTodos] = useState ([
  //   {                 
  //     sno : 1,
  //     title: "go to the mall",
  //     desc: "you need to go to the  to get job done"
  //   },
  //   {
  //     sno : 2,
  //     title: "go to the park",
  //     desc: "you need to go to the park to get job done"
  //   },
  //   {
  //     sno : 3,
  //     title: "go to iskon",
  //     desc: "you need to go to iskon to get job done"
  //   }
  // ])

  return (
    <>
    <TodoState>
      <Router>
        <Header title = "My Todo Tasks" searchBar = {false}  />
        {/* <Alert message="bankaiii"/> */}
          {/* <Switch> */}
            <Routes>
            <Route  path="/" element={<><AddTodos/> <Todos />  </>}  />
            {/* <Route  path="/" element={} /> */}
                        
            <Route  path="/About" element={<About/>} />

            {/* login signip */}
            <Route  path="/login" element={<Login/>} />

            <Route  path="/signup" element={<Signup/>} />

             </Routes>
                
             {/* <Todos todosarr = {todos} onDelete = {onDelete}/> */}
        
             
      
      <Footer /> 
         {/* </Switch> */}
      </Router>
      </TodoState>
    </>
  );
}

export default App;
