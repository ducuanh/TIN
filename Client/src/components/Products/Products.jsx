import { Product } from "@/components/Products/Product";
import { useState, useEffect } from "react";
import { api } from "@/api";
import { Modal } from "../Modal/Modal";
import { ProductForm } from "./ProductForm";

export const Products = () => {
    const [products, setProducts] = useState([]);
    const [isAddProductFormOpen, setAddProductFormOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModifyProductFormOpen, setModifyProductFormOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const handleAddProduct = async (newProduct) => {
        const response = await api.post('/products', newProduct);
        setProducts((prevProducts) => [...prevProducts, { ...response.data }]);
        setAddProductFormOpen(false);
    };

    const handleModifyProduct = (product) => {
        setSelectedProduct(product);
        setModifyProductFormOpen(true);
    };

    const handleDeleteProduct = async (deletedProduct) => {
        const response = await api.delete(`/products/${deletedProduct.id}`);
            if (response.status === 200) {
                setProducts((prevProducts) => prevProducts.filter((product) => product.id !== deletedProduct.id));
            } else {
                console.error('Failed to delete product. Server responded with:', response.data);
            }
    }

    const handleModifyProductSubmit = async (modifiedProduct) => {
       
        const response = await api.put(`/products/${selectedProduct.id}`, modifiedProduct);
        

        if (response.status === 200) {
            setProducts((prevProducts) =>
                prevProducts.map((product) =>
                    product.id === selectedProduct.id ? { ...product, ...modifiedProduct } : product
                )
            );

            // Close the modification form
            setModifyProductFormOpen(false);
        } else {
            console.error('Failed to update product. Server responded with:', response.data);
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const fetchProducts = async (page) => {
        try {
            const response = await api.get(`/products?page=${page}`);
            setProducts(response.data.data);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error('Error fetching product data:', error);
        }
    };

    useEffect(() => {
        fetchProducts(currentPage);
    }, [currentPage]);

    return (
        <>
            <h1>Products</h1>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Modify</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <Product key={product.id} {...product} onModify={() => handleModifyProduct(product)} onDelete={() => handleDeleteProduct(product)} />
                    ))}
                </tbody>
            </table>
            <div>
                <span>Page {currentPage} of {totalPages}</span>
                <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
                <button disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>Next</button>
            </div>
            <button onClick={() => setAddProductFormOpen(true)}>Add Product</button>
            <Modal isOpen={isAddProductFormOpen} onClose={() => setAddProductFormOpen(false)}>
                <ProductForm onProductSubmit={handleAddProduct}/>
            </Modal>
            <Modal isOpen={isModifyProductFormOpen} onClose={() => setModifyProductFormOpen(false)}>
                {selectedProduct && (
                    <ProductForm
                        key={selectedProduct.id}
                        product={selectedProduct}
                        onProductSubmit={handleModifyProductSubmit}
                    />
                )}
            </Modal>
        </>
    )
}