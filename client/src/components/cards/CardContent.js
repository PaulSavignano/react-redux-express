import React from 'react'
import PropTypes from 'prop-types'

import Buttons from '../buttons/Buttons'
import Heading from '../typography/Heading'
import Media from '../media/Media'
import Paragraph from '../typography/Paragraph'

const CardContent = ({
  cardStyle: {
    values: {
      button1BackgroundColor,
      button2BackgroundColor,
      button1Border,
      button2Border,
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
      margin,
      mediaBorder,
    }
  },
  hasButtons,
  hasHeading,
  hasMedia,
  hasParagraph,
  item: {
    _id,
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
    {hasButtons || hasHeading || hasParagraph ?
      <div className="card-content">
        {hasHeading &&
          <Heading
            className="card-heading"
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
        {hasParagraph &&
          <Paragraph
            className="card-paragraph"
            color={pColor}
            text={pText}
          />
        }
        {hasButtons &&
          <Buttons
            button1BackgroundColor={button1BackgroundColor}
            button2BackgroundColor={button2BackgroundColor}
            button1Border={button1Border}
            button2Border={button2Border}
            button1Color={button1Color}
            button2Color={button2Color}
            button1Link={button1Link}
            button2Link={button2Link}
            button1Text={button1Text}
            button2Text={button2Text}
          />
        }
      </div>
    : null}
  </div>
)

CardContent.propTypes = {
  cardStyle: PropTypes.object.isRequired,
  hasButtons: PropTypes.bool.isRequired,
  hasHeading: PropTypes.bool.isRequired,
  hasMedia: PropTypes.bool.isRequired,
  hasParagraph: PropTypes.bool.isRequired,
  item: PropTypes.object.isRequired
}

export default CardContent
