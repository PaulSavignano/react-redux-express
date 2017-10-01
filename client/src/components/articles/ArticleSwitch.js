import React from 'react'
import PropTypes from 'prop-types'

import './article.css'
import articleContainer from '../../containers/articles/articleContainer'
import ArticleMediaLeftOfParagraph from './ArticleMediaLeftOfParagraph'
import ArticleMediaLeftOfText from './ArticleMediaLeftOfText'
import ArticleMediaRightOfParagraph from './ArticleMediaRightOfParagraph'
import ArticleMediaRightOfText from './ArticleMediaRightOfText'

const ArticleSwitch = (props) => {
  switch(props.item.values.mediaAlign) {
    case 'leftOfParagraph':
      return <ArticleMediaLeftOfParagraph {...props} />
    case 'leftOfText':
      return <ArticleMediaLeftOfText {...props} />
    case 'rightOfParagraph':
      return <ArticleMediaRightOfParagraph {...props} />
    case 'rightOfText':
      return <ArticleMediaRightOfText {...props} />
    default:
      return <ArticleMediaLeftOfText {...props} />
  }
}

ArticleSwitch.propTypes = {
  buttonProps: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
  hasButtons: PropTypes.bool.isRequired,
  hasHeading: PropTypes.bool.isRequired,
  hasMedia: PropTypes.bool.isRequired,
  hasParagraph: PropTypes.bool.isRequired,
  headingProps: PropTypes.object,
  item: PropTypes.object.isRequired,
  mediaProps: PropTypes.object,
  paragraphProps: PropTypes.object,
}

export default articleContainer(ArticleSwitch)
