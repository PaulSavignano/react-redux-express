import React from 'react'
import PropTypes from 'prop-types'
import { CardMedia } from 'material-ui/Card'

const Media = ({
  image,
  iframe
}) => (
  <CardMedia>
    {image.src && <img src={image.src} alt="card"/>}
    {iframe &&
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
    }
  </CardMedia>
)

Media.propTypes = {
  image: PropTypes.object,
  iframe: PropTypes.string,
}

export default Media
