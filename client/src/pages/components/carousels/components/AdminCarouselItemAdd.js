import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import RaisedButton from 'material-ui/RaisedButton'
import { fetchUpdateCarousel } from '../../actions/carousel'

class AdminCarouselItemAdd extends Component {
  render() {
    const { dispatch, page, carousel } = this.props
    return (
      <CardActions>
        <RaisedButton
          onTouchTap={() => {
            const update = {
              type: 'ADD_CAROUSEL_ITEM',
              carouselId: carousel._id,
              update: {}
            }
            dispatch(fetchUpdateCard(update))}
          }
          type="button"
          label="Add Carousel Item"
          labelColor="#ffffff"
          backgroundColor="#4CAF50"
          fullWidth={true}/>
      </CardActions>
    )
  }
}

export default connect()(AdminCarouselItemAdd)
