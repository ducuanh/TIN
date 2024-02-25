import { useState } from "react";

const initOrder = {
    clientId: '',
    orderDate: ''
}

export const OrderForm = ({ order = initOrder, onOrderSubmit }) => {
    const formattedDate = order.orderDate.split('T')[0];
    const [modifiedOrder, setModifiedOrder] = useState({ clientId: order.clientId, orderDate: formattedDate });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setModifiedOrder((prevClient) => ({ ...prevClient, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        onOrderSubmit(modifiedOrder);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                ClientId:
                <input type="text" name="clientId" value={modifiedOrder.clientId} onChange={handleInputChange} required />
            </label>
            <label>
                Date:
                <input type="date" name="orderDate" value={modifiedOrder.orderDate} onChange={handleInputChange} required />
            </label>
            <button type="submit">Submit</button>
        </form>
    );
};