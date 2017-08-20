import React from 'react'
import PropTypes from 'prop-types'
import Paper from 'material-ui/Paper'
import { Card, CardMedia, CardText, CardTitle } from 'material-ui/Card'

import articleContainer from '../../containers/articles/articleContainer'
import ArticleButtons from './ArticleButtons'
import ArticleHeading from './ArticleHeading'
import ArticleMedia from './ArticleMedia'
import ArticleParagraph from './ArticleParagraph'

import loadImage from '../images/loadImage'
import AdminArticleEdit from './AdminArticleEdit'
import { startEdit } from '../../actions/articles'

const Article = ({
  article: {
    values: {
      button1Color,
      button2Color,
      button1Background,
      button2Background,
      mediaElevation,
      h1Align,
      h1Color,
      h1TextShadow,
      h2Align,
      h2Color,
      h2TextShadow,
      h3Align,
      h3Color,
      h3TextShadow
    }
  },
  dispatch,
  hasButtons,
  hasHeading,
  hasMedia,
  hasParagraph,
  item: {
    _id,
    editing,
    image,
    values: {
      button1Text,
      button1Link,
      button2Text,
      button2Link,
      flexFlow,
      h1Text,
      h2Text,
      h3Text,
      iframe,
      mediaAlign,
      mediaBorder,
      mediaFlex,
      pText
    },
  },
  onButtonClick
}) => {
  return (
    <article
      onTouchTap={() => dispatch(startEdit(_id))}
      style={{ overflow: 'hidden' }}
      className="article"
    >
      {hasHeading &&
        <ArticleHeading
          h1Align={h1Align}
          h2Align={h2Align}
          h3Align={h3Align}
          h1Color={h1Color}
          h2Color={h2Color}
          h3Color={h3Color}
          h1Text={h1Text}
          h2Text={h2Text}
          h3Text={h3Text}
          h1TextShadow={h1TextShadow}
          h2TextShadow={h2TextShadow}
          h3TextShadow={h3TextShadow}
        />
      }
      {hasParagraph && mediaAlign === 'right' ? <ArticleParagraph pText={pText} /> : null}
      {hasMedia ?
        <ArticleMedia
          mediaElevation={mediaElevation}
          mediaFlex={mediaFlex}
          image={image}
          iframe={iframe}
        />
      : null}
      {hasParagraph && mediaAlign === 'left' ? <ArticleParagraph pText={pText} /> : null}
      {hasButtons &&
        <ArticleButtons
          button1Background={button1Background}
          button2Background={button2Background}
          button1Color={button1Color}
          button2Color={button2Color}
          button1Link={button1Link}
          button2Link={button2Link}
          button1Text={button1Text}
          button2Text={button2Text}
          onButtonClick={onButtonClick}
        />
      }
    </article>
  )
}

Article.propTypes = {
  article: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  hasButtons: PropTypes.bool.isRequired,
  hasHeading: PropTypes.bool.isRequired,
  hasMedia: PropTypes.bool.isRequired,
  hasParagraph: PropTypes.bool.isRequired,
  item: PropTypes.object.isRequired
}

export default articleContainer(loadImage(Article))
