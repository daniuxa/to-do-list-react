import Item from "./Item";

export default function List(props){
      const updateParentComponent = (tasks) => {
        props.updateParent(tasks);
      }
    return (
        <ul>
             {props.tasks.map(item => <Item key = {item.id} {...item} updateParent={updateParentComponent} />)}
        </ul>
    )
}