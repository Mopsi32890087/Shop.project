import * as React from 'react';
import { Link } from 'react-router-dom';
import { IProduct } from '../types';

interface ProductCardProps {
    product: IProduct;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const placeholderImg = 'https://via.placeholder.com/200x150?text=No+Image';

    return (
        <div
            style={{
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                padding: '1rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                backgroundColor: '#fff',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
            }}
        >
            <div>
                <Link to={`/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <img
                        src={product.thumbnail || placeholderImg}
                        alt={product.title}
                        style={{
                            width: '100%',
                            height: '160px',
                            objectFit: 'cover',
                            borderRadius: '4px',
                            marginBottom: '0.75rem'
                        }}
                    />
                    <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem' }}>{product.title}</h3>
                </Link>
            </div>

            <div style={{ marginTop: '0.5rem', borderTop: '1px solid #f0f0f0', paddingTop: '0.5rem' }}>
                <p style={{ margin: '0 0 0.25rem 0', fontWeight: 'bold', fontSize: '1.1rem', color: '#2c3e50' }}>
                    {product.price.toLocaleString()} ₽
                </p>
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#7f8c8d' }}>
                    Комментариев: {product.commentsCount ?? 0}
                </p>
            </div>
        </div>
    );
};

