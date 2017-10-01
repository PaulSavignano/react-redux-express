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
        values: {
          flex: itemFlex,
        }
      },
    } = this.props
    const {
      flex: cardStyleFlex,
      margin,
    } = cardStyle.values
    return (
      <Card
        {...linkEvents}
        onTouchTap={this.handleStartEdit}
        style={{ cursor, flex: itemFlex || cardStyleFlex, margin }}
        zDepth={elevation}
        className="AdminCard"
      >
        <CardContent {...this.props} />
      </Card>
    )
  }
}

AdminCard.propTypes = {
  cardStyle: PropTypes.object.isRequired,
  cursor: PropTypes.string,
  elevation: PropTypes.number.isRequired,
  item: PropTypes.object.isRequired,
  linkEvents: PropTypes.object,
  linkNavigation: PropTypes.object,
}

export default cardContainer(AdminCard)
