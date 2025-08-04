import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import ProductDetail from './../../components/product/ProductDetail';
import Header from '../../components/layouts/Header';
import { getDomesticPostById, updateDomesticPostById} from '../../service/domesticPostApi';
import { getForeignPostById, updateForeignPostById} from '../../service/foreignPostApi';

const ProductDetailPage = () => {
    const { id, region } = useParams();
    const navigate = useNavigate();
    // const location = useLocation();

    // const region = location.state?.region || 'domestic';

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
                setProduct({
                    title: data.title,
                    content: data.content,
                    price: data.yourPrice,
                    image: data.img,
                    url: data.url,
                    platform: data.platform,
                    username: data.username,
                    region: region,
                });
            } else if (region === 'foreign') {
                data = await getForeignPostById(id);  // 해외 게시글 가져오기

                setProduct({
                    title:    data.title,
                    content:  data.content,
                    price:    data.yourPrice,
                    image:    data.img,
                    url:      data.url,
                    platform: data.platform,
                    username: data.username,
                    region: region,
                });
            }
        } catch (err) {
            console.error('상세 조회 실패', err)
        }
        }
        fetchDetail()
    }, [id, region])

    if (!product) return <p>로딩 중…</p>

    // URL 저장 시 호출될 함수
    const handleSaveUrl = async (newUrl) => {
        console.log('🎯 handleSaveUrl – 시도하는 URL:', newUrl);
    
        try {
            // 국내,해외 각각에 PATCH 요청
            await Promise.all([
                updateDomesticPostById(id, { url: newUrl }),
                updateForeignPostById(id, { url: newUrl})
            ]);
            setProduct(prev => ({...prev, url: newUrl}));
        } catch (err) {
            console.error('URL 업데이트 실패:', err);
        }
    };

    return (
        <div>
            <Header/>
            <ProductDetail product={product} region={region} onBack={() => navigate(-1)} 
                    onSaveUrl={handleSaveUrl}/>
        </div>
    )
}

export default ProductDetailPage