const Client = require('../models/client');
const db = require('../db');

class ClientController {

    static async getClientById(req, res) {
        const { id } = req.params;

        try {
            const result = await db.query('SELECT * FROM clients WHERE id = ?', [id]);
            if (result.length) {
                const client = new Client(result[0].id, result[0].name, result[0].email);
                res.status(200).send(client);
            } else {
                res.status(404).send({ message: 'Client not found' });
            }
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    }


    static async getAllClients(req, res) {
        const page = parseInt(req.query.page, 10) || 1;
        const pageSize = parseInt(req.query.pageSize, 10) || 10;
        const offset = (page - 1) * pageSize;

        try {
            const [clients, total] = await Promise.all([
                db.query('SELECT * FROM clients LIMIT ? OFFSET ?', [pageSize, offset]),
                db.query('SELECT COUNT(*) AS count FROM clients')
            ]);

            const totalPages = Math.ceil(total[0].count / pageSize);
            res.status(200).send({
                clients: clients.map(client => new Client(client.id, client.name, client.email)),
                page,
                pageSize,
                total: total[0].count,
                totalPages
            });
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    }


    static async addClient(req, res) {
        const { name, email } = req.body;

        try {
            const result = await db.query('INSERT INTO clients (name, email) VALUES (?, ?)', [name, email]);
            res.status(201).send(new Client(result.insertId, name, email));
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    }


    static async updateClient(req, res) {
        const { id } = req.params;
        const { name, email } = req.body;

        try {
            await db.query('UPDATE clients SET name = ?, email = ? WHERE id = ?', [name, email, id]);
            res.status(200).send({ message: 'Client updated successfully' });
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    }


    static async deleteClient(req, res) {
        const { id } = req.params;

        try {
            await db.query('DELETE FROM clients WHERE id = ?', [id]);
            res.status(200).send({ message: 'Client deleted successfully' });
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    }
}

module.exports = ClientController;
