import React, { Component } from 'react'
import Slider from 'react-slick'

import SlideItem from '../components/SlideItem'

class Slides extends Component {
  render() {
    const { slides } = this.props
    console.log(slides)
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

export default Slides
