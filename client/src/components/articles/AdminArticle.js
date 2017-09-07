import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { push } from 'react-router-redux'
import renderHTML from 'react-render-html'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import { Card, CardMedia, CardText, CardTitle } from 'material-ui/Card'

import articleContainer from '../../containers/articles/articleContainer'
import Buttons from '../buttons/Buttons'
import Heading from '../typography/Heading'
import Media from '../media/Media'
import P from '../typography/P'
import { fetchUpdate, fetchDelete } from '../../actions/articles'
import { startEdit } from '../../actions/editItem'

import renderSelectField from '../../components/fields/renderSelectField'
import renderTextField from '../fields/renderTextField'
import renderWysiwgyField from '../fields/renderWysiwgyField'

class AdminArticle extends Component {
  handleStartEdit = (e) => {
    e.stopPropagation()
    const { dispatch, item } = this.props
    return dispatch(startEdit({
      item,
      kind: 'ARTICLE',
    }))
  }
  render() {
    const {
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
          mediaBorder,
          mediaElevation,
        }
      },
      dispatch,
      hasButtons,
      hasHeading,
      hasMedia,
      hasParagraph,
      item,
    } = this.props
    const {
      _id,
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
        pFlex,
        pText,
      }
    } = item
    return (
      <article
        onTouchTap={this.handleStartEdit}
        style={{
          width: '100%',
          overflow: 'hidden',
          position: 'relative',
          margin: '16px 0',
          minHeight: 60
        }}
        className="article"
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
        <div style={{ display: 'flex', flexFlow }}>
          {hasParagraph && mediaAlign === 'right' ?
            <div style={{ flex: pFlex }}><P>{renderHTML(pText)}</P></div>
          : null}
          {hasMedia ?
            <Paper zDepth={mediaElevation} style={{ flex: mediaFlex, margin: 8, overflow: 'hidden', height: '100%' }}>
              <Media
                image={image}
                iframe={iframe}
              />
            </Paper>

          : null}
          {hasParagraph && mediaAlign === 'left' ?
            <div style={{ flex: pFlex }}><P>{renderHTML(pText)}</P></div>
          : null}
        </div>
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
      </article>
    )
  }
}

AdminArticle.propTypes = {
  articleStyle: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  hasButtons: PropTypes.bool.isRequired,
  hasHeading: PropTypes.bool.isRequired,
  hasMedia: PropTypes.bool.isRequired,
  hasParagraph: PropTypes.bool.isRequired,
  item: PropTypes.object.isRequired
}

export default articleContainer(AdminArticle)
