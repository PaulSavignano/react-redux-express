import React from 'react'
import PropTypes from 'prop-types'
import { push } from 'react-router-redux'
import renderHTML from 'react-render-html'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import { Card, CardActions, CardMedia, CardText, CardTitle } from 'material-ui/Card'

import HeroCard from './HeroCard'
import Buttons from '../buttons/Buttons'
import Heading from '../typography/Heading'
import Media from '../media/Media'
import P from '../typography/P'

const Hero = ({
  heroStyle: {
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
      marginTop,
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
      backgroundColor,
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
  const backgroundImage = backgroundImage && image.src && { backgroundImage: `url(${image.src})`,   transition: 'all 600ms ease-in-out' }
  const backgroundImageClass = image && image.src && { className: 'background-image' }
  return (
    <div
      style={{
        ...backgroundImage,
        backgroundColor,
        marginTop
      }}
      {...backgroundImageClass}
    >
      <HeroCard

      />
    </div>
  )
}

Hero.propTypes = {
  dispatch: PropTypes.func.isRequired,
  hasButtons: PropTypes.bool.isRequired,
  hasHeading: PropTypes.bool.isRequired,
  hasMedia: PropTypes.bool.isRequired,
  hasParagraph: PropTypes.bool.isRequired,
  heroStyle: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired,
}

export default Hero
