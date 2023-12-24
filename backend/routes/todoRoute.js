import express from "express";
import {TODO} from '../models/todoModel.js'
const router=express.Router();
//adding a todo route
router.post('/', async (request, response) => {
    try {
        if (!request.body.todoitem) {
            return response.status(400).send({
                message: "Send to-do item",
            });
        }
        //else
        const newTodo = {
            todoitem: request.body.todoitem,
        };

        const todo = await TODO.create(newTodo);
        return response.status(201).json(todo);
        return response.status(201).send(todo);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
})

//route get all items from database
router.get('/', async (request, response) => {
    try {
        const items = await TODO.find({});
        return response.status(200).json({
            count: items.length,
            data: items
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

//route to delete an item from database
router.delete('/:todoitem', async (request, response) => {
    try {
        const { todoitem } = request.params;
        const result = await TODO.findOneAndDelete({ todoitem });
        if (!result) {
            return response.status(404).json({ message: 'Item not found' });
        }
        else
            return response.status(200).json({ message: 'Item Deleted Successfully' });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
})

//route to update a items from database
router.put('/:todoitem', async (request, response) => {
    try {
        if (!request.body.todoitem) {
            return response.status(400).send({
                message: "Enter to-do item",
            });
        }
        const { todoitem } = request.params;
        const result = await TODO.findOneAndUpdate({ todoitem }, request.body);
        if (!result) {
            return response.status(404).json({ message: 'Item not found' });
        }
        else
            return response.status(200).json({ message: 'Item Updated Successfully' });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
})

//route to delete all books from todo list
router.delete('/', async (request, response) => {
    try {
        const result = await TODO.deleteMany({});
        if (result.deletedCount === 0) {
            return response.status(404).json({ message: 'No items found to delete' });
        }
        return response.status(200).json({ message: 'All items deleted successfully' });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});
export default router;