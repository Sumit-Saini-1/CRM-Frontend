import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiFetch } from '../lib/api';
import { type Product } from '../types/product';

const AddProduct: React.FC = () => {
    const navigate = useNavigate();
    const [product, setProduct] = useState<Partial<Product>>({
        title: '',
        description: '',
        price: 0,
        brand: '',
        category: '',
        stock: 0,
        thumbnail: '',
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProduct((prev) => ({
            ...prev,
            [name]: name === 'price' || name === 'stock' ? Number(value) : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const response = await apiFetch<Product>('/products/add', {
                method: 'POST',
                body: JSON.stringify(product),
            });

            // Navigate to product list or detail
            navigate(`/products/${response.id}`);
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError('Failed to add product. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
            <h1 className="text-2xl font-bold mb-6">Add New Product</h1>

            {error && <p className="text-red-600 mb-4">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={product.title}
                    onChange={handleChange}
                    required
                    className="w-full border rounded p-2"
                />

                <textarea
                    name="description"
                    placeholder="Description"
                    value={product.description}
                    onChange={handleChange}
                    required
                    className="w-full border rounded p-2"
                />

                <input
                    type="text"
                    name="brand"
                    placeholder="Brand"
                    value={product.brand}
                    onChange={handleChange}
                    required
                    className="w-full border rounded p-2"
                />

                <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    value={product.category}
                    onChange={handleChange}
                    required
                    className="w-full border rounded p-2"
                />

                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={product.price}
                    onChange={handleChange}
                    required
                    className="w-full border rounded p-2"
                />

                <input
                    type="number"
                    name="stock"
                    placeholder="Stock"
                    value={product.stock}
                    onChange={handleChange}
                    required
                    className="w-full border rounded p-2"
                />

                <input
                    type="text"
                    name="thumbnail"
                    placeholder="Thumbnail URL"
                    value={product.thumbnail}
                    onChange={handleChange}
                    required
                    className="w-full border rounded p-2"
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                >
                    {loading ? 'Submitting...' : 'Add Product'}
                </button>
            </form>
        </div>
    );
};

export default AddProduct;
