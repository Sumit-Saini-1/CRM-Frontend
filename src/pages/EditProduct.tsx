import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiFetch } from '../lib/api';
import { type Product } from '../types/product';

const EditProduct: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [product, setProduct] = useState<Partial<Product> | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Fetch product to edit
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await apiFetch<Product>(`/products/${id}`);
                setProduct(data);
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

        if (id) fetchProduct();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProduct((prev) => ({
            ...prev!,
            [name]: name === 'price' || name === 'stock' ? Number(value) : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!id || !product) return;

        setSaving(true);
        setError(null);

        try {
            const updated = await apiFetch<Product>(`/products/${id}`, {
                method: 'PUT',
                body: JSON.stringify(product),
            });

            navigate(`/products/${updated.id}`);
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError('Failed to add product. Please try again.');
            }
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <p className="text-center mt-8">Loading...</p>;
    if (error) return <p className="text-center text-red-600 mt-8">{error}</p>;
    if (!product) return null;

    return (
        <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
            <h1 className="text-2xl font-bold mb-6">Edit Product</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="title"
                    value={product.title}
                    onChange={handleChange}
                    placeholder="Title"
                    required
                    className="w-full border rounded p-2"
                />

                <textarea
                    name="description"
                    value={product.description}
                    onChange={handleChange}
                    placeholder="Description"
                    required
                    className="w-full border rounded p-2"
                />

                <input
                    type="text"
                    name="brand"
                    value={product.brand}
                    onChange={handleChange}
                    placeholder="Brand"
                    required
                    className="w-full border rounded p-2"
                />

                <input
                    type="text"
                    name="category"
                    value={product.category}
                    onChange={handleChange}
                    placeholder="Category"
                    required
                    className="w-full border rounded p-2"
                />

                <input
                    type="number"
                    name="price"
                    value={product.price}
                    onChange={handleChange}
                    placeholder="Price"
                    required
                    className="w-full border rounded p-2"
                />

                <input
                    type="number"
                    name="stock"
                    value={product.stock}
                    onChange={handleChange}
                    placeholder="Stock"
                    required
                    className="w-full border rounded p-2"
                />

                <input
                    type="text"
                    name="thumbnail"
                    value={product.thumbnail}
                    onChange={handleChange}
                    placeholder="Thumbnail URL"
                    required
                    className="w-full border rounded p-2"
                />

                <button
                    type="submit"
                    disabled={saving}
                    className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                >
                    {saving ? 'Updating...' : 'Update Product'}
                </button>
            </form>
        </div>
    );
};

export default EditProduct;
