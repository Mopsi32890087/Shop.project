import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainPage } from './pages/MainPage';
import { ProductsListPage } from './pages/ProductsListPage';
import { ProductDetailPage } from './pages/ProductDetailPage';

export const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/products-list" element={<ProductsListPage />} />
                <Route path="/:id" element={<ProductDetailPage />} />
            </Routes>
        </BrowserRouter>
    );
};
