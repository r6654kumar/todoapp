import mongoose from 'mongoose';
const todoSchema=mongoose.Schema(
    {
        todoitem:{
            type:String,
            required:true
        },
    },
        {
            timeStamps:true
        }
    
);
export const TODO=mongoose.model('todolist',todoSchema);