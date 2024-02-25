import { useNavigate } from "react-router-dom";

export const Order = ({ id, clientId, orderDate,onModify,onDelete }) => {
    const navigate = useNavigate();

    const handleDetailsClick = () => {
        navigate(`/orderDetails/${id}`);
    };

    return (
        <tr>
            <td>{clientId}</td>
            <td>{orderDate}</td>
            <td><button onClick={onModify}>Modify</button></td>
            <td><button onClick={onDelete}>Delete</button></td>
            <td><button onClick={handleDetailsClick}>Details</button></td>
        </tr>
    )
}