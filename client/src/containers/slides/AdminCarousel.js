import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, CardMedia, CardText } from 'material-ui/Card'
import { AutoRotatingCarousel, Slide } from 'material-auto-rotating-carousel'
import { green400, green600, blue400, blue600, red400, red600 } from 'material-ui/styles/colors'

import AdminSlideEdit from './AdminSlideEdit'
import { startEdit, toggleCarousel } from '../../actions/slides'

class AdminCarousel extends Component {
  state = {
    loading: true,
    images: []
  }
  componentWillMount() {
    const { items } = this.props
    const images = items.filter(item => item.image.src).map(item => item && { src: item.image.src, loaded: false })
    if (images.length) {
      this.setState({ images })
      images.map((image, i) => {
        const img = new Image()
        const src = image.src
        img.onload = () => {
          images[i].loaded = true
          this.setState({ images })
        }
        img.src = src
      })
      const loading = this.state.images.find(image => image.loaded === false) ? true : false
      this.setState({ loading })
    } else {
      this.setState({ loading: false })
    }
  }
  render() {
    const { dispatch, isFetching, items, open, autoplay } = this.props
    const editItem = items.find(item => item.editing === true)
    return (
      !this.state.loading &&
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
                media={
                  <CardMedia onTouchTap={() => dispatch(startEdit(item._id))} mediaStyle={{ cursor: 'pointer', minHeight: 60, minWidth: 60 }}>
                    <img src={item.image.src} />
                  </CardMedia>
                }
                mediaBackgroundStyle={{ backgroundColor: mediaBackgroundColor, overflow: 'hidden' }}
                contentStyle={{ backgroundColor: contentBackgroundColor }}
                title={title}
                subtitle={subtitle}
                textStyle={{ color }}
              />
            )
          })}
        </AutoRotatingCarousel>
        {editItem && <AdminSlideEdit item={editItem} />}
      </div>
    )
  }
}



export default connect()(AdminCarousel)
