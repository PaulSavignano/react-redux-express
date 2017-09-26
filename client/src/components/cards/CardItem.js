import React from 'react'
import PropTypes from 'prop-types'
import { Card } from 'material-ui/Card'

import './card.css'
import cardContainer from '../../containers/cards/cardContainer'
import CardContent from './CardContent'

const CardItem = (props) => {
  const {
    cardStyle,
    cursor,
    elevation,
    item: {
      _id,
      values: {
        flex: itemFlex
      }
    },
    linkEvents,
    linkNavigation
  } = props
  const {
    flex: cardStyleFlex,
    margin,
  } = cardStyle.values
  return (
    <Card
      {...linkEvents}
      {...linkNavigation}
      style={{ cursor, flex: itemFlex || cardStyleFlex, margin }}
      zDepth={elevation}
      id={_id}
      className="card-item"
    >
      <CardContent {...props} />
    </Card>
  )
}

CardItem.propTypes = {
  cardStyle: PropTypes.object.isRequired,
  hasButtons: PropTypes.bool.isRequired,
  hasText: PropTypes.bool.isRequired,
  hasMedia: PropTypes.bool.isRequired,
  item: PropTypes.object.isRequired
}

export default cardContainer(CardItem)
