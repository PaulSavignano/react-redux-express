import React from 'react'
import PropTypes from 'prop-types'

import './article.css'
import Media from '../media/Media'
import Buttons from '../buttons/Buttons'
import Text from '../typography/Text'

const ArticleContent = ({
  articleStyle: {
    values: {
      button1BackgroundColor,
      button2BackgroundColor,
      button1Color,
      button2Color,
      h1Align,
      h1Color,
      h1TextShadow,
      h2Align,
      h2Color,
      h2TextShadow,
      h3Align,
      h3Color,
      h3TextShadow,
      pColor,
      pTextShadow,
      mediaBorder,
      mediaBoxShadow,
      mediaElevation,
    }
  },
  dispatch,
  hasButtons,
  hasMedia,
  hasText,
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
      mediaFlex,
      pText,
      textFlex,
    },
  }
}) => {
  return (
    <div
      style={{ flexFlow }}
      className="article-content"
    >
      {hasMedia && mediaAlign === 'left' ?
        <Media
          border={mediaBorder}
          boxShadow={mediaBoxShadow}
          elevation={mediaElevation}
          flex={mediaFlex}
          iframe={iframe}
          image={image}
          margin={8}
        />
      : null}
      {hasText || hasButtons ?
        <div style={{ flex: textFlex }} className="text-container">
          <div>
            {hasText &&
              <Text
                h1Align={h1Align}
                h2Align={h2Align}
                h3Align={h3Align}
                h1Color={h1Color}
                h2Color={h2Color}
                h3Color={h3Color}
                pColor={pColor}
                h1Text={h1Text}
                h2Text={h2Text}
                h3Text={h3Text}
                pText={pText}
                h1TextShadow={h1TextShadow}
                h2TextShadow={h2TextShadow}
                h3TextShadow={h3TextShadow}
                pTextShadow={pTextShadow}
              />
            }
            {hasButtons &&
              <Buttons
                button1BackgroundColor={button1BackgroundColor}
                button2BackgroundColor={button2BackgroundColor}
                button1Color={button1Color}
                button2Color={button2Color}
                button1Link={button1Link}
                button2Link={button2Link}
                button1Text={button1Text}
                button2Text={button2Text}
                dispatch={dispatch}
              />
            }
          </div>
        </div>
      : null}
      {hasMedia && mediaAlign === 'right' ?
        <Media
          border={mediaBorder}
          boxShadow={mediaBoxShadow}
          elevation={mediaElevation}
          flex={mediaFlex}
          iframe={iframe}
          image={image}
          margin={8}
        />
      : null}
    </div>
  )
}

ArticleContent.propTypes = {
  articleStyle: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  hasButtons: PropTypes.bool.isRequired,
  hasMedia: PropTypes.bool.isRequired,
  hasText: PropTypes.bool.isRequired,
  item: PropTypes.object.isRequired
}

export default ArticleContent
