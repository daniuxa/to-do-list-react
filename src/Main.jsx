import List from "./components/List";
import { useState } from "react";
import {v4 as uuidv4} from 'uuid';
import { useSelector, useDispatch } from "react-redux";
import { addTask } from "./store/tasksSlice";

function Main(){
    let tasks = useSelector((state) => 
    {
        return state.tasksValue.tasks
    });
    const dispatch = useDispatch();

    const [tasksTitle, setTasksTitle] = useState('');

    const addTasks = e => {
        if (e.key === 'Enter' && e.target.value !== ''){
            dispatch(addTask({
                id: uuidv4(),
                title: tasksTitle,
                status: false,
                addedTaskTime: new Date().toLocaleTimeString()
            }));
            setTasksTitle('');
        }
    }

    return (  
        <div className="container">
            <h1>Note your tasks</h1>
            <span>{(new Date()).toLocaleDateString()}</span>
            <div className="input-field">
                <input type="text"
                value={tasksTitle}
                onChange={event => setTasksTitle(event.target.value)}
                onKeyDown={addTasks}></input>
                <label>Task name</label>
            </div>
            <span>Undone tasks: {tasks.filter(el => el.status === false).length}</span>
            <List tasks={tasks} />
        </div> 
    );
}

export default Main;