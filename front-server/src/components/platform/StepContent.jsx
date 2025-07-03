import React from 'react'

// 아마존 단계별 컴포넌트
import AmazonStep1 from './amazon/AmazonStep1';

// 쇼피 단계별 컴포넌트
import ShopeeStep1 from './shopee/ShopeeStep1';
import AmazonStep2 from './amazon/AmazonStep2';
import AmazonStep3 from './amazon/AmazonStep3';
import AmazonStep5 from './amazon/AmazonStep5';
import AmazonStep4 from './amazon/AmazonStep4';
import ShopeeStep2 from './shopee/ShopeeStep2';
import ShopeeStep3 from './shopee/ShopeeStep3';
import ShopeeStep4 from './shopee/ShopeeStep4';
import ShopeeStep5 from './shopee/ShopeeStep5';
import ShopeeStep6 from './shopee/ShopeeStep6';

const StepContent = ({ platform, selectedStep }) => {
    switch (selectedStep) {
        case 'amazon_step1':
            return <AmazonStep1/>;
        case 'amazon_step2' :
            return <AmazonStep2/>;
        case 'amazon_step3' :
            return <AmazonStep3/>;
        case 'amazon_step4' :
            return <AmazonStep4/>;
        case 'amazon_step5' :
            return <AmazonStep5/>;
        case 'shopee_step1':
            return <ShopeeStep1 />;
        case 'shopee_step2':
            return <ShopeeStep2 />;
        case 'shopee_step3':
            return <ShopeeStep3 />;
        case 'shopee_step4':
            return <ShopeeStep4 />;
        case 'shopee_step5':
            return <ShopeeStep5 />;
        case 'shopee_step6':
            return <ShopeeStep6 />;
        default:
            return <p>단계를 선택해주세요.</p>;
    }
};

export default StepContent