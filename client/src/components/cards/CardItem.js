import React from 'react'
import PropTypes from 'prop-types'

import cardContainer from '../../containers/cards/cardContainer'
import CardContent from './CardContent'

const CardItem = (props) => {
  return (
    <CardContent {...props} />
  )
}

CardItem.propTypes = {
  cardStyle: PropTypes.object.isRequired,
  hasButtons: PropTypes.bool.isRequired,
  hasText: PropTypes.bool.isRequired,
  hasMedia: PropTypes.bool.isRequired,
  hasParagraph: PropTypes.bool.isRequired,
  item: PropTypes.object.isRequired
}

export default cardContainer(CardItem)
