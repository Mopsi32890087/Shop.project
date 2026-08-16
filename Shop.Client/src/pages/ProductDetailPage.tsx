import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { apiClient } from '../api';
import { AddCommentForm } from '../components/AddCommentForm';
import { getSimilarProducts } from '../services/api.service';
import { IComment, ISimilarProduct, IProduct } from '../types';

export const ProductDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    const [product, setProduct] = useState<IProduct | null>(null);
    const [similar, setSimilar] = useState<ISimilarProduct[]>([]);
    const [comments, setComments] = useState<IComment[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (!id) return;
        setLoading(true);

        Promise.all([
            apiClient.get(`/products/${id}`),
            getSimilarProducts(id), // <--- Вызываем сервисный метод вместо apiClient.get
            apiClient.get(`/comments?productId=${id}`)
        ]).then(([prodRes, simData, commRes]) => {
            setProduct(prodRes.data);
            setSimilar(simData);
            setComments(commRes.data);
        }).finally(() => setLoading(false));
    }, [id]);

    const handleCommentAdded = (newComment: IComment) => {
        setComments((prev) => [...prev, newComment]);
    };

    if (loading) return <div className="loader">Загрузка информации о товаре...</div>;
    if (!product) return <div>Товар не найден</div>;

    return (
        <div style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>
            <h1>{product.title}</h1>

            <img
                src={product.thumbnail || 'https://via.placeholder.com/400x300'}
                alt={product.title}
                style={{ maxWidth: '400px', width: '100%', borderRadius: '8px' }}
            />

            <p style={{ marginTop: '1rem' }}>{product.description}</p>
            <h2>Цена: {product.price.toLocaleString()} ₽</h2>

            <hr style={{ margin: '2rem 0' }} />

            <section>
                <h3>Похожие товары</h3>
                {similar.length === 0 ? (
                    <p>Похожих товаров нет</p>
                ) : (
                    <ul>
                        {similar.map((item) => (
                            <li key={item.id}>
                                <Link to={`/${item.id}`}>{item.title}</Link> — {item.price.toLocaleString()} ₽
                            </li>
                        ))}
                    </ul>
                )}
            </section>

            <hr style={{ margin: '2rem 0' }} />

            <section>
                <h3>Комментарии</h3>
                {comments.map((c) => (
                    <div key={c.id} style={{ borderBottom: '1px solid #eee', padding: '0.5rem 0' }}>
                        <h4>{c.title} <small>({c.email})</small></h4>
                        <p>{c.text}</p>
                    </div>
                ))}

                <AddCommentForm productId={product.id} onCommentAdded={handleCommentAdded} />
            </section>
        </div>
    );
};
