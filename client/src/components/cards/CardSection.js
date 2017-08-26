import React from 'react'
import PropTypes from 'prop-types'

import cardContainer from '../../containers/cards/cardContainer'
import CardItem from './CardItem'

const CardSection = ({
  item: {
    _id,
    items,
    image,
    values
  }
}) => {
  const backgroundColor = values && values.backgroundColor
  const pageLink = values && values.pageLink
  const backgroundImage = image && image.src && { backgroundImage: `url(${image.src})`,   transition: 'all 600ms ease-in-out' }
  const backgroundImageClass = image && image.src && { className: 'background-image' }
  return (
    <section
      id={pageLink}
      style={{
        ...backgroundImage,
        backgroundColor,
        width: '100%',
        overflow: 'hidden',
        position: 'relative',
        minHeight: 60
      }}
      {...backgroundImageClass}
      className="card-section"
    >
      {items.map(item => (
        <CardItem
          item={item}
        />
      ))}
    </section>
  )
}

CardSection.propTypes = {
  item: PropTypes.object.isRequired
}

export default CardSection
