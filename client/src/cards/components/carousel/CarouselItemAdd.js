import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import RaisedButton from 'material-ui/RaisedButton'
import { fetchUpdateCard } from '../../actions/card'

class CarouselItemAdd extends Component {

  render() {
      console.log('carouselAdd')
    const { dispatch, page, card } = this.props
    return (
      <CardActions>
        <RaisedButton
          onTouchTap={() => {
            const update = {
              type: 'ADD_CAROUSEL_ITEM',
              cardId: card._id,
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

export default connect()(CarouselItemAdd)
