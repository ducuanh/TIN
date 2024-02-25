import { useState } from "react";

export const OrderDetailForm = ({orderId, onOrderDetailSubmit }) => {

    const [modifiedOrderDetail, setModifiedOrderDetail] = useState({orderId: orderId, productId: '', quantity: ''});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setModifiedOrderDetail((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onOrderDetailSubmit(modifiedOrderDetail);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Product Id:
                <input type="text" name="productId" value={modifiedOrderDetail.productId} onChange={handleInputChange} required />
            </label>
            <label>
                Quantity:
                <input type="text" name="quantity" value={modifiedOrderDetail.quantity} onChange={handleInputChange} required />
            </label>
            <button type="submit">Submit</button>
        </form>
    );
};