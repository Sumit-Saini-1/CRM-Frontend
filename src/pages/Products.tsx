import React, { useEffect, useState } from 'react';
import { apiFetch } from '../lib/api';
import type { Product } from '../types/product';
import { Link } from 'react-router-dom';

interface ApiResponse {
    products:Product[];
    total:number;
}

const Products: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const limit = 20;

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true); 
            const skip = (page - 1) * limit;
            const data = await apiFetch<ApiResponse>(`/products?limit=${limit}&skip=${skip}`);
            setProducts(data.products); 
            setTotal(data.total);
            setLoading(false); 
        };

        fetchProducts();
    }, [page]);

    const totalPages = Math.ceil(total / limit);

    return (
        <div>
            <h1 className="text-2xl font-semibold mb-4">Product List</h1>
            {
            loading ? (
                <div className="flex justify-center items-center h-48">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
                </div>
            ) : (<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {products.map((product) => (
                    <div key={product.id} className="p-4 border rounded shadow">
                        <img
                            src={product.thumbnail}
                            alt={product.title}
                            className="h-40 w-full object-cover mb-2"
                        />
                        <Link to={`/products/${product.id}`}>
                            <h2 className="font-bold">{product.title}</h2>
                        </Link>
                        <p>${product.price}</p>
                    </div>
                ))}
            </div>)
            }

            {/* Pagination */}
            <div className="flex justify-center mt-6 space-x-2">
                <button
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                >
                    Prev
                </button>

                {[...Array(totalPages)].map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setPage(i + 1)}
                        className={`px-4 py-2 rounded ${i + 1 === page
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-200 hover:bg-gray-300'
                            }`}
                    >
                        {i + 1}
                    </button>
                ))}

                <button
                    onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={page === totalPages}
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Products;
