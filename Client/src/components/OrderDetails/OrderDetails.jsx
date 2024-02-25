import { api } from "@/api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { OrderDetail } from "./OrderDetail";
import { Modal } from "../Modal/Modal";
import { OrderDetailForm } from "./OrderDetailForm";

export const OrderDetails = () => {
    const { orderId } = useParams();
    
    const [orderDetails, setOrderDetails] = useState([]);
    const [isAddOrderDetailFormOpen, setAddOrderDetailFormOpen] = useState(false);

    const handleAddOrderDetail = async (newOrderDetail) => {
        const response = await api.post('/ordersDetail', newOrderDetail);
        setOrderDetails((prev) => [...prev, { ...response.data }]);
        setAddOrderDetailFormOpen(false);
    };

    const fetchOrderDetails = async () => {
        try {
            const response = await api.get(`/ordersDetail/${orderId}`);
            setOrderDetails(response.data);
        } catch (error) {
            console.error('Error fetching product data:', error);
        }
    };

    useEffect(() => {
        fetchOrderDetails();
    });

    return (
        <>
            <h1>OrderDetails</h1>
            <table>
                <thead>
                    <tr>
                        <th>Order Id</th>
                        <th>Product Id</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {orderDetails.map((orderDetail) => (
                        <OrderDetail key={orderDetail.id} {...orderDetail} />
                    ))}
                </tbody>
            </table>
            <button onClick={() => setAddOrderDetailFormOpen(true)}>Add Order Detail</button>
            <Modal isOpen={isAddOrderDetailFormOpen} onClose={() => setAddOrderDetailFormOpen(false)}>
                <OrderDetailForm orderId={orderId} onOrderDetailSubmit={handleAddOrderDetail}/>
            </Modal>
        </>
    )
}