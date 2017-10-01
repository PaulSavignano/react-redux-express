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
      className="CardItem"
    >
      <CardContent {...props} />
    </Card>
  )
}

CardItem.propTypes = {
  cardStyle: PropTypes.object.isRequired,
  cursor: PropTypes.string,
  elevation: PropTypes.number.isRequired,
  item: PropTypes.object.isRequired,
  linkEvents: PropTypes.object,
  linkNavigation: PropTypes.object,
}

export default cardContainer(CardItem)
