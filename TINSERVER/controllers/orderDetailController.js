const OrderDetail = require('../models/orderDetail');
const db = require('../db');

class OrderDetailsController {
    static async addOrderDetail(req, res) {
        const { orderId, productId, quantity } = req.body;
        try {
            const result = await db.query('INSERT INTO orders_details (order_id, product_id, quantity) VALUES (?, ?, ?)', [orderId, productId, quantity]);
            res.status(201).send(new OrderDetail(result.insertId, orderId, productId, quantity));
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    }

    static async getAllOrderDetails(req, res) {
        const page = parseInt(req.query.page, 10) || 1;
        const pageSize = parseInt(req.query.pageSize, 10) || 10;
        const offset = (page - 1) * pageSize;

        try {
            const [details, total] = await Promise.all([
                db.query('SELECT * FROM orders_details LIMIT ? OFFSET ?', [pageSize, offset]),
                db.query('SELECT COUNT(*) AS count FROM orders_details')
            ]);

            const totalPages = Math.ceil(total[0].count / pageSize);
            res.status(200).send({
                data: details.map(detail => new OrderDetail(detail.id, detail.order_id, detail.product_id, detail.quantity)),
                page,
                pageSize,
                total: total[0].count,
                totalPages
            });
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    }

    static async getOrderDetailsByOrderId(req, res) {
        const { id } = req.params;
        try {
            const result = await db.query('SELECT * FROM orders_details WHERE order_id = ?', [id]);
            const orderDetails = result.map(detail => new OrderDetail(detail.id, detail.order_id, detail.product_id, detail.quantity));
            res.status(200).send(orderDetails);
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    }

    static async updateOrderDetail(req, res) {
        const { id } = req.params;
        const { orderId, productId, quantity } = req.body;
        try {
            await db.query('UPDATE orders_details SET order_id = ?, product_id = ?, quantity = ? WHERE id = ?', [orderId, productId, quantity, id]);
            res.status(200).send({ message: 'Order detail updated successfully' });
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    }

    static async deleteOrderDetail(req, res) {
        const { id } = req.params;
        try {
            await db.query('DELETE FROM orders_details WHERE id = ?', [id]);
            res.status(200).send({ message: 'Order detail deleted successfully' });
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    }
}

module.exports = OrderDetailsController;
