import React from 'react'
import PropTypes from 'prop-types'
import Paper from 'material-ui/Paper'
import { Card, CardMedia, CardText, CardTitle } from 'material-ui/Card'

const ArticleMedia = ({
  mediaElevation,
  mediaFlex,
  image,
  iframe
}) => (
  <Paper zDepth={mediaElevation} style={{ flex: mediaFlex, margin: 8, overflow: 'hidden' }}>
    {image.src &&
      <CardMedia>
        <img src={image.src} alt="card"/>
      </CardMedia>
    }
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
  </Paper>
)

export default ArticleMedia
