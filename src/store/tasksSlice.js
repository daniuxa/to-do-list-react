import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    tasks: (() => 
    {
        const storedTasks = JSON.parse(localStorage.getItem('tasks'));
        return !storedTasks ? [] : storedTasks;
    })()
}

export const tasksSlice = createSlice({
    name: "tasksValue",
    initialState,
    reducers: {
        addTask : (state, action) => {
            state.tasks.push(action.payload);
            localStorage.setItem('tasks', JSON.stringify(state.tasks));
        },
        removeTask : (state, action) => {
            const arr = [];
            state.tasks.map(el => {
                if(el.id === action.payload)
                {
                    return false;
                }
                arr.push(el);
                return true;
            });

            state.tasks = [...arr]
            localStorage.setItem('tasks', JSON.stringify(state.tasks));
        },
        changeStatus : (state, action) => {
            state.tasks.map(el => {
                if(el.id === action.payload)
                {
                    el.status = !el.status;
                }
                return true;
            });
            localStorage.setItem('tasks', JSON.stringify(state.tasks));
        }
    }
});

export const {addTask, removeTask, changeStatus} = tasksSlice.actions;

export default tasksSlice.reducer;