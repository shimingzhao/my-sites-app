import React from 'react';
import { Carousel, WingBlank } from 'antd-mobile';

export const ImageCarousel = ({ images }) => {
    const carouselImages = {
        images: images,
        imgHeight: 176,
    };

    return (
        <WingBlank>
            <Carousel autoplay={false} infinite>
                {carouselImages.images.map((val) => (
                    <div
                        key={val}
                        style={{
                            display: 'inline-block',
                            width: '100%',
                            height: carouselImages.imgHeight,
                        }}
                    >
                        <img
                            src={val}
                            alt=""
                            style={{ width: '100%', verticalAlign: 'top' }}
                        />
                    </div>
                ))}
            </Carousel>
        </WingBlank>
    );
};
