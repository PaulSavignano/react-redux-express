import React from 'react'
import PropTypes from 'prop-types'

import heroContainer from '../../containers/heros/heroContainer'
import loadImage from '../images/loadImage'
import Hero from './Hero'

const HeroSection = ({
  item: {
    _id,
    items,
    image,
    values
  }
}) => (
  <div
    style={{ backgroundColor: values && values.backgroundColor }}
    className="hero-section"
  >
    {items.map(item => (
      <Hero
        item={item}
      />
    ))}
  </div>
)

HeroSection.propTypes = {
  heroStyle: PropTypes.object.isRequired,
  hasButtons: PropTypes.bool.isRequired,
  hasHeading: PropTypes.bool.isRequired,
  hasMedia: PropTypes.bool.isRequired,
  hasParagraph: PropTypes.bool.isRequired,
  item: PropTypes.object.isRequired
}

export default heroContainer(loadImage(HeroSection))
