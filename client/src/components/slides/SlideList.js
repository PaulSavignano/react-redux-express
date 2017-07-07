import React, { Component } from 'react'
import Slider from 'react-slick'

import SlideItem from './SlideItem'

class SlideList extends Component {
  render() {
    const { slides } = this.props
    var settings = {
      dots: true,
      className: 'center',
      centerMode: true,
      fade: true,
      speed: 3000,
      infinite: true,
      autoplay: true,
      autoplaySpeed: 6000,
      slidesToShow: 1,
      slidesToScroll: 1
    }
    return (
      slides.length &&
        <Slider {...settings}>
          {slides.map(slide => (
            <div key={slide._id} style={{ display: 'flex', justifyContent: 'center' }}>
              <SlideItem
                slide={slide}
              />
            </div>
          ))}
        </Slider>
    )
  }
}

export default SlideList
