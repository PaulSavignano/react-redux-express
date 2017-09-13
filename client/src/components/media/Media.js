import React from 'react'
import PropTypes from 'prop-types'
import { CardMedia } from 'material-ui/Card'

const Media = ({
  boxShadow,
  image,
  iframe,
  border
}) => {
  return (
    image.src ?
      <CardMedia style={{ border }} className="this-is-media">
        <img
          src={image.src}
          alt="card"
          style={{ boxShadow }}
        />
      </CardMedia>
    :
      iframe ?
        <CardMedia style={{ border }}>
          <div style={{ position: 'relative', paddingBottom: '50%' }}>
            <iframe
              title="iframe"
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', boxShadow }}
              src={iframe}
              frameBorder="0"
              allowFullScreen
            >
            </iframe>
          </div>
        </CardMedia>
      : null
  )
}

Media.propTypes = {
  image: PropTypes.object,
  iframe: PropTypes.string,
}

export default Media
