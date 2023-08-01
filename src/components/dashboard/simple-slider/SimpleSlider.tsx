import React from 'react';
import Slider from 'react-slick';
import { useDispatch } from 'react-redux';
import { ReactComponent as Service } from '../../../assets/icons/service.svg';
import { openSmartApp } from '../../../redux/actions/dashboard';
import { DashboardItem } from '../../../types/types';
import { SLIDES_TO_SHOW_EXPANDED, SLIDES_TO_SHOW_COLLAPSED } from '../../../constants/constants';
import './SimpleSlider.scss';

interface SimpleSliderProps {
  items: DashboardItem[];
}

const SimpleSlider = ({ items }: SimpleSliderProps) => {
  const dispatch = useDispatch();

  const sliderSettings = {
    arrows: false,
    dots: true,
    speed: 500,
    responsive: [
      {
        breakpoint: 2048,
        settings: {
          slidesToShow: items.length > SLIDES_TO_SHOW_EXPANDED ? SLIDES_TO_SHOW_EXPANDED : items.length,
          slidesToScroll: 6,
        }
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: items.length > SLIDES_TO_SHOW_COLLAPSED ? SLIDES_TO_SHOW_COLLAPSED : items.length,
          slidesToScroll: 3,
        }
      },
    ]
  };

  return (
    <Slider {...sliderSettings} className="slider simple-slider">
      {items.map(({ id, appId, name, avatar }) => (
        <div key={id} className="simple-slider__item" onClick={() => dispatch(openSmartApp(appId as string))}>
          {avatar? <img src={avatar} alt="avatar" /> : <Service />}
          <h5>{name}</h5>
        </div>
      ))}
    </Slider>
  );
};

export default SimpleSlider;