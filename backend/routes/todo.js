const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { body, validationResult } = require('express-validator');
var fetchuser = require("../middleware/fetchuser");
const Todo = require("../models/Todo");

// Route1 : get all the tasks
router.get('/fetchalltasks',fetchuser ,async (req,res)=>{
    try {
        const Todos = await Todo.find({user: req.user.id});
        res.json(Todos);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("some error occured");
      }
})


  


 
// Route2 : Add a task     (login required)
router.post('/addatask',fetchuser, [
    body("task", "title must be 3 characters long").isLength({ min: 3 }),
    body("desc", "Description must be 5 characters long").isLength({min : 3})                                 
] ,async (req,res)=>{
    try{

     //if there are errors, return bad request
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
       return res.status(400).json({ errors: errors.array() });
     }

     // Add components in a task new task
     const {task, desc} = req.body;

     const todo = new Todo({
        task, desc ,user: req.user.id
     })
     
    //  adding that task
     const savedTodo =await todo.save();
res.json(savedTodo);

} catch (error) {
    console.error(error.message);
    res.status(500).send("some error occured");
  }
})



// Route3 : Add a task muhehehehe    (login required)
router.put('/updatetask/:id',fetchuser, async(req,res) =>{

    try{
    const {task,desc} = req.body;
    // Create a newTodo object to update the currentOne
    const newTodo = {} ;
        if(task){newTodo.task = task };
        if(desc){newTodo.desc = desc };
        
        
        //find the Id of task to be updated
        let todo = await Todo.findById(req.params.id);
        if(!todo){
            return res.status(404).send("Not found") 
        }

        //check whether the user is updating his own tasks only (not other's)🐱‍💻 //authentication
        if(todo.user.toString() !== req.user.id){
            return res.status(401).send('not allowed')
        }

        //finally updating the changes

        todo = await Todo.findByIdAndUpdate(req.params.id, {$set: newTodo},{new : true}) 

        res.json(todo);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("some error occured");
      }
})    



// Route 4 : Delete a Task    (login required)
router.delete('/deletetask/:id',fetchuser, async(req,res) =>{
        try{
        
        
        //find the Id of task to be deleted
        let todo = await Todo.findById(req.params.id);
        if(!todo){
            return res.status(404).send("Not found") 
        }

        //check whether the user is updating his own tasks only (not other's)🐱‍💻 //authentication
        if(todo.user.toString() !== req.user.id){
            return res.status(401).send('not allowed')
        }

        //finally deleting the changes

        todo = await Todo.findByIdAndDelete(req.params.id) 
        res.json({"success" : "note has been deleted", todo : todo});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("some error occured");
      }
})  

module.exports = router;