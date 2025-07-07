import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import ProductDetail from './../../components/product/ProductDetail';
import Header from '../../components/layouts/Header';
import { getDomesticPostById } from '../../service/domesticPostApi';
import { getForeignPostById } from '../../service/foreignPostApi';

const ProductDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const region = location.state?.region || 'domestic';

    const [product, setProduct] = useState(null);
    
    // sessionStorage에서 데이터 조회
    // const product = {
    //     title: sessionStorage.getItem(`product-title-${id}`),
    //     content: sessionStorage.getItem(`product-content-${id}`),
    //     price: sessionStorage.getItem(`product-price-${id}`),
    //     url: sessionStorage.getItem(`product-url-${id}`),
    //     platform: sessionStorage.getItem(`product-platform-${id}`),
    //     image: sessionStorage.getItem(`product-image-${id}`),
    // };

    useEffect(() => {
        console.log("🧪 id:", id, "region:", region);  // ✅ ID와 region 확인
        async function fetchDetail() {
        try {
            // const data = await getDomesticPostById(id)
            let data;
            if (region === 'domestic') {
                data = await getDomesticPostById(id);  // 국내 게시글 가져오기
            } else if (region === 'foreign') {
                data = await getForeignPostById(id);  // 해외 게시글 가져오기
            }
            
            // API가 내려준 필드 이름(yourPrice, img 등)에 맞춰 product 객체 생성
            setProduct({
            title:    data.title,
            content:  data.content,
            price:    data.yourPrice,
            image:    data.img,
            url:      data.url,
            platform: data.platform,
            username: data.username,
            region: region,
            })
        } catch (err) {
            console.error('상세 조회 실패', err)
        }
        }
        fetchDetail()
    }, [id, region])

    if (!product) return <p>로딩 중…</p>

    return (
        <div>
            <Header/>
            <ProductDetail product={product} onBack={() => navigate(-1)} />
        </div>
    )
}

export default ProductDetailPage