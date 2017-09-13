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
      image={image}
      iframe={iframe}
      boxShadow={mediaBoxShadow}
    />
  </div>
)

export default ArticleMedia
