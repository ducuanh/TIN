import { Client } from "@/components/Clients/Client";
import { useState, useEffect } from "react";
import { api } from "@/api";
import { Modal } from "../Modal/Modal";
import { ClientForm } from "./ClientForm";

export const Clients = () => {
    const [clients, setClients] = useState([]);
    const [isAddClientFormOpen, setAddClientFormOpen] = useState(false);
    const [selectedClient, setSelectedClient] = useState(null);
    const [isModifyClientFormOpen, setModifyClientFormOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const handleAddClient = async (newClient) => {
        const response = await api.post('/clients', newClient);
        setClients((prevClients) => [...prevClients, { ...response.data }]);
        setAddClientFormOpen(false);
    };

    const handleModifyClient = (client) => {
        setSelectedClient(client);
        setModifyClientFormOpen(true);
    };

    const handleDeleteClient = async (deletedClient) => {
        const response = await api.delete(`/clients/${deletedClient.id}`);
            if (response.status === 200) {
                setClients((prevClients) => prevClients.filter((client) => client.id !== deletedClient.id));
            } else {
                console.error('Failed to delete product. Server responded with:', response.data);
            }
    }

    const handleModifyClientSubmit = async (modifiedClient) => {
       
        const response = await api.put(`/clients/${selectedClient.id}`, modifiedClient);
        

        if (response.status === 200) {
            setClients((prevClients) =>
                prevClients.map((client) =>
                    client.id === selectedClient.id ? { ...client, ...modifiedClient } : client
                )
            );


            setModifyClientFormOpen(false);
        } else {
            console.error('Failed to update client. Server responded with:', response.data);
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const fetchClients = async (page) => {
        try {
            const response = await api.get(`/clients?page=${page}`);
            setClients(response.data.clients);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error('Error fetching client data:', error);
        }
    };

    useEffect(() => {
        fetchClients(currentPage);
    }, [currentPage]);

    return (
        <>
            <h1>Clients</h1>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>email</th>
                        <th>Modify</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {clients.map((client) => (
                        <Client key={client.id} {...client} onModify={() => handleModifyClient(client)} onDelete={() => handleDeleteClient(client)} />
                    ))}
                </tbody>
            </table>
            <div>
                <span>Page {currentPage} of {totalPages}</span>
                <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
                <button disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>Next</button>
            </div>
            <button onClick={() => setAddClientFormOpen(true)}>Add Client</button>
            <Modal isOpen={isAddClientFormOpen} onClose={() => setAddClientFormOpen(false)}>
                <ClientForm onClientSubmit={handleAddClient}/>
            </Modal>
            <Modal isOpen={isModifyClientFormOpen} onClose={() => setModifyClientFormOpen(false)}>
                {selectedClient && (
                    <ClientForm
                        key={selectedClient.id}
                        client={selectedClient}
                        onClientSubmit={handleModifyClientSubmit}
                    />
                )}
            </Modal>
        </>
    )
}