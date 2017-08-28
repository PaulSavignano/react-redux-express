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
import { fetchUpdate, fetchDelete } from '../../actions/heros'
import { startEdit } from '../../actions/editItem'

class AdminHero extends Component {
  handleStartEdit = (e) => {
    e.stopPropagation()
    const { dispatch, item } = this.props
    return dispatch(startEdit({ item, kind: 'HERO' }))
  }
  render() {
    const {
      heroStyle: {
        values: {
          button1Color,
          button2Color,
          button1BackgroundColor,
          button2BackgroundColor,
          h1Align,
          h1Color,
          h1TextShadow,
          h2Align,
          h2Color,
          h2TextShadow,
          h3Align,
          h3Color,
          h3TextShadow,
          mediaBorder,
          mediaElevation,
          minHeight,
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
          h1Text,
          h2Text,
          h3Text,
          iframe,
          pText
        }
      },
      propsForParent,
      propsForChild
    } = this.props
    return (
      <div
        id="this is the div that should have props"
        onTouchTap={this.handleStartEdit}
        {...propsForParent}
      >
        <Card
          zDepth={0}
          onTouchTap={this.handleStartEdit}
          {...propsForChild}
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
        </Card>
      </div>
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

export default heroContainer(AdminHero)
