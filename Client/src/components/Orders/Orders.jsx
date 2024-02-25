import { Order } from "./Order";
import { useState, useEffect } from "react";
import { api } from "@/api";
import { Modal } from "../Modal/Modal";
import { OrderForm } from "./OrderForm";

export const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [isAddOrderFormOpen, setAddOrderFormOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isModifyOrderFormOpen, setModifyOrderFormOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const handleAddOrder = async (newOrder) => {
        const response = await api.post('/orders', newOrder);
        setOrders((prevOrders) => [...prevOrders, { ...response.data }]);
        setAddOrderFormOpen(false);
    };

    const handleModifyOrder = (order) => {
        setSelectedOrder(order);
        setModifyOrderFormOpen(true);
    };

    const handleDeleteOrder = async (deletedOrder) => {
        const response = await api.delete(`/orders/${deletedOrder.id}`);


            if (response.status === 200) {
 
                setOrders((prevOrders) => prevOrders.filter((order) => order.id !== deletedOrder.id));
            } else {
                console.error('Failed to delete product. Server responded with:', response.data);
            }
    }

    const handleModifyOrderSubmit = async (modifiedOrder) => {
       
        const response = await api.put(`/orders/${selectedOrder.id}`, modifiedOrder);
        

        if (response.status === 200) {
            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order.id === selectedOrder.id ? { ...order, ...modifiedOrder } : order
                )
            );

            // Close the modification form
            setModifyOrderFormOpen(false);
        } else {
            console.error('Failed to update product. Server responded with:', response.data);
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    const fetchOrders = async (page) => {
        try {
            const response = await api.get(`/orders?page=${page}`);
            setOrders(response.data.data);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error('Error fetching product data:', error);
        }
    };
    useEffect(() => {
        fetchOrders(currentPage);
    }, [currentPage]);


    return (
        <>
            <h1>Orders</h1>
            <table>
                <thead>
                    <tr>
                        <th>Client ID</th>
                        <th>Order date</th>
                        <th>Modify</th>
                        <th>Delete</th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <Order key={order.id} {...order} onModify={() => handleModifyOrder(order)} onDelete={() => handleDeleteOrder(order)}/>
                    ))}
                </tbody>
            </table>
            <div>
                <span>Page {currentPage} of {totalPages}</span>
                <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
                <button disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>Next</button>
            </div>
            <button onClick={() => setAddOrderFormOpen(true)}>Add Order</button>
            <Modal isOpen={isAddOrderFormOpen} onClose={() => setAddOrderFormOpen(false)}>
                <OrderForm onOrderSubmit={handleAddOrder}/>
            </Modal>
            <Modal isOpen={isModifyOrderFormOpen} onClose={() => setModifyOrderFormOpen(false)}>
                {/* Pass the selected product and the submit handler to the modification form */}
                {selectedOrder && (
                    <OrderForm
                        key={selectedOrder.id}
                        order={selectedOrder}
                        onOrderSubmit={handleModifyOrderSubmit}
                    />
                )}
            </Modal>
        </>
    )
}