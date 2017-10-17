import React from 'react'
import PropTypes from 'prop-types'

import './media.css'
import shadows from '../../utils/shadows'

const Media = ({
  className,
  border,
  borderRadius,
  elevation,
  flex,
  image,
  iframe,
  margin,
  style,
}) => (
  <div
    style={{ border, flex, margin }}
    className={className}
    id="Media"
  >
    {image && image.src ?
      <img
        src={image.src}
        alt="card"
        style={{ borderRadius, boxShadow: shadows[elevation], ...style }}
        className="media-image"
      />
    :
      iframe &&
      <div className="media-iframe-container">
        <iframe
          className="media-iframe"
          title="iframe"
          style={{ borderRadius, boxShadow: shadows[elevation], ...style }}
          src={iframe}
          frameBorder="0"
          allowFullScreen
        >
        </iframe>
      </div>
    }
  </div>
)

Media.propTypes = {
  image: PropTypes.object,
  iframe: PropTypes.string,
}

export default Media
