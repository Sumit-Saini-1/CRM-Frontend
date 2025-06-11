import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { apiFetch } from '../lib/api';
import { type Product } from '../types/product';

const ProductDetail: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [zoomImage, setZoomImage] = useState<string | null>(null);


    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await apiFetch<Product>(`/products/${id}`);
                setProduct(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleDelete = async () => {
        if (confirm('Are you sure you want to delete this product?')) {
            try {
                await apiFetch(`/products/${id}`, { method: 'DELETE' });
                navigate('/products');
            } catch (error) {
                if (error instanceof Error) {
                    alert(error.message);
                } else {
                    alert('Failed to add product. Please try again.');
                }
            }
        }
    };

    if (loading) return <p>Loading product...</p>;
    if (!product) return <p>Product not found.</p>;

    return (
        <div className="max-w-5xl mx-auto bg-white p-6 rounded shadow space-y-6">
            {/* Header */}
            <div className="flex justify-between items-start flex-col md:flex-row md:items-center">
                <h1 className="text-2xl font-bold mb-4 md:mb-0">{product.title}</h1>
                <div className="space-x-4">
                    <Link to={`/products/${product.id}/edit`} className="text-blue-600 hover:underline">
                        Edit
                    </Link>
                    <button onClick={handleDelete} className="text-red-600 hover:underline">
                        Delete
                    </button>
                </div>
            </div>

            {/* Thumbnail */}
            {product.thumbnail && (
                <div className="w-full md:max-w-md">
                    <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="w-full h-auto object-contain rounded-lg shadow"
                    />
                </div>
            )}

            {/* Gallery */}
            {product.images?.length > 0 && (
                <div>
                    <h3 className="font-semibold text-lg mb-2">Gallery</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {product.images.map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                alt={`Image ${index + 1}`}
                                onClick={() => setZoomImage(img)}
                                className="w-full h-32 object-cover rounded border cursor-pointer"
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* Description & Meta */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <p className="text-gray-600">{product.description}</p>
                    <ul className="mt-4 space-y-2">
                        <li><strong>Brand:</strong> {product.brand}</li>
                        <li><strong>Category:</strong> {product.category}</li>
                        <li><strong>SKU:</strong> {product.sku}</li>
                        <li><strong>Barcode:</strong> {product.meta?.barcode}</li>
                    </ul>
                </div>
                <div>
                    <ul className="space-y-2">
                        <li><strong>Price:</strong> ${product.price}</li>
                        <li><strong>Discount:</strong> {product.discountPercentage}%</li>
                        <li><strong>Rating:</strong> {product.rating}</li>
                        <li><strong>Stock:</strong> {product.stock}</li>
                        <li><strong>Status:</strong> {product.availabilityStatus}</li>
                        <li><strong>Min. Order Qty:</strong> {product.minimumOrderQuantity}</li>
                    </ul>
                </div>
            </div>

            {/* Dimensions & Shipping */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <h3 className="font-semibold mb-2">Dimensions & Weight</h3>
                    <ul className="space-y-1">
                        <li><strong>Width:</strong> {product.dimensions.width} cm</li>
                        <li><strong>Height:</strong> {product.dimensions.height} cm</li>
                        <li><strong>Depth:</strong> {product.dimensions.depth} cm</li>
                        <li><strong>Weight:</strong> {product.weight} g</li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-semibold mb-2">Shipping & Return</h3>
                    <p><strong>Shipping:</strong> {product.shippingInformation}</p>
                    <p><strong>Return Policy:</strong> {product.returnPolicy}</p>
                    <p><strong>Warranty:</strong> {product.warrantyInformation}</p>
                </div>
            </div>

            {/* Tags */}
            {product.tags?.length > 0 && (
                <div>
                    <h3 className="font-semibold mb-2">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                        {product.tags.map((tag, i) => (
                            <span key={i} className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded">
                                #{tag}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* Reviews */}
            {product.reviews?.length > 0 && (
                <div>
                    <h3 className="font-semibold mb-2">Reviews</h3>
                    <ul className="space-y-4">
                        {product.reviews.map((review, index) => (
                            <li key={index} className="border p-3 rounded">
                                <div className="flex justify-between">
                                    <strong>{review.reviewerName}</strong>
                                    <span className="text-yellow-600 font-bold">Rating: {review.rating}</span>
                                </div>
                                <p className="text-gray-600 italic">{review.comment}</p>
                                <p className="text-xs text-gray-400">Date: {new Date(review.date).toLocaleDateString()}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            {zoomImage && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
                    onClick={() => setZoomImage(null)}
                >
                    <button
                        onClick={() => setZoomImage(null)}
                        className="absolute top-4 right-4 text-white text-2xl font-bold"
                    >
                        ×
                    </button>
                    <img
                        src={zoomImage}
                        alt="Zoomed"
                        className="max-w-[90%] max-h-[90%] rounded shadow-lg"
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}
        </div>
    );
};

export default ProductDetail;
