import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import RaisedButton from 'material-ui/RaisedButton'

import AdminCarouselItemAdd from './carousel/CarouselItemAdd'
import AdminCarouselList from './carousel/CarouselList'
import { fetchUpdateCarousel, fetchDeleteCarousel } from '../actions/carousel'

class AdminCarousel extends Component {
  render() {
    const { dispatch, page, carousel } = this.props
    return (
      <Card>
        <CardActions>
          <RaisedButton
            onTouchTap={() => {
              const update = {
                type: carousel ? 'DELETE_CAROUSEL' : 'ADD_CAROUSEL',
                cardId: carousel._id,
                update: {}
              }
              dispatch(fetchUpdateCard(update))}
            }
            type="button"
            label={carousel ? "Remove Carousel" : "Add Carousel"}
            labelColor="#ffffff"
            backgroundColor={carousel ? "#D50000" : "#4CAF50" }
            fullWidth={true}/>
          <Card style={{ margin: 10 }}>
            <CarouselItemAdd />
            <CarouselList page={page} card={card} />
          </Card>
        </CardActions>
      </Card>

    )
  }
}

export default connect()(AdminCarousel)
