import { useState } from "react";

export default function Item(props){
    const [checked, setChecked] = useState(props.status);
    const classes = ['todo'];

    if (checked)
    {
        classes.push('status');
    }

    const updateStatus = () => {
        setChecked(!checked);
        const storedTasks = JSON.parse(localStorage.getItem('tasks'));
        storedTasks.map(el => {
            if(el.id === props.id)
            {
                el.status = !checked;
            }
            return true;
        });
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    const removeElement = () => {
        const storedTasks = JSON.parse(localStorage.getItem('tasks'));
        const removedTasks = storedTasks.filter(el => {
            if(el.id === props.id)
            {
                return false;
            }
            return true;
        });
        props.updateParent(removedTasks);
    };
    return (
        <>
        {
            //visible && 
            (<li className={classes.join(' ')}>
            <label>
                <input type="checkbox"
                checked={checked}
                onChange={updateStatus}/>
                <span>{props.title}</span>
                <i className="material-icons red-text"
                onClick={removeElement}>X</i>
            </label>
            
        </li>)
        }
          
        </>
    );
}