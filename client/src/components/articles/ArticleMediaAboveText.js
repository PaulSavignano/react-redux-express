import React from 'react'
import PropTypes from 'prop-types'

import Media from '../media/Media'
import Buttons from '../buttons/Buttons'
import Heading from '../typography/Heading'
import Paragraph from '../typography/Paragraph'

const ArticleMediaAboveText = ({
  buttonProps,
  hasButtons,
  hasHeading,
  hasMedia,
  hasParagraph,
  headingProps,
  item: {
    values: {
      flexFlow,
      textFlex,
    }
  },
  mediaProps,
  paragraphProps,
}) => {
  return (
    <div className="ArticleMediaAboveText">
      {hasMedia &&
        <div className="article-media-above">
          <Media {...mediaProps}/>
        </div>
      }
      {hasHeading || hasParagraph || hasButtons ?
        <div className="article-text" style={{ flex: textFlex }}>
          {hasHeading && <Heading {...headingProps} />}
          {hasParagraph && <Paragraph {...paragraphProps} />}
          {hasButtons && <Buttons {...buttonProps} />}
        </div>
      : null}
    </div>
  )
}

ArticleMediaAboveText.propTypes = {
  buttonProps: PropTypes.object,
  hasButtons: PropTypes.bool.isRequired,
  hasHeading: PropTypes.bool.isRequired,
  hasMedia: PropTypes.bool.isRequired,
  hasParagraph: PropTypes.bool.isRequired,
  headingProps: PropTypes.object,
  item: PropTypes.object.isRequired,
  mediaProps: PropTypes.object,
  paragraphProps: PropTypes.object,
}

export default ArticleMediaAboveText
