import React, { useState } from 'react';
import { addComment } from '../services/api.service';
import { IComment } from '../types';

interface AddCommentFormProps {
    productId: string;
    onCommentAdded: (newComment: IComment) => void;
}

export const AddCommentForm: React.FC<AddCommentFormProps> = ({ productId, onCommentAdded }) => {
    const [title, setTitle] = useState('');
    const [email, setEmail] = useState('');
    const [text, setText] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSubmitting(true);

        try {
            const newComment = await addComment({
                productId,
                title,
                email,
                text
            });

            onCommentAdded(newComment);

            setTitle('');
            setEmail('');
            setText('');
        } catch (err) {
            setError('Не удалось сохранить комментарий. Попробуйте еще раз.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
                maxWidth: '450px',
                marginTop: '1rem',
                padding: '1rem',
                backgroundColor: '#f9f9f9',
                borderRadius: '6px'
            }}
        >
            <h4 style={{ margin: 0 }}>Добавить комментарий</h4>

            {error && <div style={{ color: 'red', fontSize: '0.9rem' }}>{error}</div>}

            <div>
                <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.25rem' }}>
                    Заголовок:
                </label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    style={{ width: '100%', padding: '0.5rem', boxSizing: 'border-box' }}
                />
            </div>

            <div>
                <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.25rem' }}>
                    E-mail:
                </label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{ width: '100%', padding: '0.5rem', boxSizing: 'border-box' }}
                />
            </div>

            <div>
                <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.25rem' }}>
                    Текст комментария:
                </label>
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    required
                    rows={4}
                    style={{ width: '100%', padding: '0.5rem', boxSizing: 'border-box', resize: 'vertical' }}
                />
            </div>

            <button
                type="submit"
                disabled={submitting}
                style={{
                    padding: '0.6rem 1.2rem',
                    backgroundColor: '#007bff',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: submitting ? 'not-allowed' : 'pointer',
                    alignSelf: 'flex-start'
                }}
            >
                {submitting ? 'Сохранение...' : 'Сохранить'}
            </button>
        </form>
    );
};
