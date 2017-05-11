import React, { Component } from 'react'
import Slider from 'react-slick'
import { connect } from 'react-redux'

import CarouselItem from '../components/CarouselItem'

class CarouselList extends Component {
  render() {
    const { isFetching, page, items } = this.props
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
      isFetching ? null :
        <Slider {...settings}>
          {items.map(item => (
            <div key={item._id} style={{ display: 'flex', justifyContent: 'center' }}>
              <CarouselItem
                page={page}
                item={item}
              />
            </div>
          ))}
        </Slider>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log(ownProps.page)
  const isFetching = state.carousels.isFetching
  const items = isFetching ? [] : state.carousels.items.filter(item => item.pageId === ownProps.page._id)
  return {
    isFetching,
    items
  }
}

export default connect(mapStateToProps)(CarouselList)
