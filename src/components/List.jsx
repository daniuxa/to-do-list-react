import Item from "./Item";

export default function List(props){
    return (
        <ul>
             {props.tasks.map(item => <Item key = {item.id} {...item} />)}
        </ul>
    )
}