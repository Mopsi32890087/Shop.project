import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../services/api.service';

export const MainPage: React.FC = () => {
    const [stats, setStats] = useState<{ count: number; totalCost: number }>({ count: 0, totalCost: 0 });
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        getProducts()
            .then((items) => {
                const totalCost = items.reduce((sum, item) => sum + Number(item.price), 0);
                setStats({ count: items.length, totalCost });
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div className="loader">Загрузка данных...</div>;

    return (
        <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
            <h1>Shop.Client</h1>
            <p>
                В базе данных находится {stats.count} товаров общей стоимостью {stats.totalCost.toLocaleString()} ₽
            </p>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                <Link to="/products-list">
                    <button style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}>
                        Перейти к списку товаров
                    </button>
                </Link>
                <a href="/admin" target="_blank" rel="noopener noreferrer">
                    <button style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}>
                        Перейти в систему администрирования
                    </button>
                </a>
            </div>
        </div>
    );
};
