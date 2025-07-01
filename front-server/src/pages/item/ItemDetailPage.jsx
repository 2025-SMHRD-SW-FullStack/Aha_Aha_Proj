import React from 'react'
import { useParams } from 'react-router-dom'
import MainLayout from '/src/components/layouts/MainLayout';
import ItemDetail from '../../components/item/ItemDetail';

const ItemDetailPage = () => {
    const { itemId } = useParams();

    return (
        <MainLayout>
            <ItemDetail itemId={itemId}/>
        </MainLayout>
    )
}

export default ItemDetailPage