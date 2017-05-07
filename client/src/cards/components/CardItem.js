import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import TextField from 'material-ui/TextField'
import { Card, CardActions, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'


import { fetchDeleteCard } from '../actions/card'

import CardWidth from './CardWidth'
import CardImage from './CardImage'
import CardCarousel from './CardCarousel'


class CardItem extends Component {
  state = {
    zDepth: 1
  }
  handleMouseEnter = () => this.setState({ zDepth: 4 })
  handleMouseLeave = () => this.setState({ zDepth: 1 })
  render() {
    const { handleSubmit, dispatch, page, card } = this.props
    return (
        <Card
          zDepth={this.state.zDepth}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          containerStyle={{ display: 'flex', flexFlow: 'column', height: '100%' }}
          style={{ margin: 20 }}
        >
          <CardText>
            <CardWidth page={page} card={card} initialValues={{ width: card.width }} />
          </CardText>
          <CardImage page={page} card={card} />
          <CardCarousel page={page} card={card} />
          <CardActions style={{ display: 'flex' }}>
            <RaisedButton
              type="button"
              label="Remove Card"
              fullWidth={true}
              labelColor="#ffffff"
              backgroundColor="#D50000"
              onTouchTap={() => {
                const item = { pageId: page._id, _id: card._id }
                dispatch(fetchDeleteCard(item))
              }}
            />
          </CardActions>
        </Card>
    )
  }
}

export default CardItem
