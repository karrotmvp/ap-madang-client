import React, { ReactElement } from 'react';

import styled from '@emotion/styled';
import { useNavigator } from '@karrotframe/navigator';
import Slider from 'react-slick';

import home_banner_01 from '../../../assets/image/home_banner_01.png';
import home_banner_02 from '../../../assets/image/home_banner_02.png';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { COLOR } from '../../../constant/color';

const settings = {
  dots: true,
  infinite: true,
  autoplay: true,
  speed: 700,
  autoplaySpeed: 3000,
  slidesToShow: 1,
  slidesToScroll: 1,
  adaptiveHeight: true,
  customPaging: () => <CustomDot className="dot" />,
};

function CarouselBanner(): ReactElement {
  const { push } = useNavigator();

  return (
    <BannerWrapper>
      <Slider {...settings}>
        <BannerImg
          src={home_banner_01}
          className="landing__banner-img_01"
          onClick={() => push('/create-guide')}
        />
        <BannerImg
          src={home_banner_02}
          className="landing__banner-img_02"
          onClick={() => push('/guide')}
        />
      </Slider>
    </BannerWrapper>
  );
}

const BannerWrapper = styled.div`
  box-sizing: border-box;
  overflow: hidden;
  width: 100%;
  height: auto;

  .slick-list,
  .slick-track {
    height: calc(100vw * 0.333) !important;
  }
  .slick-dots {
    bottom: 1.2rem;
    transform: translateZ(10px);
  }

  .slick-dots > li {
    width: auto;
    height: auto;
  }

  .slick-active .dot {
    background-color: ${COLOR.LIGHT_GREEN};
  }

  .dot:last-child {
    margin-right: 0;
  }

  .slick-arrow {
    display: none;
  }
`;

const CustomDot = styled.div`
  width: 0.6rem;
  height: 0.6rem;
  background-color: #c4c4c4;
  border-radius: 50%;
  margin-right: 0.6rem;
`;

const BannerImg = styled.img`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export default CarouselBanner;
