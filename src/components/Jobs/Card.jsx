const Card=(props)=>{
    return (
        <div>
            <h1>{props.name}</h1>
            <h3>{props.mode}|{props.type}</h3>
            <h3>{props.exp} Experience Required</h3>
        </div>
    );
}
export default Card;