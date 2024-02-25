import { useState } from "react";

const initClient = {
    name: '',
    email: ''
}

export const ClientForm = ({ client = initClient, onClientSubmit }) => {
    const [modifiedClient, setModifiedClient] = useState(client);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setModifiedClient((prevClient) => ({ ...prevClient, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onClientSubmit(modifiedClient);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input type="text" name="name" value={modifiedClient.name} onChange={handleInputChange} required />
            </label>
            <label>
                Email:
                <input type="email" name="email" value={modifiedClient.email} onChange={handleInputChange} required />
            </label>
            <button type="submit">Submit</button>
        </form>
    );
};