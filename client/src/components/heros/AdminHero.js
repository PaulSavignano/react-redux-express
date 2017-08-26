import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { push } from 'react-router-redux'
import renderHTML from 'react-render-html'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import { Card, CardMedia, CardText, CardTitle } from 'material-ui/Card'

import heroContainer from '../../containers/heros/heroContainer'

import Buttons from '../buttons/Buttons'
import Heading from '../typography/Heading'
import Media from '../media/Media'
import P from '../typography/P'
import loadImage from '../images/loadImage'
import { fetchUpdate, fetchDelete } from '../../actions/heros'
import { startEdit } from '../../actions/editItem'

class AdminHero extends Component {
  handleStartEdit = () => {
    const { dispatch, item } = this.props
    return dispatch(startEdit({ item, kind: 'HERO' }))
  }
  render() {
    const {
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
          flexFlow,
          h1Text,
          h2Text,
          h3Text,
          iframe,
          mediaAlign,
          mediaBorder,
          mediaFlex,
          pText
        }
      }
    } = this.props
    const backgroundImage = image && image.src && { backgroundImage: `url(${image.src})`,   transition: 'all 600ms ease-in-out' }
    const backgroundImageClass = image && image.src && { className: 'background-image' }
    return (
      <section
        onTouchTap={this.handleStartEdit}
        style={{
          ...backgroundImage,
          backgroundColor,
          marginTop
        }}
        {...backgroundImageClass}
        className="hero"
      >
        <Card
          zDepth={0}
          onTouchTap={this.handleStartEdit}
          style={{ width: '100%', padding: 8 }}
          className="hero"
        >
          {hasMedia &&
            <Media
              image={image}
              iframe={iframe}
            />
          }
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
          {hasParagraph && <P>{renderHTML(pText)}</P>}
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
              dispatch={dispatch}
            />
          }
        </Card>
      </section>
    )
  }
}

AdminHero.propTypes = {
  dispatch: PropTypes.func.isRequired,
  hasButtons: PropTypes.bool.isRequired,
  hasHeading: PropTypes.bool.isRequired,
  hasMedia: PropTypes.bool.isRequired,
  hasParagraph: PropTypes.bool.isRequired,
  heroStyle: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired,
}

export default heroContainer(loadImage(AdminHero))
