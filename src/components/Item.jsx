import { useState } from "react";
import { useDispatch } from "react-redux";
import { removeTask, changeStatus } from "../store/tasksSlice";

export default function Item(props){
    const [checked, setChecked] = useState(props.status);
    const classesForLi = ['todo'];
    const dispatch = useDispatch();

    if (checked)
    {
        classesForLi.push('status');
    }

    return (
        <>
        {
            (<li className={classesForLi.join(' ')}>
            <label>
                <div className="inputFields">
                    <input type="checkbox"
                    checked={checked}
                    onChange={
                        () => {
                            setChecked(!checked);
                            dispatch(changeStatus(props.id));
                        }
                    }/>
                    <span className='title'>{props.title}</span>

                </div> 
                <span className="time">Added at {props.addedTaskTime}</span>   
                <i className="material-icons red-text"
                onClick={
                    () => {
                        dispatch(removeTask(props.id));
                    }
                }>X</i>
            </label>
            
        </li>)
        }
          
        </>
    );
}