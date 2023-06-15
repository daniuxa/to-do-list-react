import { useState } from "react";

export default function Item(props){
    const [checked, setChecked] = useState(props.status);
    const [redactedTitle, setRedactedTitle] = useState('');
    const [pressedRedactField, setPressedRedactField] = useState(false);
    const [tasksTitle, setTasksTitle] = useState(props.title);
    const classesForLi = ['todo'];
    const classesForTitle = ['title'];
    let classesForRedactInput = ['input-field', 'nonVisible'];


    if (checked)
    {
        classesForLi.push('status');
    }

    if (pressedRedactField)
    {
        classesForTitle.push('nonVisible');
        classesForRedactInput = ['input-field'];
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
        props.updateParent(storedTasks);
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

    const redactTitle = e => {
        if (e.key === 'Enter' && e.target.value !== ''){
            setRedactedTitle();
            //setTasksTitle('');
        }
    }

    const makeVisibleReadactField = () => {

    }

    return (
        <>
        {
            (<li className={classesForLi.join(' ')}>
            <label>
                <div className="inputFields">
                    <input type="checkbox"
                    checked={checked}
                    onChange={updateStatus}/>
                    <span className={classesForTitle.join(' ')}>{props.title}</span>

                    <input
                    className={classesForRedactInput.join(' ')}
                    type="text"
                    value={tasksTitle}
                    onChange={event => setTasksTitle(event.target.value)}
                    //onKeyDown={redactTitle}
                    ></input>
    
                    <span className="redact"
                    onClick={() => {setPressedRedactField(!pressedRedactField);}}
                    >✎</span>  
                </div> 
                <span className="time">Added at {props.addedTaskTime}</span>   
                <i className="material-icons red-text"
                onClick={removeElement}>X</i>
            </label>
            
        </li>)
        }
          
        </>
    );
}