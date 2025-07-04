import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ProductDetail from './../../components/product/ProductDetail';
import Header from '../../components/layouts/Header';

const ProductDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    // sessionStorage에서 데이터 조회
    const product = {
        title: sessionStorage.getItem(`product-title-${id}`),
        content: sessionStorage.getItem(`product-content-${id}`),
        price: sessionStorage.getItem(`product-price-${id}`),
        url: sessionStorage.getItem(`product-url-${id}`),
        platform: sessionStorage.getItem(`product-platform-${id}`),
        image: sessionStorage.getItem(`product-image-${id}`),
    };


    return (
        <div>
            <Header/>
            <ProductDetail product={product} onBack={() => navigate(-1)} />
        </div>
    )
}

export default ProductDetailPage