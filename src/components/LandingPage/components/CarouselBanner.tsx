import React, { ReactElement } from 'react';

import styled from '@emotion/styled';
import { useNavigator } from '@karrotframe/navigator';
import Slider from 'react-slick';

import home_banner from '../../../assets/image/home_banner.png';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const settings = {
  dots: true,
  infinite: true,
  autoplay: true,
  speed: 700,
  autoplaySpeed: 3000,
  slidesToShow: 1,
  slidesToScroll: 1,
  customPaging: () => <CustomDot className="dot" />,
};

function CarouselBanner(): ReactElement {
  const { push } = useNavigator();

  return (
    <BannerWrapper>
      <Slider {...settings}>
        <BannerImg
          src={home_banner}
          className="landing__banner-img"
          onClick={() => push('/guide')}
        />
        <BannerImg
          src={home_banner}
          className="landing__banner-img"
          onClick={() => push('/guide')}
        />
        <BannerImg
          src={home_banner}
          className="landing__banner-img"
          onClick={() => push('/guide')}
        />
        <BannerImg
          src={home_banner}
          className="landing__banner-img"
          onClick={() => push('/guide')}
        />
      </Slider>
    </BannerWrapper>
  );
}

const BannerWrapper = styled.div`
  box-sizing: border-box;
  overflow-x: hidden;
  width: 100%;

  .slick-dots {
    bottom: 0;
  }

  .slick-active .dot {
    background-color: white;
  }
`;

const CustomDot = styled.div`
  width: 0.5rem;
  height: 0.5rem;
  background-color: grey;
  border-radius: 50%;
`;

const BannerImg = styled.img`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export default CarouselBanner;
