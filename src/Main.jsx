import List from "./components/List";
import { useEffect, useState } from "react";
import {v4 as uuidv4} from 'uuid';
function Main(){
    let [tasks, setTasks] = useState(() => {
        const storedTasks = localStorage.getItem('tasks');
        return !storedTasks ? [] : JSON.parse(storedTasks);
    });
    const [tasksTitle, setTasksTitle] = useState('');
    const updateParentComponent = (newTasks) => {
        setTasks([...newTasks]);
      }
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const addTasks = e => {
        if (e.key === 'Enter' && e.target.value !== ''){
            setTasks([
                ...tasks, {
                    id: uuidv4(),
                    title: tasksTitle,
                    status: false,
                    addedTaskTime: new Date().toLocaleTimeString()
                }
            ]
            );
            setTasksTitle('');
        }
    }

    const date = new Date();

    return (  
        <div className="container">
            <h1>Note your tasks</h1>
            <span>{date.toLocaleDateString()}</span>
            <div className="input-field">
                <input type="text"
                value={tasksTitle}
                onChange={event => setTasksTitle(event.target.value)}
                onKeyDown={addTasks}></input>
                <label>Task name</label>
            </div>
            <span>Undone tasks: {tasks.filter(el => el.status === false).length}</span>
            <List tasks={tasks} updateParent={updateParentComponent}/>
        </div> 
    );
}

export default Main;