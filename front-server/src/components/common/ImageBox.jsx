import React, { useContext, useRef } from 'react';
import styles from './ImageBox.module.css';
import AmazonFormContext from '../../provider/AmazonFormContext';
import ShopeeFormContext from '../../provider/ShopeeFormContext';

const ImageBox = ({ maxImages, minImages = 0, allowVideo = false, platform = 'amazon' }) => {
    const inputRefs = useRef([]);

    const {
        formData: amazonData,
        updateField: updateAmazonField
    } = useContext(AmazonFormContext);

    const {
        formData: shopeeData,
        updateField: updateShopeeField
    } = useContext(ShopeeFormContext);

    const formData = platform === 'amazon' ? amazonData : shopeeData;
    const updateField = platform === 'amazon' ? updateAmazonField : updateShopeeField;

    const images = formData.images || [];
    const video = formData.video || null;

    const handleImageChange = (index, file) => {
        const updatedImages = [...images];
        updatedImages[index] = file;
        updateField('images', updatedImages);

        // 첫 번째 이미지일 경우 mainImage 업데이트
        if (index === 0 && file) {
            const previewURL = typeof file === 'string' ? file : URL.createObjectURL(file);
            updateField('mainImage', previewURL);
        }
    };

    const handleVideoChange = (file) => {
        if (file) {
            updateField('video', file);
        }
    };

    const removeImage = (index) => {
        const updatedImages = images.filter((_, i) => i !== index);
        updateField('images', updatedImages);

        // 첫 번째 이미지가 삭제되면 다음 이미지를 대표 이미지로 설정, 없으면 기본 이미지
        if (index === 0) {
            if (updatedImages.length > 0) {
                const newMain = updatedImages[0];
                const previewURL = typeof newMain === 'string' ? newMain : URL.createObjectURL(newMain);
                updateField('mainImage', previewURL);
            } else {
                updateField('mainImage', ''); // 기본 이미지 경로
            }
        }
    };

    const removeVideo = () => {
        updateField('video', null);
    };

    return (
        <div className={styles.container}>
            {Array.from({ length: maxImages }).map((_, idx) => {
                const img = images[idx];
                return (
                    <div key={idx} className={styles.imageBox}>
                        <div onClick={() => inputRefs.current[idx]?.click()} className={styles.imageContent}>
                            {img ? (
                                <img
                                    src={typeof img === 'string' ? img : URL.createObjectURL(img)}
                                    alt={`uploaded-${idx}`}
                                    className={styles.preview}
                                />
                            ) : (
                                <span className={styles.placeholder}>+</span>
                            )}
                        </div>
                        {img && (
                            <button
                                type="button"
                                className={styles.deleteBtn}
                                onClick={() => removeImage(idx)}
                            >
                                🗑
                            </button>
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            ref={(el) => {
                                if (el) inputRefs.current[idx] = el;
                            }}
                            onChange={(e) => handleImageChange(idx, e.target.files[0])}
                        />
                    </div>
                );
            })}

            {allowVideo && (
                <div className={styles.imageBox}>
                    <div onClick={() => inputRefs.current[maxImages]?.click()} className={styles.imageContent}>
                        {video ? (
                            <video
                                className={styles.preview}
                                src={typeof video === 'string' ? video : URL.createObjectURL(video)}
                                controls
                            />
                        ) : (
                            <span className={styles.placeholder}>🎥</span>
                        )}
                    </div>
                    {video && (
                        <button
                            type="button"
                            className={styles.deleteBtn}
                            onClick={removeVideo}
                        >
                            🗑
                        </button>
                    )}
                    <input
                        type="file"
                        accept="video/*"
                        style={{ display: 'none' }}
                        ref={(el) => {
                            if (el) inputRefs.current[maxImages] = el;
                        }}
                        onChange={(e) => handleVideoChange(e.target.files[0])}
                    />
                </div>
            )}
        </div>
    );
};

export default ImageBox;
