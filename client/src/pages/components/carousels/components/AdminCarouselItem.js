import React from 'react'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'
import { Card, CardActions, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'

import CarouselImage from './CarouselImage'
import CarouselText from './CarouselText'
import { fetchUpdateCarousel } from '../../actions/carousel'

const AdminCarouselItem = ({ dispatch, page, carousel, item, initialValues }) => {
  console.log()
  return (
    <Card>
      <CardActions>
        <RaisedButton
          onTouchTap={() => {
            const update = {
              type: 'DELETE_CAROUSEL_ITEM',
              carouselId: carousel._id,
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
      <CarouselImage page={page} carousel={carousel} item={item} />
      <CarouselText carousel={carousel} item={item} />
    </Card>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    initialValues: ownProps.item.text
  }
}

export default connect()(AdminCarouselItem)
