export const Client = ({ id, name, email,onModify,onDelete }) => {
    return (
        <tr>
            <td>{name}</td>
            <td>{email}</td>
            <td><button onClick={onModify}>Modify</button></td>
            <td><button onClick={onDelete}>Delete</button></td>
        </tr>
    )
}