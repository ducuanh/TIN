const Order = require('../models/order');
const db = require('../db');

class OrderController {
    static async addOrder(req, res) {
        const { clientId, orderDate } = req.body;
        try {
            const result = await db.query('INSERT INTO orders (client_id, order_date) VALUES (?, ?)', [clientId, orderDate]);
            res.status(201).send(new Order(result.insertId, clientId, orderDate));
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    }

    static async getAllOrders(req, res) {
        const page = parseInt(req.query.page, 10) || 1;
        const pageSize = parseInt(req.query.pageSize, 10) || 10;
        const offset = (page - 1) * pageSize;

        try {
            const [orders, total] = await Promise.all([
                db.query('SELECT * FROM orders LIMIT ? OFFSET ?', [pageSize, offset]),
                db.query('SELECT COUNT(*) AS count FROM orders')
            ]);

            const totalPages = Math.ceil(total[0].count / pageSize);
            res.status(200).send({
                data: orders.map(order => new Order(order.id, order.client_id, order.order_date)),
                page,
                pageSize,
                total: total[0].count,
                totalPages
            });
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    }

    static async getOrderById(req, res) {
        const { id } = req.params;
        try {
            const result = await db.query('SELECT * FROM orders WHERE id = ?', [id]);
            if (result.length) {
                const order = new Order(result[0].id, result[0].client_id, result[0].order_date);
                res.status(200).send(order);
            } else {
                res.status(404).send({ message: 'Order not found' });
            }
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    }

    static async updateOrder(req, res) {
        const { id } = req.params;
        const { clientId, orderDate } = req.body;
        try {
            await db.query('UPDATE orders SET client_id = ?, order_date = ? WHERE id = ?', [clientId, orderDate, id]);
            res.status(200).send({ message: 'Order updated successfully' });
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    }

    static async deleteOrder(req, res) {
        const { id } = req.params;
        try {
            await db.query('DELETE FROM orders WHERE id = ?', [id]);
            res.status(200).send({ message: 'Order deleted successfully' });
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    }
}

module.exports = OrderController;
