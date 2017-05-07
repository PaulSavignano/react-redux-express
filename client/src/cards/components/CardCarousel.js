import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import RaisedButton from 'material-ui/RaisedButton'

import CarouselItemAdd from './carousel/CarouselItemAdd'
import CarouselList from './carousel/CarouselList'
import { fetchUpdateCard, fetchDeleteCard } from '../actions/card'

class CardCarousel extends Component {
  render() {
    const { dispatch, page, card } = this.props
    return (
      <CardActions>
        <RaisedButton
          onTouchTap={() => {
            const update = {
              type: card.carousel ? 'DELETE_CAROUSEL' : 'ADD_CAROUSEL',
              cardId: card._id,
              update: {}
            }
            dispatch(fetchUpdateCard(update))}
          }
          type="button"
          label={card.carousel ? "Remove Carousel" : "Add Carousel"}
          labelColor="#ffffff"
          backgroundColor={card.carousel ? "#D50000" : "#4CAF50" }
          fullWidth={true}/>
        <Card style={{ margin: 10 }}>
          <CarouselItemAdd />
          <CarouselList page={page} card={card} />
        </Card>
      </CardActions>
    )
  }
}

export default connect()(CardCarousel)
