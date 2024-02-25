import { useState } from "react";

const initProduct = {
    name: '',
    price: ''
}

export const ProductForm = ({ product = initProduct, onProductSubmit }) => {
    const [modifiedProduct, setModifiedProduct] = useState(product);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setModifiedProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onProductSubmit(modifiedProduct);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input type="text" name="name" value={modifiedProduct.name} onChange={handleInputChange} required />
            </label>
            <label>
                Price:
                <input type="number" name="price" value={modifiedProduct.price} onChange={handleInputChange} required />
            </label>
            <button type="submit">Submit</button>
        </form>
    );
};