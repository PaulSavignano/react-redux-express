import React from 'react'
import PropTypes from 'prop-types'
import { CardMedia } from 'material-ui/Card'

const Media = ({
  image,
  iframe,
  border
}) => {
  return (
    image.src ?
      <CardMedia style={{ border }}>
        <img src={image.src} alt="card"/>
      </CardMedia>
    :
      iframe ?
        <CardMedia style={{ border }}>
          <div style={{ position: 'relative', paddingBottom: '50%' }}>
            <iframe
              title="iframe"
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
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
