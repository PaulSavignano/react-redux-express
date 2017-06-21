import React, { Component } from 'react'
import Slider from 'react-slick'

import CarouselItem from '../components/CarouselItem'

class Carousels extends Component {
  render() {
    const { carousels } = this.props
    console.log(carousels)
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
      carousels.length &&
        <Slider {...settings}>
          {carousels.map(carousel => (
            <div key={carousel._id} style={{ display: 'flex', justifyContent: 'center' }}>
              <CarouselItem
                carousel={carousel}
              />
            </div>
          ))}
        </Slider>
    )
  }
}

export default Carousels
