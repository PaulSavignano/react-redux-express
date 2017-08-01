import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, CardMedia, CardText } from 'material-ui/Card'
import { AutoRotatingCarousel, Slide } from 'material-auto-rotating-carousel'
import { green400, green600, blue400, blue600, red400, red600 } from 'material-ui/styles/colors'

import { toggleCarousel } from '../../actions/slides'

class Carousel extends Component {
  render() {
    const { dispatch, isFetching, items, open, autoplay } = this.props
    const editItem = items.find(item => item.editing === true)
    return (
      <div>
        <AutoRotatingCarousel
          label="Get started"
          autoplay={autoplay}
          open={open}
          mobile={true}
          onStart={() => dispatch(toggleCarousel())}
        >
          {items.map(item => {
            const {
              color,
              mediaBackgroundColor,
              contentBackgroundColor,
              title,
              subtitle
            } = item.values
            return (
              <Slide
                key={item._id}
                media={<CardMedia><img src={item.image.src} /></CardMedia>}
                mediaBackgroundStyle={{ backgroundColor: mediaBackgroundColor, overflow: 'hidden' }}
                contentStyle={{ backgroundColor: contentBackgroundColor }}
                title={title}
                subtitle={subtitle}
                textStyle={{ color }}
              />
            )
          })}
        </AutoRotatingCarousel>
      </div>
    )
  }
}



export default connect()(Carousel)
