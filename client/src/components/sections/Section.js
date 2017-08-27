import React from 'react'
import PropTypes from 'prop-types'

import sectionContainer from '../../containers/sections/sectionContainer'
import loadImage from '../images/loadImage'
import renderComponents from './renderComponents'

const Section = ({
  item: {
    _id,
    items,
    kind,
    image,
    values: {
      alignItems,
      backgroundColor,
      containerMarginTop,
      flexFlow,
      justifyContent,
      maxWidth,
      minHeight,
      margin,
      padding,
      pageLink,
    }
  }
}) => {
  const backgroundImage = image && image.src && { backgroundImage: `url(${image.src})`,   transition: 'all 600ms ease-in-out' }
  const backgroundImageClass = image && image.src && { className: 'background-image' }
  return (
    <section
      style={{
        ...backgroundImage,
        backgroundColor,
        marginTop: containerMarginTop
      }}
      {...backgroundImageClass}
      className="section"
    >
      <div
        id={pageLink ? pageLink : _id}
        style={{
            alignItems,
            display: 'flex',
            flexFlow,
            justifyContent,
            maxWidth,
            minHeight,
            margin,
            padding
        }}
      >
        {renderComponents({ components: items })}
      </div>
    </section>
  )
}

Section.propTypes = {
  item: PropTypes.object.isRequired
}

export default loadImage(Section)
