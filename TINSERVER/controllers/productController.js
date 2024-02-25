const Product = require('../models/product');
const db = require('../db');

class ProductController {

    static async addProduct(req, res) {
        const { name, price } = req.body;
        try {
            const result = await db.query('INSERT INTO products (name, price) VALUES (?, ?)', [name, price]);
            res.status(201).send(new Product(result.insertId, name, price));
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    }

    static async getAllProducts(req, res) {
        const page = parseInt(req.query.page, 10) || 1;
        const pageSize = parseInt(req.query.pageSize, 10) || 10;
        const offset = (page - 1) * pageSize;

        try {
            const [products, total] = await Promise.all([
                db.query('SELECT * FROM products LIMIT ? OFFSET ?', [pageSize, offset]),
                db.query('SELECT COUNT(*) AS count FROM products')
            ]);

            const totalPages = Math.ceil(total[0].count / pageSize);
            res.status(200).send({
                data: products.map(product => new Product(product.id, product.name, product.price)),
                page,
                pageSize,
                total: total[0].count,
                totalPages
            });
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    }


    static async getProductById(req, res) {
        const { id } = req.params;
        try {
            const result = await db.query('SELECT * FROM products WHERE id = ?', [id]);
            if (result.length) {
                const product = new Product(result[0].id, result[0].name, result[0].price);
                res.status(200).send(product);
            } else {
                res.status(404).send({ message: 'Product not found' });
            }
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    }

    static async updateProduct(req, res) {
        const { id } = req.params;
        const { name, price } = req.body;
        try {
            await db.query('UPDATE products SET name = ?, price = ? WHERE id = ?', [name, price, id]);
            res.status(200).send({ message: 'Product updated successfully' });
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    }


    static async deleteProduct(req, res) {
        const { id } = req.params;
        try {
            await db.query('DELETE FROM products WHERE id = ?', [id]);
            res.status(200).send({ message: 'Product deleted successfully' });
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    }
}

module.exports = ProductController;
