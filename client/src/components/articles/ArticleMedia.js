import React from 'react'
import Paper from 'material-ui/Paper'

import Media from '../media/Media'

const ArticleMedia = ({
  mediaBoxShadow,
  mediaElevation,
  mediaFlex,
  image,
  iframe
}) => (
  <div
    style={{ flex: mediaFlex }}
    className="article-media"
  >
    <Media
      boxShadow={mediaBoxShadow}
      elevation={mediaElevation}
      iframe={iframe}
      image={image}
      mediaFlex={mediaFlex}
    />
  </div>
)

export default ArticleMedia
