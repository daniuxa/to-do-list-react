import { useState } from "react";
import { useDispatch } from "react-redux";
import { removeTask, changeStatus } from "../store/tasksSlice";

export default function Item(props){
    const [checked, setChecked] = useState(props.status);
    const classesForLi = ['todo'];
    const classesForTitle = ['title'];
    const dispatch = useDispatch();

    if (checked)
    {
        classesForLi.push('status');
    }

    const updateStatus = () => {
        setChecked(!checked);
        dispatch(changeStatus(props.id));
    }

    const removeElement = () => {
        dispatch(removeTask(props.id));
    };

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