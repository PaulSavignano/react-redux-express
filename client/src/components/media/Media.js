import React from 'react'
import PropTypes from 'prop-types'

import './media.css'

const Media = ({
  className,
  border,
  boxShadow,
  flex,
  image,
  iframe,
  margin
}) => (
  <div
    style={{ flex, margin }}
    className={className}
    id="Media"
  >
    {image.src &&
      <img
        src={image.src}
        alt="card"
        style={{ border, boxShadow }}
        className="media-image"
      />
    }
    {iframe &&
      <div className="media-iframe-container">
        <iframe
          className="media-iframe"
          title="iframe"
          style={{ border, boxShadow }}
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
