import React from 'react'
import PropTypes from 'prop-types'

import Buttons from '../buttons/Buttons'
import Text from '../typography/Text'
import Media from '../media/Media'

const CardContent = ({
  cardStyle: {
    values: {
      button1BackgroundColor,
      button2BackgroundColor,
      button1Color,
      button2Color,
      flex,
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
      margin,
      mediaBorder,
    }
  },
  cursor,
  dispatch,
  elevation,
  events,
  hasButtons,
  hasText,
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
      h1Text,
      h2Text,
      h3Text,
      iframe,
      link,
      pText,
    }
  }
}) => (
  <div>
    {hasMedia &&
      <Media
        image={image}
        iframe={iframe}
      />
    }
    {hasText || hasButtons ?
      <div className="card-content">
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
    : null}
  </div>
)

CardContent.propTypes = {
  cardStyle: PropTypes.object.isRequired,
  hasButtons: PropTypes.bool.isRequired,
  hasText: PropTypes.bool.isRequired,
  hasMedia: PropTypes.bool.isRequired,
  item: PropTypes.object.isRequired
}

export default CardContent
