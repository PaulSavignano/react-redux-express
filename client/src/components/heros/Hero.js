import React from 'react'
import PropTypes from 'prop-types'
import { push } from 'react-router-redux'
import renderHTML from 'react-render-html'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import { Card, CardActions, CardMedia, CardText, CardTitle } from 'material-ui/Card'

import heroContainer from '../../containers/cards/heroContainer'
import Buttons from '../buttons/Buttons'
import Heading from '../headings/Heading'
import Media from '../media/Media'
import P from '../typography/P'
import loadImage from '../images/loadImage'

const AdminCard = ({
  hero: {
    values: {
      button1Color,
      button1Background,
      button2Color,
      button2Background,
      h1Align,
      h1Color,
      h1TextShadow,
      h2Align,
      h2Color,
      h2TextShadow,
      h3Align,
      h3Color,
      h3TextShadow,
      mediaElevation,
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
      flex,
      h1Text,
      h2Text,
      h3Text,
      iframe,
      margin,
      mediaAlign,
      mediaBorder,
      mediaFlex,
      pText
    }
  }
}) => {
  return (
    <Card
      id={_id}
      className="card"
    >
      {hasHeading &&
        <Heading
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
      {hasParagraph && mediaAlign === 'right' ? <P>{renderHTML(pText)}</P> : null}
      {hasMedia &&
        <Paper zDepth={mediaElevation} style={{ flex: mediaFlex, margin: 8, overflow: 'hidden' }}>
          <Media
            image={image}
            iframe={iframe}
          />
        </Paper>
      }
      {hasParagraph && mediaAlign === 'left' ? <P>{renderHTML(pText)}</P> : null}
      {hasButtons &&
        <Buttons
          button1Background={button1Background}
          button2Background={button2Background}
          button1Color={button1Color}
          button2Color={button2Color}
          button1Link={button1Link}
          button2Link={button2Link}
          button1Text={button1Text}
          button2Text={button2Text}
        />
      }
    </Card>
  )
}

AdminCard.propTypes = {
  hero: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired
}

export default heroContainer(loadImage(Hero))
