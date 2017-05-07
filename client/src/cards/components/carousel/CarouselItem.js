import React from 'react'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'
import { Card, CardActions, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'

import CarouselImage from './CarouselImage'
import CarouselText from './CarouselText'
import { fetchUpdateCard } from '../../actions/card'

const CarouselItem = ({ dispatch, page, card, item, initialValues }) => {
  console.log()
  return (
    <Card>
      <CardActions>
        <RaisedButton
          onTouchTap={() => {
            const update = {
              type: 'DELETE_CAROUSEL_ITEM',
              cardId: card._id,
              update: {}
            }
            dispatch(fetchUpdateCard(update))}
          }
          type="button"
          label="Remove Carousel Item"
          labelColor="#ffffff"
          backgroundColor="#4CAF50"
          fullWidth={true}/>
      </CardActions>
      <CarouselImage page={page} card={card} item={item} />
      <CarouselText card={card} item={item} />
    </Card>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    initialValues: ownProps.item.text
  }
}

export default connect()(CarouselItem)
