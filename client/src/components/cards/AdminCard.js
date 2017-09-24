import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card } from 'material-ui/Card'

import './card.css'
import cardContainer from '../../containers/cards/cardContainer'
import CardContent from './CardContent'
import { startEdit } from '../../actions/editItem'

class AdminCard extends Component {
  handleStartEdit = (e) => {
    e.stopPropagation()
    const { dispatch, item } = this.props
    return dispatch(startEdit({
      item,
      kind: 'CARD',
    }))
  }
  render() {
    const {
      cardStyle,
      cursor,
      elevation,
      linkEvents,
      item: {
        values: { flex }
      },
    } = this.props
    const {
      margin,
      width
    } = cardStyle.values
    return (
      <Card
        {...linkEvents}
        onTouchTap={this.handleStartEdit}
        style={{ cursor, flex, margin, width }}
        zDepth={elevation}
        className="card-item"
      >
        <CardContent {...this.props} />
      </Card>
    )
  }
}

AdminCard.propTypes = {
  cardStyle: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  hasButtons: PropTypes.bool.isRequired,
  hasMedia: PropTypes.bool.isRequired,
  hasText: PropTypes.bool.isRequired,
  item: PropTypes.object.isRequired
}

export default cardContainer(AdminCard)
