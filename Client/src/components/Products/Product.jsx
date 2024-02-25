export const Product = ({ id, name, price, onModify, onDelete }) => {
    return (
        <tr>
            <td>{name}</td>
            <td>{price}</td>
            <td><button onClick={onModify}>Modify</button></td>
            <td><button onClick={onDelete}>Delete</button></td>
        </tr>
    )
}