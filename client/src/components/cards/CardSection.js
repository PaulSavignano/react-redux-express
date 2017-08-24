import React from 'react'
import PropTypes from 'prop-types'

import cardContainer from '../../containers/cards/cardContainer'
import CardItem from './CardItem'

const CardSection = ({
  cardStyle,
  cursor,
  events,
  hasButtons,
  hasHeading,
  hasMedia,
  hasParagraph,
  item: {
    _id,
    cards,
    values: {
      backgroundColor,
      pageLink,
    }
  }
}) => {
  return (
    <section
      id={pageLink}
      style={{ backgroundColor }}
    >
      {cards.map(card => (
        <CardItem
          cardStyle={cardStyle}
          cursor={cursor}
          events={events}
          hasButtons={hasButtons}
          hasHeading={hasHeading}
          hasMedia={hasMedia}
          hasParagraph={hasParagraph}
          item={card}
        />
      ))}
    </section>
  )
}

CardSection.propTypes = {
  cardStyle: PropTypes.object.isRequired,
  hasButtons: PropTypes.bool.isRequired,
  hasHeading: PropTypes.bool.isRequired,
  hasMedia: PropTypes.bool.isRequired,
  hasParagraph: PropTypes.bool.isRequired,
  item: PropTypes.object.isRequired
}

export default cardContainer(CardSection)
