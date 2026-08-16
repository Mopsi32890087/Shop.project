import React, { useEffect, useState, useMemo } from 'react';
import { ProductCard } from '../components/ProductCard';
import { getProducts } from '../services/api.service';
import { IProduct } from '../types';

export const ProductsListPage: React.FC = () => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const [searchTitle, setSearchTitle] = useState('');
    const [priceFrom, setPriceFrom] = useState('');
    const [priceTo, setPriceTo] = useState('');

    useEffect(() => {
        getProducts()
            .then((data) => setProducts(data))
            .finally(() => setLoading(false));
    }, []);

    const filteredProducts = useMemo(() => {
        return products.filter((p) => {
            const matchesTitle = p.title.toLowerCase().includes(searchTitle.toLowerCase());
            const matchesPriceFrom = priceFrom === '' || p.price >= Number(priceFrom);
            const matchesPriceTo = priceTo === '' || p.price <= Number(priceTo);
            return matchesTitle && matchesPriceFrom && matchesPriceTo;
        });
    }, [products, searchTitle, priceFrom, priceTo]);

    if (loading) return <div className="loader">Загрузка списка товаров...</div>;

    return (
        <div style={{ padding: '2rem' }}>
            <h1>Список товаров ({filteredProducts.length})</h1>

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
                <input
                    type="text"
                    placeholder="Поиск по названию..."
                    value={searchTitle}
                    onChange={(e) => setSearchTitle(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Цена от"
                    value={priceFrom}
                    onChange={(e) => setPriceFrom(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Цена до"
                    value={priceTo}
                    onChange={(e) => setPriceTo(e.target.value)}
                />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.5rem' }}>
                {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};
